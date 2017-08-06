import {Tag} from './tag';
import {Step} from './step';

export class Manual {
  id: number;
  published: boolean;
  name: string;
  date: string;
  image: string;
  introduction: string;
  username: string;
  userId: number;
  rating: number;
  tags: Array<Tag>;
  steps: Array<Step>;

  constructor() {
    this.name = 'НОВАЯ ИНСТРУКЦИЯ';
    this.introduction = 'ОПИСАНИЕ';
    this.published = false;
    this.rating = 123;
    this.userId = +localStorage.getItem('userId');
    this.image = 'https://cdn2.iconfinder.com/data/icons/facebook-ui-colored/48/JD-03-256.png';
  }
}
