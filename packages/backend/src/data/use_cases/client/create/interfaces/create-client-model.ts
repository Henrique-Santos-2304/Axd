import { IUserClientBasic } from 'src/infra/models/user-client/user-client-model';

type ICreateClientModel = Omit<IUserClientBasic, 'id'>;

export { ICreateClientModel };
