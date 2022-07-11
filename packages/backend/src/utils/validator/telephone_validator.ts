import { VALIDATOR_ERROR } from '@errors/error-validator';
import { Logger } from '@nestjs/common';
import validator from 'validator';
import { ITelephoneValidator } from './interfaces/interface-telephone-validator';

class TelephoneValidator implements ITelephoneValidator {
  validate({
    telephone,
  }: ITelephoneValidator.Params): ITelephoneValidator.Response {
    try {
      return validator.isMobilePhone(telephone);
    } catch (error) {
      Logger.log(`Erro na validação email \n${error.message}`);

      return VALIDATOR_ERROR;
    }
  }
}

export { TelephoneValidator };
