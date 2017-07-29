export class Rating {
  user: number;
  manual: number;
  value: number;
  constructor(user: number, manual: number, value: number) {
    this.user = user;
    this.manual = manual;
    this.value = value;
  }
}
