export class Medal {
  id: number;
  name: string;
  text: string;
  image: string;
  constructor(id: number, name: string, text: string, image: string) {
    this.id = id;
    this.name = name;
    this.text = text;
    this.image = image;
  }
}
