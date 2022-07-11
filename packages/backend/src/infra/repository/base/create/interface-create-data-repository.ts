import { databaseErrorProps } from '@errors/errors-database';

/*
  
------>     Base repository for creating any model. <-------

Parameters: {
  table = Is table of query,
  data: Generic type P or any if nothing is received in generics
}

Response: Promise with undefined or a response of type R generic, 
if nothing is received in the generics R of the method,
The promise of any will be the response

*/

interface ICreateBaseRepo {
  create<P = any, R = any>(
    data: ICreateBaseRepo.Params<P>,
  ): ICreateBaseRepo.Response<R>;
}

namespace ICreateBaseRepo {
  export type Params<P = any> = { table: string; data: P };
  export type Response<R = any> = Promise<R | undefined | databaseErrorProps>;
}

export { ICreateBaseRepo };
