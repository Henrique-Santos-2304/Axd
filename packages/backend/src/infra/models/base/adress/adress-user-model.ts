interface IAdress {
  cep: string;
  country: string;
  city: string;
  state: string;
  district: string;
  road: string;
  number: number;
  complement?: string;
}

export { IAdress };
