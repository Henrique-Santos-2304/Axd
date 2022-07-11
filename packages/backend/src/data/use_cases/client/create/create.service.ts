import { TypeParamError } from '@errors/error-parameters';
import { IGetByDataBaseRepo } from 'src/infra/repository/base/getByData/interface-get-by-data-repository';
import { Injectable } from '@nestjs/common';
import { ICreateClientService } from './interfaces/service-interface';
import { AlreadyExists } from '@errors/error-data';
import { DatabaseError, DATABASE_ERROR } from '@errors/errors-database';
import { IEmailValidator } from '@utils/validator/interfaces/interface-email-validator';
import { ValidatorError, VALIDATOR_ERROR } from '@errors/error-validator';

@Injectable()
class CreateClientService implements ICreateClientService {
  constructor(
    private readonly getByData: IGetByDataBaseRepo,
    private readonly emailValidator: IEmailValidator,
  ) {}

  async start({
    name,
    email,
    password,
    telephone,
    age,
  }: ICreateClientService.Params): ICreateClientService.Response {
    const emailIsValid = this.emailValidator.validate({ email });

    if (emailIsValid === VALIDATOR_ERROR) throw new ValidatorError('Email');
    else if (!emailIsValid) throw new TypeParamError('Email');

    const userExists = await this.getByData.get({
      table: 'client',
      column: 'email',
      where: email,
    });

    if (userExists === DATABASE_ERROR) throw new DatabaseError();
    else if (userExists) throw new AlreadyExists('Client');
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
