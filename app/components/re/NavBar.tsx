"use client";

import { useAppContext } from "@/app/utils/AppContext";
import { HELLO } from "@/app/utils/constants";
import { daysInThisMonth, getTodayDate } from "@/app/utils/utils";
import { BiUser } from "react-icons/bi";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdTrendingDown } from "react-icons/md";
import { PiCurrencyInr } from "react-icons/pi";

interface NavBarInterface {
  setPageNumber: (pageNumber: number) => void;
}

function NavBar({ setPageNumber }: NavBarInterface) {
  const { userData, todaySpendAmount } = useAppContext();
  const balance = userData?.balance;
  const minimizedSpends =
    (userData?.monthLimitAmount / daysInThisMonth()) * getTodayDate() >
    todaySpendAmount;

  return (
    <nav>
      <ul className="flex w-full justify-between items-center">
        <a>
          <BiUser className="border border-purple-900 bg-purple-50 rounded-md p-2  h-12 w-12 shadow-lg" />
        </a>
        <label className="text-lg font-mono flex items-center text-black gap-[0.15rem]">
          {HELLO}
          <span className="text-purple-900 font-semibold tracking-wider">
            {userData?.fisrtName}
          </span>
        </label>
        <div
          className={`flex items-center gap-2 py-[0.1rem] border px-2 rounded-md border-zinc-50 shadow-md ${
            minimizedSpends ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <label className="flex items-center ">
            <PiCurrencyInr className="" />
            {balance}
          </label>
          {minimizedSpends ? (
            <IoTrendingUpSharp className="text-green-600 h-6 w-6" />
          ) : (
            <MdTrendingDown className="text-red-600 h-6 w-6 " />
          )}
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
