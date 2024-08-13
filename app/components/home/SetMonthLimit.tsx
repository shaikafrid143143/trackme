import { SET_MONTHLY_AMOUNT, UPDATE } from "@/app/utils/constants";
import { CiSaveUp1 } from "react-icons/ci";
import { PiCurrencyInrBold } from "react-icons/pi";

function SetMonthLimit() {
  return (
    <div>
      <div>
        <img src="setMonthlyAmount.jpg" />
      </div>
      <div className=" flex items-center justify-evenly gap-4">
        <div className=" relative">
          <PiCurrencyInrBold className="w-4 left-1 h-4 text-zinc-400 absolute top-3" />
          <input
            placeholder={SET_MONTHLY_AMOUNT}
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
export default SetMonthLimit;
