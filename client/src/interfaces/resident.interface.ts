import { City } from './city.interface';

export interface Resident {
  _id: string;
  name: string;
  city: City;
  groups: Group[];
}

export enum GroupType {
  CITY = 'city',
  DISTRICT = 'district',
  STREET = 'street',
}

export interface Group {
  type: GroupType;
  name: string;
}
