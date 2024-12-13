export type Option = {
  label: string,
  value: string
};

export type ContextState = {
  groupedOptions: Option[][],
  checkedValues: string[],
};

export type DispatchAction = {
  type: 'SET_GROUPED_OPTIONS',
  payload: Option[][],
} | {
  type: 'UPDATE_OPTION',
  payload: { value: string, checked: boolean },
} | {
  type: 'SET_CHECKED_VALUES',
  payload: string[],
};
