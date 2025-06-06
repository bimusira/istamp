import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GcsService } from './gcs/gcs.service';
import { GcsController } from './gcs/gcs.controller';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';


@Module({
  imports: [AuthModule,CustomerModule],
  controllers: [AppController, GcsController, UserController],
  providers: [AppService, GcsService],
})
export class AppModule {}
