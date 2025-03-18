export class Tab {
  constructor(
    public id: number,
    public name: string,
    public time: { minutes: number; seconds: number }
  ) {}
}
