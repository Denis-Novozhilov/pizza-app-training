// export interface ProfileResponse {
//   id: number;
//   email: string;
//   address: string;
//   name: string;
//   phone: string;
// }

export interface ProfileResponse {
  id: number;
  email: string;
  passwordHash: string;
  address: string;
  name: string;
  restoreToken: null;
  phone: string;
}

/*
export interface Profile {
    id: number;
    email: string;
    address: string;
    name: string;
    phone: string;
}
*/