const DATABASE_ERROR = `Database Error`;
type databaseErrorProps = `Database Error`;

class DatabaseError extends Error {
  constructor() {
    super(DATABASE_ERROR);

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

export { DatabaseError, DATABASE_ERROR, databaseErrorProps };
