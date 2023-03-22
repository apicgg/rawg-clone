import { Text } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Game {
  id: number;
  name: string;
}

interface FetchGameResponse {
  count: number;
  results: Game[];
}

const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await apiClient.get<FetchGameResponse>("/games");
        setGames(response.data.results);
      } catch (error) {
        const err = error as AxiosError;
        setError(err.message);
      }
    };

    fetchGames();
  }, []);

  // useEffect(() => {
  //   apiClient
  //     .get<FetchGameResponse>("/xgames")
  //     .then((res) => setGames(res.data.results))
  //     .catch((err) => setError(err.message));
  // }, []);

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  );
};

export default GameGrid;
