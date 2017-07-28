import {Manual} from '../search/manual';

export class UserProfile {
  id: number;
  username: string;
  identity: string;
  image: string;
  date: string;
  origin: string;
  manualDTOS: Array <Manual>;
}
