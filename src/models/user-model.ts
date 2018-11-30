export class User {
  public constructor(private userName: string, private userKey: string, private userRaces: any, private userMeasures: any) {

  }

  public getUserName() {
    return this.userName;
  }

  public getUserKey() {
    return this.userKey;
  }

  public getRaces() {
  	return this.userRaces;
  }

  public getMeasures() {
  	return this.userMeasures;
  }

  public setRaces(newRaces: any) {
    this.userRaces = newRaces;
  }

  public setMeasures(newMeasures: any) {
    this.userMeasures = newMeasures;
  }
}
