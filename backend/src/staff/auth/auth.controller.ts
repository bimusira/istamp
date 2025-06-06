import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto'; // DTO สำหรับการสมัครสมาชิก
import { LoginDto } from './dto/login.dto'; // DTO สำหรับการล็อกอิน

@Controller('staff/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ message: string }> {
    console.log('>>> [Register] signUpDto:', signUpDto);
    await this.authService.signUp(signUpDto);
    console.log('>>> [Register] returning success message');
    return { message: 'Registered successfully' };
  }

  // POST สำหรับการล็อกอิน
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
