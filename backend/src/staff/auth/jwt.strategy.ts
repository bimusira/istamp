import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/schemas/user.schema';
import { ConfigService } from '@nestjs/config';  // ใช้ ConfigService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,  // ใช้ ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  
      secretOrKey: configService.get<string>('JWT_SECRET'),  
    });
  }

  async validate(payload) {
    const { id } = payload;

    const user = await this.userModel.findById(id);  

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user; 
  }
}
