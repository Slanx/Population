import { useState, useCallback } from 'react';
import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export const useAxios = (axiosInstanse: AxiosInstance) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const request = useCallback(
    async <T>(params: AxiosRequestConfig) => {
      setLoading(true);

      try {
        const response = await axiosInstanse.request<T>(params);

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [axiosInstanse, setError],
  );

  const clearError = useCallback(() => setError(undefined), []);

  return { loading, request, error, clearError };
};
