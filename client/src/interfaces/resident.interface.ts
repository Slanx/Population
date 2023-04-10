import { City } from './city.interface';

export interface Resident {
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
