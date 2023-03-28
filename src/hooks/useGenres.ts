import { CanceledError, isAxiosError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Genre {
  id: number;
  name: string;
}

interface FetchGenreResponse {
  count: number;
  results: Genre[];
}

const useGenre = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    const fetchGames = async () => {
      try {
        const response = await apiClient.get<FetchGenreResponse>("/genres", {
          signal: controller.signal,
        });
        setGenres(response.data.results);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof CanceledError) return;
        if (isAxiosError(error)) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    };

    fetchGames();

    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
};

export default useGenre;
