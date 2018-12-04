export class Race {
  public constructor(
    private raceName: string,
    private raceDuties: string,
    private raceKey: string
  ) {}

  public getRaceName() {
    return this.raceName;
  }

  public getRaceDuties() {
    return this.raceDuties;
  }

  public getRaceKey() {
    return this.raceKey;
  }

}
