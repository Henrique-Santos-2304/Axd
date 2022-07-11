type encryptPasswordMessageProps = 'Error in at Protected Password';
const encryptedPasswordMessage = 'Error in at Protected Password';

class EncrypterError extends Error {
  constructor() {
    super(encryptedPasswordMessage);

    Object.setPrototypeOf(this, EncrypterError.prototype);
  }
}

export {
  EncrypterError,
  encryptedPasswordMessage,
  encryptPasswordMessageProps,
};
