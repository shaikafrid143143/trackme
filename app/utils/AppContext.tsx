
"use client"

import { ReactNode, createContext, useContext, useReducer } from "react";
import { userType } from "../types/userTypes";

export type dispatchDataType = {
    type: string,
    payload: any
  };

  type contextType = {
    dispatch:React.Dispatch<dispatchDataType>,
    userData:userType 
  }
const initState:contextType  = {
  dispatch: () => {},
  userData:{
    emailId: "",
    mobilenumber: 0,
    password: "",
    name: "Shaik afrid",
    monthlyLimitAmount: 3000,
    daySpend: 0,
    prevDaySpends: [0],
    totalMonthSpend:0,
    savedAmount: 2500,
    todayDate: 0,
  }
};

const contextProvider = createContext(initState);

function reducer(state: contextType, action: dispatchDataType) {
  switch (action?.type) {
    case "setSelectedMethod":
      return {
        ...state
      };
    
    default:
      throw new Error("Action unkonwn");
  }
}

export default function AppContext({ children }: { children: ReactNode }) {
  const [
    {
    userData
    },
    dispatch,
  ] = useReducer(reducer, initState);

  return (
    <contextProvider.Provider
      value={{
        
        dispatch,
        userData
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