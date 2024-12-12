export type Option = {
  label: string,
  value: string
};

export type ContextState = {
  groupedOptions: Option[][],
};

export type DispatchAction = {
  type: 'SET_GROUPED_OPTIONS',
  payload: Option[][],
};
