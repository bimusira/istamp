import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GcsService } from './gcs/gcs.service';
import { GcsController } from './gcs/gcs.controller';
import { UserController } from './user/user.controller';
import { AuthModule } from './staff/auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // นำเข้า ConfigModule
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'), 
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    CustomerModule,
  ],
  controllers: [AppController, GcsController, UserController],
  providers: [AppService, GcsService],
})
export class AppModule {}
