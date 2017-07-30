export class Unit {
  id: number;
  stepId: number;
  order: number;
  content: string;
  type: string;

  constructor(type: string, content: string) {
    this.type = type;
    this.content = content;
  }
}
