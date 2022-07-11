import { TypeParamError } from '@errors/error-parameters';
import { IGetByDataBaseRepo } from 'src/infra/repository/base/getByData/interface-get-by-data-repository';
import { Injectable } from '@nestjs/common';
import { AlreadyExists, FailedCreated } from '@errors/error-data';
import { DatabaseError, DATABASE_ERROR } from '@errors/errors-database';
import { IEmailValidator } from '@utils/validator/interfaces/interface-email-validator';
import { ValidatorError, VALIDATOR_ERROR } from '@errors/error-validator';
import { ITelephoneValidator } from '@utils/validator/interfaces/interface-telephone-validator';
import { ICreateBaseRepo } from 'src/infra/repository/base/create/interface-create-data-repository';
import { ICreateClientService } from './interfaces/service-interface';
import { IClientModel } from 'src/infra/models/user-client/user-client-model';

@Injectable()
class CreateClientService implements ICreateClientService {
  constructor(
    private readonly getByData: IGetByDataBaseRepo,
    private readonly createRepo: ICreateBaseRepo,
    private readonly emailValidator: IEmailValidator,
    private readonly phoneValidator: ITelephoneValidator,
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

    const phoneIsValid = this.phoneValidator.validate({ telephone });

    if (phoneIsValid === VALIDATOR_ERROR) throw new ValidatorError('Telephone');
    else if (!phoneIsValid) throw new TypeParamError('Telephone');

    const userExists = await this.getByData.get<IClientModel>({
      table: 'client',
      column: 'email',
      where: email,
    });

    if (userExists === DATABASE_ERROR) throw new DatabaseError();
    else if (userExists) throw new AlreadyExists('Client');

    const created = await this.createRepo.create({
      table: 'client',
      data: {
        name,
        email,
        password,
        telephone,
        age,
      },
    });

    if (created === DATABASE_ERROR) throw new DatabaseError();
    else if (!created) throw new FailedCreated('Client');
    else return created;
  }
}

export { CreateClientService };
