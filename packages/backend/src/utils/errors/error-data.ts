class AlreadyExists extends Error {
  constructor(data: string) {
    super(`${data} already exists`);

    Object.setPrototypeOf(this, AlreadyExists.prototype);
  }
}

export { AlreadyExists };
