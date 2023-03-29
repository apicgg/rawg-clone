import { AxiosRequestConfig, CanceledError, isAxiosError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setIsLoading(true);

      const fetchGames = async () => {
        try {
          const response = await apiClient.get<FetchResponse<T>>(endpoint, {
            signal: controller.signal,
            ...requestConfig,
          });
          setData(response.data.results);
          setIsLoading(false);
        } catch (error) {
          if (error instanceof CanceledError) return;
          if (isAxiosError(error)) {
            setError(error.message);
            setIsLoading(false);
          }
        }
      };

      // useEffect(() => {
      //   apiClient
      //     .get<FetchGameResponse>("/xgames")
      //     .then((res) => setGames(res.data.results))
      //     .catch((err) => setError(err.message));
      // }, []);

      fetchGames();

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;
