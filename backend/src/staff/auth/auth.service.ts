import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';  // ใช้ User schema
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto'; // DTO สำหรับการสมัครสมาชิก
import { LoginDto } from './dto/login.dto'; // DTO สำหรับการล็อกอิน

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, 
    private jwtService: JwtService
  ) {}

  // ฟังก์ชันสำหรับการสมัครสมาชิก
  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { email, password, name } = signUpDto;

    // แฮชรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // ตรวจสอบว่าอีเมลมีผู้ใช้แล้วหรือไม่
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    // สร้างผู้ใช้ใหม่ใน MongoDB
    await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  // ฟังก์ชันสำหรับการล็อกอิน
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
