export class Measure {
  public constructor(private measureName: string, private measureSummary: string, private measureDetails: any, private measureKey: string, private votesYes: number, private votesNo: number) {

  }

  public getMeasureName() {
    return this.measureName;
  }

  public getMeasureSummary() {
    return this.measureSummary;
  }

  public getMeasureDetails() {
    return this.measureDetails;
  }

  public getMeasureKey() {
    return this.measureKey;
  }

  public getYesVotes() {
    return this.votesYes;
  }

  public getNoVotes() {
    return this.votesNo;
  }

  public setYes(YesCount: number) {
    this.votesYes = YesCount;
  }

  public setNo(NoCount: number) {
    this.votesNo = NoCount;
  }
}
