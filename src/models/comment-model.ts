export class Comment {
  public constructor(
    private userName: string,
    private userKey: string,
    private text: string,
    private numVotes: number
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

  public setVote(voteCount: number) {
    this.numVotes = voteCount;
  }
}
