export class Candidate {
  public constructor(private candidateName: string, private candidateParty: string, private candidateBio: any, private candidatePolicies: any, private raceKey: string, private candidateKey: string, private numVotes: number) {

  }

  public getCandidateName() {
    return this.candidateName;
  }

  public getCandidateParty() {
    return this.candidateParty;
  }

  public getCandidateBio() {
    return this.candidateBio;
  }

  public getCandidatePolicies() {
    return this.candidatePolicies;
  }

  public getRaceKey() {
    return this.raceKey;
  }

  public getCandidateKey() {
    return this.candidateKey;
  }

  public getTotalVotes() {
    return this.numVotes;
  }

  public setVote(voteCount: number) {
    this.numVotes = voteCount;
  }
}
