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
  type: 'SET_CHECKED_VALUES',
  payload: string[],
};
