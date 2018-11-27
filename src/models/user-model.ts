export class User {
  public constructor(private userName: string, private password: string, private userKey: string) {

  }

  public getUserName() {
    return this.userName;
  }

  public getUserKey() {
    return this.userKey;
  }

  public getPassword() {
  return this.password;
  }
}
