/* @flow */
/* External Imports. */
import {List} from 'immutable';
/* Local Imports. */
import * as actions from './actions';
import {FilterSettings, Todo} from './types';

/********************************/
// Local Declarations.
/********************************/

/********************************/
// Exported Declarations.
/********************************/
export const todos = (state: List<Todo> = List(), action: Object) => {
  switch(action.type) {
  case actions.ADD_TODO:
    return state.insert(0, Todo({...action}));
  case actions.REMOVE_TODO:
    return state.filter(t => t !== action.todo);
  case actions.SET_TODO_COMPLETED:
    return state.map(t => {
      if (t === action.todo) {
        return t.set('completed', action.completed);
      }
      return t;
    });
  default:
    return state;
  }
};

export const filter = (state: string = FilterSettings.all, action: Object) => {
  switch(action.type) {
  case actions.SET_FILTER:
    return action.filter;
  default:
    return state;
  }
};
