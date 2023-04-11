import { useState, useCallback } from 'react';
import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export const useAxios = (axiosInstanse: AxiosInstance) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async <T>(params: AxiosRequestConfig) => {
      setLoading(true);

      try {
        const response = await axiosInstanse.request<T>(params);

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [axiosInstanse],
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
