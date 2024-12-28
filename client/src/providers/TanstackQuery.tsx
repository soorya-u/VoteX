"use client";

import { type PropsWithChildren, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function TanstackQueryProvider({ children }: PropsWithChildren) {
  const client = new QueryClient();

  const TanStackQueryDevtools =
    process.env.NODE_ENV === "production"
      ? () => null
      : lazy(() =>
          import("@tanstack/react-query-devtools").then(
            ({ ReactQueryDevtools }) => ({ default: ReactQueryDevtools }),
          ),
        );

  return (
    <QueryClientProvider client={client}>
      {children}
      <Suspense fallback={null}>
        <TanStackQueryDevtools buttonPosition="bottom-right" />
      </Suspense>
    </QueryClientProvider>
  );
}
