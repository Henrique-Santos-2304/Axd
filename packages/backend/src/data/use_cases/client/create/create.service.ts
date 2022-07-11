import { IEncryptedPassword } from '@utils/encrypter';
import { ValidatorError, VALIDATOR_ERROR } from '@errors/error-validator';
import { IEmailValidator, ITelephoneValidator } from '@utils/validator';
import { ICreateClientModel, ICreateClientService } from './interfaces';
import { Injectable } from '@nestjs/common';
import {
  DATABASE_ERROR,
  FailedCreated,
  AlreadyExists,
  DatabaseError,
  TypeParamError,
} from '@errors/index';
import {
  encryptedPasswordMessage,
  EncrypterError,
} from '@errors/error-encrypter';
import {
  IClientModel,
  ICreateBaseRepo,
  IGetByDataBaseRepo,
} from '@infra/index';

@Injectable()
class CreateClientService implements ICreateClientService {
  constructor(
    private readonly getByData: IGetByDataBaseRepo,
    private readonly createRepo: ICreateBaseRepo,
    private readonly emailValidator: IEmailValidator,
    private readonly phoneValidator: ITelephoneValidator,
    private readonly encrypt: IEncryptedPassword,
  ) {}

  private validateEmail(email: string) {
    const emailIsValid = this.emailValidator.validate({ email });

    if (emailIsValid === VALIDATOR_ERROR) throw new ValidatorError('Email');
    else if (!emailIsValid) throw new TypeParamError('Email');
  }

  private validatePhone(telephone: string) {
    const phoneIsValid = this.phoneValidator.validate({ telephone });

    if (phoneIsValid === VALIDATOR_ERROR) throw new ValidatorError('Telephone');
    else if (!phoneIsValid) throw new TypeParamError('Telephone');
  }

  private async checkUserExists(email: string) {
    const userExists = await this.getByData.get<IClientModel>({
      table: 'client',
      column: 'email',
      where: email,
    });

    if (userExists === DATABASE_ERROR) throw new DatabaseError();
    else if (userExists) throw new AlreadyExists('Client');
    else return;
  }

  private async encryptPassword(password: string) {
    const passwordEncrypted = await this.encrypt.encrypt({ password });

    if (passwordEncrypted === encryptedPasswordMessage) {
      throw new EncrypterError();
    } else return passwordEncrypted;
  }

  private async createNewClient(user: ICreateClientModel) {
    const created = await this.createRepo.create({
      table: 'client',
      data: user,
    });

    if (created === DATABASE_ERROR) throw new DatabaseError();
    else if (!created) throw new FailedCreated('Client');
    else return;
  }

  async start({
    name,
    email,
    password,
    telephone,
    age,
  }: ICreateClientService.Params): ICreateClientService.Response {
    this.validateEmail(email);
    this.validatePhone(telephone);
    await this.checkUserExists(email);

    const passwordEncrypted = await this.encryptPassword(password);

    await this.createNewClient({
      name,
      email,
      password: passwordEncrypted,
      telephone,
      age,
    });

    return { status: 'OK' };
  }
}

export { CreateClientService };
