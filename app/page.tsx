"use client";

import { useState } from "react";
import HomePage from "./components/home/HomePage";


export default function Home() {
  const [pageindex,setPageIndex] = useState<number>(0)
  
  function handlePageIndexChange(pageNumber:number){
    setPageIndex(pageNumber)
  }

  return (
    <main >
      <HomePage setPageNumber={handlePageIndexChange} />
    </main>
  );
}
