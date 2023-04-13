import { Resident } from '@/interfaces/resident.interface';
import { createContext, ReactNode, useMemo, useState } from 'react';

interface ResidentContextType {
  residents: Resident[];
  setResidents: (resident: Resident[]) => void;
}

const initialResidentsContext: ResidentContextType = {
  residents: [],
  setResidents: (resident: Resident[]) => {},
};

export const ResidentsContext = createContext<ResidentContextType>(initialResidentsContext);

export const ResidentsContextProvider = ({ children }: { children: ReactNode }) => {
  const [residents, setResidents] = useState<Resident[]>([]);

  const memoizedResidents = useMemo(() => residents, [residents]);
  return (
    <ResidentsContext.Provider value={{ residents: memoizedResidents, setResidents }}>
      {children}
    </ResidentsContext.Provider>
  );
};
