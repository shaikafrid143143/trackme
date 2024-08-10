"use client";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdTrendingDown } from "react-icons/md";
import NavBar from "../re/NavBar";
import Chart from "../re/Chart";
import { TODAY_STATISTICS } from "@/app/utils/constants";
import { useAppContext } from "@/app/utils/AppContext";
import { daysInThisMonth, getTodayDate } from "@/app/utils/utils";

interface HomePageInterface {
  setPageNumber: (pageNumber: number) => void;
}

function HomePage({ setPageNumber }: HomePageInterface) {
  const {userData,todaySpendAmount} = useAppContext() 
  const minimizedSpends =
    (userData?.monthLimitAmount / daysInThisMonth()) * getTodayDate() >
    todaySpendAmount;
  return (
    <div className="px-2 py-2">
      <div className=" p-1">
        <NavBar setPageNumber={setPageNumber} />
      </div>
      <div className="mt-5 flex flex-col items-center justify-center gap-6">
        <Chart type="PIE" />
        <label className="flex items-center gap-2 font-semibold shadow-lg drop-shadow-xl px-4 py-1 rounded-md border border-black">
          {TODAY_STATISTICS}{" "}
          {minimizedSpends ? (
            <IoTrendingUpSharp className="text-green-600 h-6 w-6" />
          ) : (
            <MdTrendingDown className="text-red-600 h-6 w-6 " />
          )}
        </label>
      </div>
    </div>
  );
}
export default HomePage;
