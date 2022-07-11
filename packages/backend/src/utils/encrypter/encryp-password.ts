import * as bcrypt from 'bcrypt';
import { encryptedPasswordMessage } from '@errors/error-encrypter';
import { Logger } from '@nestjs/common';
import { IEncryptedPassword } from './interfaces/interface-encrypted';

class EncryptPassword implements IEncryptedPassword {
  async encrypt({
    password,
  }: IEncryptedPassword.Params): IEncryptedPassword.Response {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      Logger.log('Erro ao encryptar password');
      Logger.log(error.message);
      return encryptedPasswordMessage;
    }
  }
}

export { EncryptPassword };
