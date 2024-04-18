export interface IStore {
  auth: IAuth;
}

export interface IAuth {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup extends ILogin {
  firstName: string;
  lastName: string;
}

interface Response<T> {
  success: boolean;
  data: T;
}

export type LoginRes = Response<IAuth>;
export type SignupRes = Response<IAuth>;
