class AlreadyExists extends Error {
  constructor(data: string) {
    super(`${data} already exists`);

    Object.setPrototypeOf(this, AlreadyExists.prototype);
  }
}
class FailedCreated extends Error {
  constructor(data: string) {
    super(`Failed in at created ${data}`);

    Object.setPrototypeOf(this, FailedCreated.prototype);
  }
}

export { AlreadyExists, FailedCreated };
