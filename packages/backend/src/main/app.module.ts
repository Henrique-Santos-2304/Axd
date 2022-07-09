import { Module } from '@nestjs/common';
import { AppController } from '../data/use_cases/app.controller';
import { AppService } from '../data/use_cases/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
