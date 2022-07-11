import { IAdress } from '../base/adress/adress-user-model';

interface IUserClientBasic {
  id: string;
  name: string;
  email: string;
  password: string;
  telephone: string;
  age: number;
}

interface IUserClientCart {
  cart_number: string;
  expires_in: number;
  cart_code: number;
  name_in_cart: number;
  flag_car: string;
}

interface IUserClientFull {
  data: IUserClientBasic;
  adress: IAdress;
  cart_purchase: IUserClientCart[];
}

export { IUserClientFull, IUserClientBasic, IUserClientCart };
