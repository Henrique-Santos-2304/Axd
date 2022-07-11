import { databaseErrorProps } from '@errors/errors-database';

/*
  
------>     Base repository for search data in specific table with specific column. <-------

Parameters: {
  table = Is table of query,
  column = Table column where the search will be performed 
  where = Given to be matched with that of the column in the db
}

Response: Promise with undefined or a response of type R generic, 
if nothing is received in the generics R of the method,
The promise of any will be the response

*/

interface IGetByDataBaseRepo {
  get<R = any>(data: IGetByDataBaseRepo.Params): IGetByDataBaseRepo.Response<R>;
}

namespace IGetByDataBaseRepo {
  export type Params = { table: string; column: string; where: string };
  export type Response<R = any> = Promise<R | undefined | databaseErrorProps>;
}

export { IGetByDataBaseRepo };
