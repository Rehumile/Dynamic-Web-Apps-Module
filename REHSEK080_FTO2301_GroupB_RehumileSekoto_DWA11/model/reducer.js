import { State } from "./store.js";
import { Action } from "./actions.js"

/**
 * @param {State} state
 * @param {Action} action
 * @return {State}
*/
export const reducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
          return {
            ...state,
            count: state.count + 1,
          };
        case 'DECREMENT':
          return {
            ...state,
            count: state.count - 1,
          };
        case 'RESET':
          return {
            ...state,
            count: 0,
          };
        default:
          return state;
      }
}