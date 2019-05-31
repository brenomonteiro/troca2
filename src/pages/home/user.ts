export class User {
    id: number;
    name: string;
    email: string;
    admin: boolean;
    password: string;
    iat: number;
    exp: number;
    confirmPassword: string;
    token: string;

  constructor(password: string, email: string) {
    this.password = name;
    this.email = email;
  }

}