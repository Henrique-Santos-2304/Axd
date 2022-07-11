import { VALIDATOR_ERROR } from '@errors/error-validator';
import { Logger } from '@nestjs/common';
import validator from 'validator';
import { IEmailValidator } from './interfaces/interface-email-validator';

class EmailValidator implements IEmailValidator {
  validate({ email }: IEmailValidator.Params): IEmailValidator.Response {
    try {
      return validator.isEmail(email);
    } catch (error) {
      Logger.log(`Erro na validação email \n${error.message}`);

      return VALIDATOR_ERROR;
    }
  }
}

export { EmailValidator };
