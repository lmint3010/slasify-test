import type { Dispatch, FC, PropsWithChildren } from "react";
import type { ContextState, DispatchAction, Option } from "@/MultiCheck/types";

import React, { createContext, useEffect, useMemo, useReducer } from 'react';

import { contextReducer } from "@/MultiCheck/utils/context-reducer";
import { InitialContextState } from "@/MultiCheck/constants/initial";
import { groupOptionsByColumns } from "@/MultiCheck/utils/group-options-by-columns";

const Context = createContext<{
  state: ContextState,
  dispatch: Dispatch<DispatchAction>,
} | undefined>(undefined);

type RootContextProviderProps = PropsWithChildren<{
  columns: number,
  options: Option[], 
}>;

export const RootContextProvider: FC<RootContextProviderProps> = ({ children, options, columns }) => {
  const [state, dispatch] = useReducer(contextReducer, InitialContextState);

  const groupedOptions = useMemo(
    () => groupOptionsByColumns([...options], columns),
    [options, columns]
  );

  const contextValue = useMemo(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  useEffect(() => {
    dispatch({ type: 'SET_GROUPED_OPTIONS', payload: groupedOptions });
  }, [groupedOptions]);

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export function useMultiCheck() {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error('useMultiCheckContext must be used within a MultiCheckContext');
  }

  return context;
}
