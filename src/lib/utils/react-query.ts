import { useMutation, useQuery } from "@tanstack/react-query";

export const useTestQuery = useQuery({
  queryKey: ["test"],
  queryFn: async () => {
    return null;
  },
});

export const useTestMutation = useMutation({
  mutationKey: ["test"],
  mutationFn: async () => {
    return null;
  },
});
