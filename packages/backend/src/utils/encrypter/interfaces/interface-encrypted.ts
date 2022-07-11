import { encryptPasswordMessageProps } from '@errors/error-encrypter';

interface IEncryptedPassword {
  encrypt({ password }: IEncryptedPassword.Params): IEncryptedPassword.Response;
}

namespace IEncryptedPassword {
  export type Params = { password: string };
  export type Response = Promise<string | encryptPasswordMessageProps>;
}

export { IEncryptedPassword };
