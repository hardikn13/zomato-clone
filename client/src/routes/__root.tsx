// src/_root.tsx

import Navbar from "@/components/navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Route = createRootRoute({
  component: () => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <div className="w-screen px-32">
          <Navbar />
          <Outlet />
          {process.env.NODE_ENV === "development" && <TanStackRouterDevtools />}
        </div>
      </QueryClientProvider>
    );
  },
});
