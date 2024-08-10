"use client";

import { BarChart } from "@mui/x-charts";
import NavBar from "../re/NavBar";

interface HomePageInterface {
  setPageNumber: (pageNumber: number) => void;
}

function HomePage({ setPageNumber }: HomePageInterface) {
  return (
    <div className="px-2 py-2">
      <div className=" p-1">
        <NavBar setPageNumber={setPageNumber} />
      </div>
      <div className="w-[70vw] h-[30vh]">
        <BarChart
        className="w-[100vw] h-[30vh]"
        xAxis={[
            {
              scaleType: 'band',
              data: ['Page 1', 'Page 2', 'Page 3']
            }]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] ,color:"red"},
            { data: [2, 5, 10] },
          ]}
        />
      </div>
    </div>
  );
}
export default HomePage;
