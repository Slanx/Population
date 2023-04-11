import { Resident } from '@/interfaces/resident.interface';
import { createContext } from 'react';

export const CreateResidentContext = createContext({
  createResident: (resident: Resident) => {},
});
