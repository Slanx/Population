import { Resident } from '@/interfaces/resident.interface';
import { api } from './api';

const RESIDENTS_URL = 'residents';

const getAllResidents = async () => {
  const response = await api.get<Resident>(RESIDENTS_URL);
  return response.data;
};

const getResident = async (id: string) => {
  const response = await api.get<Resident>(`${RESIDENTS_URL}/${id}`);
  return response.data;
};

const createResident = async (resdient: Resident) => {
  const response = await api.post<Resident>(RESIDENTS_URL, resdient);
  return response.data;
};
