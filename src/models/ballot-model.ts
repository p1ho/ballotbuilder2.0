export class Ballot {
  public constructor(private userKey: string, private ballotRaces: any, private ballotMeasures: any) {

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
}
