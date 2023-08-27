"use client";

import React, { Dispatch, createContext, useReducer } from "react";

type StateType = {
  result: { field: string; data: string }[];
};

type ActionType = {
  type: string;
  payload?: { field: string; data: string };
};

const initialState: StateType = {
  result: [],
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "ADD_DATA":
      return { result: [...state.result, action.payload as { field: string; data: string }] };
    case "DELETE_DATA":
      return { result: state.result.filter((item) => item.field !== action.payload?.field) };
    case "RESET":
      return { result: [] };
    default:
      return state;
  }
};

export const ResultContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const ResultContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <ResultContext.Provider value={{ state, dispatch }}>{children}</ResultContext.Provider>;
};
