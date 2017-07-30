import {Unit} from './unit';

export class Step {
  id: number;
  manualId: number;
  name: string;
  units: Array<Unit>;
  order: number;

  constructor(manualId: number, name: string, order: number) {
    this.manualId = manualId;
    this.name = name;
    this.order = order;
  }
}
