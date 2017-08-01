export class Unit {
  id: number;
  stepId: number;
  order: number;
  content: string;
  type: string;

  constructor(stepId: number, type: string, content: string, order: number) {
    this.stepId = stepId;
    this.type = type;
    this.content = content;
    this.order = order;

  }

  setEffect(effect: string) {
    this.content = this.content.substr(0, 49) + effect + this.content.substr(-36, 36);
  }

}
