import { ValidatorError, VALIDATOR_ERROR } from '@errors/error-validator';
import { IEmailValidator, ITelephoneValidator } from '@utils/validator';
import { ICreateClientService } from './interfaces';
import { Injectable } from '@nestjs/common';
import {
  DATABASE_ERROR,
  FailedCreated,
  AlreadyExists,
  DatabaseError,
  TypeParamError,
} from '@errors/index';
import {
  IClientModel,
  ICreateBaseRepo,
  IGetByDataBaseRepo,
} from '@infra/index';
import { IEncryptedPassword } from '@utils/encrypter/interfaces/interface-encrypted';

@Injectable()
class CreateClientService implements ICreateClientService {
  constructor(
    private readonly getByData: IGetByDataBaseRepo,
    private readonly createRepo: ICreateBaseRepo,
    private readonly emailValidator: IEmailValidator,
    private readonly phoneValidator: ITelephoneValidator,
    private readonly encrypt: IEncryptedPassword,
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
    else return { status: 'OK' };
  }
}

export { CreateClientService };
