import {Unit} from './unit';
import {Comment} from './comment';
export class Step {
  id: number;
  manualId: number;
  name: string;
  units: Array<Unit>;
  comments: Array<Comment>;
  order: number;

  constructor(manualId: number, name: string, order: number) {
    this.manualId = manualId;
    this.name = name;
    this.order = order;
  }
}
