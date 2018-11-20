export class Measure {
  public constructor(private measureName: string, private measureSummary: string, private measureDetails: any, private measureKey: string) {

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
}
