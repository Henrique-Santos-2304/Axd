import { Controller, Get, Post } from '@nestjs/common';
import { CreateClientService } from './create.service';

@Controller()
class CreateClientController {
  constructor(private readonly service: CreateClientService) {}

  @Post('/client')
  create() {}
}

export { CreateClientController };
