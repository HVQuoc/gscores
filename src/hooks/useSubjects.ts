import useSWR from "swr";
import axiosClient from "../lib/axios-client";

const fetcher = (url: string) => axiosClient.get(url).then(res => res.data);

export function useSubjects() {
  const { data, error, isLoading } = useSWR(`/api/subjects`,
    fetcher
  );

  return {
    subjects: data,
    isLoading,
    error,
    isEmpty: !data || data.length === 0,
  };
}