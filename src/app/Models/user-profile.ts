import {Manual} from './manual';

export class UserProfile {
  id: number;
  username: string;
  identity: string;
  image: string;
  roleId: number;
  date: string;
  origin: string;
  manualDTOS: Array <Manual>;
}
