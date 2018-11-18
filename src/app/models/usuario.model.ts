export interface Usuario {
  _id: string;
  name: string;
  email: string;
  cpf: string;
  accesToken: string;

  username: string;
  password?: string;
  token?: string;
}

