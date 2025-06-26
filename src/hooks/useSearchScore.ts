import useSWR from "swr";
import axiosClient from "../lib/axios-client";

const fetcher = (url: string) => axiosClient.get(url).then(res => res.data);

export function useSearchScore(regNumber: string | null) {
  const shouldFetch = regNumber && regNumber.trim() !== "";
  const { data, error, isLoading } = useSWR(
    shouldFetch ? `/api/scores/${encodeURIComponent(regNumber!)}` : null,
    fetcher
  );

  return {
    scores: data?.scores || [],
    isLoading,
    error,
    isEmpty: !data || data.length === 0,
  };
}