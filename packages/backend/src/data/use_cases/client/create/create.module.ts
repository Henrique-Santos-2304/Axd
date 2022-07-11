import { Module } from '@nestjs/common';
import { CreateClientController } from './create.controller';
import { CreateClientService } from './create.service';

@Module({
  imports: [],
  controllers: [CreateClientController],
  providers: [CreateClientService],
})
export class AppModule {}
