"use client";

import { useState } from "react";
import HomePage from "./components/home/HomePage";
import AppContext from "./utils/AppContext";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

export default function Home() {
  const [pageindex, setPageIndex] = useState<number>(0);

  function handlePageIndexChange(pageNumber: number) {
    setPageIndex(pageNumber);
  }
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <main className="relative font-mono">
          <div className="absolute  z-[1] h-[100vh] w-[100vw] ">
            <img src="beams.jpg" className="w-full h-full object-cover" />
          </div>

          <div className="z-[2] absolute top-1  w-[100vw]">
            <HomePage setPageNumber={handlePageIndexChange} />
          </div>
        </main>
      </AppContext>
    </QueryClientProvider>
  );
}
