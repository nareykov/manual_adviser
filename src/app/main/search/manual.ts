export class Manual {
  published: boolean;
  name: string;
  date: string;
  image: string;
  introduction: string;
  username: string;
  tagNames: Array<String>;

  constructor() {
    this.name = 'НОВАЯ ИНСТРУКЦИЯ';
    this.introduction = 'ОПИСАНИЕ';
    this.published = false;
  }
}
