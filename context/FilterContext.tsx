"use client";
import React, { createContext, useReducer, useContext, ReactNode } from "react";


interface FilterState {
  text: string;
}


type FilterAction =
  | { type: "SET_TEXT"; payload: string }
  | { type: "CLEAR" };

const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case "SET_TEXT":
      return { text: action.payload };
    case "CLEAR":
      return { text: "" };
    default:
      return state;
  }
};


interface FilterContextType {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
}

//initialize with undefined soif someone uses outside of provider, we can throw error
const FilterContext = createContext<FilterContextType | undefined>(undefined);


export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, { text: "" });

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("it is used within a FilterProvider");
  }
  return context;
};