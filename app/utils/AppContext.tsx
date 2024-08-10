"use client";

import { ReactNode, createContext, useContext, useReducer } from "react";
import { userType } from "../types/userTypes";

export type dispatchDataType = {
  type: string;
  payload: any;
};

type contextType = {
  dispatch: React.Dispatch<dispatchDataType>;
  userData: userType;
  pageIndex:number;
  todaySpendAmount:number
};
const initState: contextType = {
  dispatch: () => {},
  userData: {
    emailId: "",
    mobilenumber: 0,
    password: "",
    fisrtName: "Shaik",
    lastName: "afrid",
    monthLimitAmount:1000,
    balance:950,
    dailyLimit:50,
    lastUpdatedDate:10,
    todayDate:10,
    todaySpends:[10,10,5],
    totalSaved:0,
    totalSpend:50
  },
  pageIndex:0,
  todaySpendAmount:20

};

const contextProvider = createContext(initState);

function reducer(state: contextType, action: dispatchDataType) {
  switch (action?.type) {
    case "setPageIndex":
      return {
        ...state,
        pageIndex:action?.payload
      };

    default:
      throw new Error("Action unkonwn");
  }
}

export default function AppContext({ children }: { children: ReactNode }) {
  const [{ userData,pageIndex,todaySpendAmount }, dispatch] = useReducer(reducer, initState);

  return (
    <contextProvider.Provider
      value={{
        dispatch,
        userData,
        pageIndex,todaySpendAmount
      }}
    >
      {children}
    </contextProvider.Provider>
  );
}

export function useAppContext() {
  const context = useContext(contextProvider);
  if (!context) throw new Error("Unable to use!");
  return context;
}
