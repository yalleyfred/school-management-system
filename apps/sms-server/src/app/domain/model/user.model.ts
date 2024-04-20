export interface PublicUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    creationDate: Date;
    modificationDate: Date;
    role: string;
  }
  
  export interface User extends PublicUser {
    hash?: string;
    hastRt?: string;
  }
  