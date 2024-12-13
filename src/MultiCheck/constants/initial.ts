import { ContextState, Option } from "@/MultiCheck/types";

export const InitialContextState: ContextState = {
  originalOptions: [],
  groupedOptions: [],
  checkedValues: [],
};

export const DefaultColumn: number = 1;

export const SelectAllOption: Option = {
  label: 'Select All',
  value: 'SELECT_ALL',
};
