import { IGetByDataBaseRepo } from 'src/infra/repository/base/getByData/interface-get-by-data-repository';
import { Injectable } from '@nestjs/common';
import { ICreateClientService } from './interfaces/service-interface';
import { AlreadyExists } from '@errors/error-data';

@Injectable()
class CreateClientService implements ICreateClientService {
  constructor(private readonly getByData: IGetByDataBaseRepo) {}

  async start({
    name,
    email,
    password,
    telephone,
    age,
  }: ICreateClientService.Params): ICreateClientService.Response {
    const userExists = await this.getByData.get({
      table: 'client',
      column: 'email',
      where: email,
    });
    if (userExists) throw new AlreadyExists('Client');
    else
      return {
        id: '',
        name,
        email,
        password,
        telephone,
        age,
      };
  }
}

export { CreateClientService };
