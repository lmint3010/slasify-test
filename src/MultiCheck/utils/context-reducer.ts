import { produce } from 'immer';

import { ContextState, DispatchAction } from "@/MultiCheck/types";
import { SelectAllOption } from '@/MultiCheck/constants/initial';

export function contextReducer(state: ContextState, action: DispatchAction): ContextState {
  switch(action.type) {
    case 'INITIAL': {
      const { groupedOptions, checkedValues, originalOptions, onChangeCallback } = action.payload;

      return produce(state, draft => {
        Object.assign(draft, {
          onChangeCallback,
          groupedOptions,
          originalOptions,
          checkedValues: checkedValues.length === originalOptions.length 
            ? [...checkedValues, SelectAllOption.value]
            : checkedValues
        });
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

    case 'TOGGLE_SELECT_ALL': {
      const { checked } = action.payload;

      const originalOptionsValues = state.originalOptions.map(o => o.value);

      return produce(state, draft => {
        draft.checkedValues = checked
          ? [...originalOptionsValues, SelectAllOption.value]
          : [];
      });
    }

    default:
      return state;
  }
}
