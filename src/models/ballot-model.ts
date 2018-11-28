export class Ballot {
  public constructor(private userKey: string, private ballotRaces: any, private ballotMeasures: any, private ballotKey: string) {

  }

  public getUserKey() {
    return this.userKey;
  }

  public getBallotRaces() {
    return this.ballotRaces;
  }

  public getBallotMeasures() {
    return this.ballotMeasures;
  }

  public getBallotKey() {
    return this.ballotKey;
  }
}
