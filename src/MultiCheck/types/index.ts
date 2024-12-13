export type Option = {
  label: string,
  value: string
};

export type ContextState = {
  originalOptions: Option[],
  groupedOptions: Option[][],
  checkedValues: string[],
};

export type DispatchAction = {
  type: 'INITIAL',
  payload: ContextState,
} | {
  type: 'TOGGLE_OPTION',
  payload: { value: string, checked: boolean },
} | {
  type: 'TOGGLE_SELECT_ALL',
  payload: { checked: boolean },
};
