"use client";
import { createContext, useContext, useReducer } from "react";
import { Action, DispatchType, StoreType } from "./type";

const initialState: StoreType = {
  calendarViewMode: "week",
  competitionMap: null,
  dateFilter: null,
  contestFilter: null,
  contestData: null,
  baseDate: new Date(),
  selectedDate: new Date(),
};

const StoreContext = createContext<StoreType>(initialState);
const StoreContextDispatch = createContext<DispatchType>(() => {});

const reducer = (state: StoreType, action: Action) => {
  switch (action.type) {
    case "STORE_STATE":
      return { ...state, ...action.payload };
    case "RESET_STORE":
      return initialState;
  }
};

const StoreProvider = ({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={state}>
      <StoreContextDispatch.Provider value={dispatch}>
        {children}
      </StoreContextDispatch.Provider>
    </StoreContext.Provider>
  );
};

const useStoreContext = () => {
  const state = useContext(StoreContext);
  return state;
};

const useStoreDispatch = () => {
  const dispatch = useContext(StoreContextDispatch);
  return dispatch;
};

export { StoreProvider, useStoreContext, useStoreDispatch };
