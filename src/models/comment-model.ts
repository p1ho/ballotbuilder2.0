export class CandidateComment {
  public constructor(
    private commentKey: string,
    private userName: string,
    private userKey: string,
    private text: string,
    private numVotes: number,
    private candidateKey: string
  ) {}

  public getUserName() {
    return this.userName;
  }

  public getUserKey() {
    return this.userKey;
  }

  public getText() {
    return this.text;
  }

  public getTotalVote() {
    return this.numVotes;
  }

  public getCandidateKey() {
    return this.candidateKey;
  }

  public setVote(voteCount: number) {
    this.numVotes = voteCount;
  }
}

export class MeasureComment {
  public constructor(private commentKey: string, private userName: string, private userKey: string, private text: string, private numVotes: number, private measureKey: string, private yesOrNo: string) {

  }

  public getUserName() {
    return this.userName;
  }

  public getUserKey() {
    return this.userKey;
  }

  public getText() {
    return this.text;
  }

  public getTotalVote() {
    return this.numVotes;
  }

  public getMeasureKey() {
    return this.measureKey;
  }

  public getYesOrNo() {
    return this.yesOrNo;
  }

  public setVote(newVoteCount: number) {
    this.numVotes = newVoteCount;
  }
}
