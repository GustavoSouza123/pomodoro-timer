export class Session {
  constructor(
    public id: number,
    public taskId: number,
    public time: number,
    public date: string
  ) {}
}
