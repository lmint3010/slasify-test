// Temporary put all types here - we can move them to separate files later
export type Option = {
  label: string,
  value: string
};

export type ContextState = {
  originalOptions: Option[],
  groupedOptions: Option[][],
  checkedValues: string[],
  onChangeCallback?: (options: Option[]) => void,
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
