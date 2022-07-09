import { Module } from '@nestjs/common';
import { AppController } from '@useCases/app/app.controller';
import { AppService } from '@useCases/app/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
