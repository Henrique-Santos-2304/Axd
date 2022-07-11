class DatabaseError extends Error {
  constructor() {
    super(`Database Error`);

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

export { DatabaseError };
