"use client";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdTrendingDown } from "react-icons/md";
import NavBar from "../re/NavBar";
import Chart from "../re/Chart";
import { UPDATE, SPEND_AMOUNT, TODAY_STATISTICS } from "@/app/utils/constants";
import { useAppContext } from "@/app/utils/AppContext";
import { daysInThisMonth, getTodayDate } from "@/app/utils/utils";
import { CiSaveUp1 } from "react-icons/ci";
import { PiCurrencyInrBold } from "react-icons/pi";

interface HomePageInterface {
  setPageNumber: (pageNumber: number) => void;
}

function HomePage({ setPageNumber }: HomePageInterface) {
  const { userData, todaySpendAmount } = useAppContext();
  const minimizedSpends =
    (userData?.monthLimitAmount / daysInThisMonth()) * getTodayDate() >
    todaySpendAmount;
  return (
    <div className="px-2 py-2">
      <div className=" p-1">
        <NavBar setPageNumber={setPageNumber} />
      </div>
      <div className="mt-5 w-fit">
        <label className="flex items-center gap-2 font-semibold shadow-lg drop-shadow-xl px-4 py-1 rounded-md border border-black">
          {TODAY_STATISTICS}{" "}
          {minimizedSpends ? (
            <IoTrendingUpSharp className="text-green-600 h-6 w-6" />
          ) : (
            <MdTrendingDown className="text-red-600 h-6 w-6 " />
          )}
        </label>
      </div>
      <div className="mt-5 flex flex-col items-center justify-center gap-6">
        <Chart type="PIE" />
      </div>
      <div className=" flex items-center justify-evenly gap-4">
        <div className=" relative">
          <PiCurrencyInrBold className="w-4 left-1 h-4 text-zinc-400 absolute top-3" />
          <input
            placeholder={SPEND_AMOUNT}
            className="shadow-lg outline-none border-none py-2 pl-6 w-[50vw] rounded-md hover:shadow-2xl"
            type="text"
          />
        </div>
        <button className="rounded-md shadow-xl font-semibold bg-purple-800 flex items-center text-white py-2 px-6 gap-2 hover:shadow-2xl  hover:scale-105  ">
          {UPDATE}
          <CiSaveUp1 className="w-7 h-7 " />
        </button>
      </div>
    </div>
  );
}
export default HomePage;
