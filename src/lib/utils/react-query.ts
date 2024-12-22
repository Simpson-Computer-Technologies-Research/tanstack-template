import { useMutation, useQuery } from "@tanstack/react-query";

export const useDataMutation = () =>
  useMutation({
    mutationKey: ["data"],
    mutationFn: async ({ input }: { input: string[] }) => {
      // Send HTTP request to the api here
      return [];
    },
  });

export const useTestQuery = () =>
  useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      return null;
    },
  });

export const useTestMutation = () =>
  useMutation({
    mutationKey: ["test"],
    mutationFn: async () => {
      return null;
    },
  });
