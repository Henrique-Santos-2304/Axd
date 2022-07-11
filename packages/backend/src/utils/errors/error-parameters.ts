class InvalidParams extends Error {
  constructor() {
    super(`Inválid Params`);

    Object.setPrototypeOf(this, InvalidParams.prototype);
  }
}

class TypeParamError extends Error {
  constructor(data: string) {
    super(`${data}, Invalid Type data`);

    Object.setPrototypeOf(this, TypeParamError.prototype);
  }
}

export { InvalidParams, TypeParamError };
