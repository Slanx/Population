import { useAxios } from '@/hooks/useAxios';
import { api } from './api';
import { City } from '@/interfaces/city.interface';

const CITY_URL = 'city';

const CityService = () => {
  const { clearError, error, loading, request } = useAxios(api);

  const getAllCity = async (offset?: number, limit?: number) => {
    return request<City[]>({
      url: CITY_URL,
      method: 'get',
      params: {
        offset,
        limit,
      },
    });
  };

  const getCity = async (id: string) => {
    return request<City>({ url: `${CITY_URL}/${id}`, method: 'get' });
  };

  const getCityByName = async (name: string) => {
    return request<City>({ url: `${CITY_URL}/title/${name}`, method: 'get' });
  };

  const searchCity = async (title: string, params?: { offset?: number; limit?: number }) => {
    return request<City[]>({ url: `${CITY_URL}/search/${title}`, method: 'get', params });
  };

  const createCity = async (resdient: Omit<City, '_id'>) => {
    return request<City>({ url: CITY_URL, method: 'post', data: resdient });
  };

  return { getAllCity, getCity, createCity, searchCity, getCityByName, clearError, error, loading };
};

export default CityService;
