import { produce } from 'immer';

import { ContextState, DispatchAction } from "@/MultiCheck/types";
import { SelectAllOption } from '@/MultiCheck/constants/initial';

export function contextReducer(state: ContextState, action: DispatchAction): ContextState {
  switch(action.type) {
    case 'INITIAL': {
      const { groupedOptions, checkedValues, originalOptions } = action.payload;

      const isCheckedAll = checkedValues.length === originalOptions.length;

      return produce(state, draft => {
        draft.groupedOptions = groupedOptions;
        draft.originalOptions = originalOptions;
        draft.checkedValues = isCheckedAll
          ? [...checkedValues, SelectAllOption.value]
          : checkedValues;
      });
    }

    case 'TOGGLE_OPTION': {
      const { value, checked } = action.payload;

      return produce(state, draft => {
        const currentCheckedValues = draft.checkedValues;

        // Update checked values based on the toggle action
        const nextCheckedValues = checked
          ? [...currentCheckedValues, value]
          : currentCheckedValues.filter(v => v !== value);

        // Filter out SelectAllOption and check if all original options are checked
        const checkedValuesWithoutSelectAll = nextCheckedValues.filter(v => v !== SelectAllOption.value);
        const isCheckedAll = checkedValuesWithoutSelectAll.length === draft.originalOptions.length;

        // Update checkedValues based on whether all options are checked
        draft.checkedValues = isCheckedAll 
          ? [...checkedValuesWithoutSelectAll, SelectAllOption.value] 
          : checkedValuesWithoutSelectAll;
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
