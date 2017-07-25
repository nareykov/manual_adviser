import {Manual} from '../search/manual';

export class UserProfile {
  username: string;
  identity: string;
  image: string;
  date: string;
  origin: string;
  manualDTOS: Array<Manual>;
}
