import { queryClient } from "@/lib/utils/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </>
    );
  },
});
