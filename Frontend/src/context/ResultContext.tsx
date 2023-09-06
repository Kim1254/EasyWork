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

// reducer
/* 
  ADD_DATA: 질문 결과 추가
  DELETE_DATA: 질문 결과 하나 삭제
  RESET: 질문 결과 초기화
*/
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

// 질문에 대한 사용자 응답 결과를 저장하는 context
export const ResultContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

// provider
export const ResultContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <ResultContext.Provider value={{ state, dispatch }}>{children}</ResultContext.Provider>;
};
