import { validateErrorMessage } from '@errors/error-validator';

interface ITelephoneValidator {
  validate({
    telephone,
  }: ITelephoneValidator.Params): ITelephoneValidator.Response;
}

namespace ITelephoneValidator {
  export type Params = { telephone: string };
  export type Response = boolean | validateErrorMessage;
}

export { ITelephoneValidator };
