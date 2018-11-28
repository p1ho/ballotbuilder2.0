export class User {
  public constructor(private userName: string, private userKey: string) {

  }

  public getUserName() {
    return this.userName;
  }

  public getUserKey() {
    return this.userKey;
  }
}
