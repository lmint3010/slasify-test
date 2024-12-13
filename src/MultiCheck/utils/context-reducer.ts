import { produce } from 'immer';

import { ContextState, DispatchAction } from "@/MultiCheck/types";

export function contextReducer(state: ContextState, action: DispatchAction): ContextState {
  switch(action.type) {
    case 'SET_GROUPED_OPTIONS': {
      return produce(state, draft => {
        draft.groupedOptions = action.payload
      });
    }
    case 'UPDATE_OPTION': {
      const { value, checked } = action.payload;

      return produce(state, draft => {
        const currentCheckedValues = draft.checkedValues;

        draft.checkedValues = checked
          ? [...currentCheckedValues, value]
          : currentCheckedValues.filter(v => v !== value);
      });
    }
    case 'SET_CHECKED_VALUES': {
      return produce(state, draft => {
        draft.checkedValues = action.payload;
      });
    }
    default:
      return state;
  }
}
