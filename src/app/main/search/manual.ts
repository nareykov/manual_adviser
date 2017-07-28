export class Manual {
  id: number;
  published: boolean;
  name: string;
  date: string;
  image: string;
  introduction: string;
  username: string;
  rating: number;
  tagNames: Array<String>;

  constructor() {
    this.name = 'НОВАЯ ИНСТРУКЦИЯ';
    this.introduction = 'ОПИСАНИЕ';
    this.published = false;
    this.rating = 123;
  }
}
