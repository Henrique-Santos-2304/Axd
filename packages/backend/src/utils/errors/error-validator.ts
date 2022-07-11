const VALIDATOR_ERROR = 'ERRO AO VALIDAR DADOS';
type validateErrorMessage = 'ERRO AO VALIDAR DADOS';

class ValidatorError extends Error {
  constructor(data: string) {
    super(`Error in at validate ${data} `);

    Object.setPrototypeOf(this, ValidatorError.prototype);
  }
}

export { ValidatorError, VALIDATOR_ERROR, validateErrorMessage };
