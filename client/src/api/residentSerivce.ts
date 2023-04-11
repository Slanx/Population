import { useAxios } from '@/hooks/useAxios';
import { Resident } from '@/interfaces/resident.interface';
import { api } from './api';

const RESIDENTS_URL = 'residents';

const ResidentService = () => {
  const { clearError, error, loading, request } = useAxios(api);

  const getAllResidents = async () => {
    return request<Resident[]>({ url: RESIDENTS_URL, method: 'get' });
  };

  const getResident = async (id: string) => {
    return request<Resident>({ url: `${RESIDENTS_URL}/${id}`, method: 'get' });
  };

  const createResident = async (resdient: Omit<Resident, '_id' | 'city'>) => {
    return request<Resident>({ url: RESIDENTS_URL, method: 'post', data: resdient });
  };

  return { getAllResidents, getResident, createResident, clearError, error, loading };
};

export default ResidentService;
