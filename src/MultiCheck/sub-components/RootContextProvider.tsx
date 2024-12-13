import type { Dispatch, FC, PropsWithChildren } from "react";
import type { ContextState, DispatchAction, Option } from "@/MultiCheck/types";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

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
  onCheckedOptionsChange?: (options: Option[]) => void,
  defaultValues?: string[],
}>;

export const RootContextProvider: FC<RootContextProviderProps> = ({
  children,
  options,
  columns,
  defaultValues,
  onCheckedOptionsChange
}) => {
  const [state, dispatch] = useReducer(contextReducer, InitialContextState);

  const { checkedValues } = state;

  const groupedOptions = useMemo(
    () => groupOptionsByColumns([...options], columns),
    [options, columns]
  );

  const contextValue = useMemo(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  useEffect(() => {
    dispatch({
      type: 'SET_GROUPED_OPTIONS',
      payload: groupedOptions
    });
  }, [groupedOptions]);

  useEffect(() => {
    if (!onCheckedOptionsChange) return;

    const { checkedValues } = state;

    const checkedOptions = options.filter(
      ({ value }) => checkedValues.includes(value)
    );

    onCheckedOptionsChange(checkedOptions);
  }, [checkedValues]);

  useEffect(() => {
    dispatch({
      type: 'SET_CHECKED_VALUES',
      payload: defaultValues || []
    });
  }, [defaultValues]);

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export function useMultiCheck() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useMultiCheckContext must be used within a MultiCheckContext');
  }

  return context;
}
