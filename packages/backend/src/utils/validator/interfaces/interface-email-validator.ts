import { validateErrorMessage } from '@errors/error-validator';

interface IEmailValidator {
  validate({ email }: IEmailValidator.Params): IEmailValidator.Response;
}

namespace IEmailValidator {
  export type Params = { email: string };
  export type Response = boolean | validateErrorMessage;
}

export { IEmailValidator };
