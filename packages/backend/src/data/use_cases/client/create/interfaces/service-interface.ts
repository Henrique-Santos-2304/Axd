import { IUserClientBasic } from 'src/infra/models/user-client/user-client-model';
import { ICreateClientModel } from './create-client-model';

interface ICreateClientService {
  start(
    create_user: ICreateClientService.Params,
  ): ICreateClientService.Response;
}

namespace ICreateClientService {
  export type Params = ICreateClientModel;
  export type Response = Promise<{ status: 'OK' }>;
}

export { ICreateClientService };
