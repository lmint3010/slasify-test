import { ContextState, DispatchAction } from "@/MultiCheck/types";

export function contextReducer(state: ContextState, action: DispatchAction): ContextState {
  switch(action.type) {
    case 'SET_GROUPED_OPTIONS': {
      return { ...state, groupedOptions: action.payload };
    }
    default:
      return state;
  }
}
