import { Injectable } from '@nestjs/common';
import { ICreateClientService } from './interfaces/service-interface';

@Injectable()
class CreateClientService implements ICreateClientService {
  async start({
    name,
    email,
    password,
    telephone,
    age,
  }: ICreateClientService.Params): ICreateClientService.Response {
    throw new Error('');
  }
}

export { CreateClientService };
