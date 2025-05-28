import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GcsService } from './gcs/gcs.service';
import { GcsController } from './gcs/gcs.controller';


@Module({
  imports: [],
  controllers: [AppController, GcsController],
  providers: [AppService, GcsService],
})
export class AppModule {}
