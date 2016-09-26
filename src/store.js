/* @flow */
/* External Imports. */
import {List, Record} from 'immutable';
import {createStore} from 'redux';
/* Local Imports. */
import todo_app from './reducers';

/********************************/
// Local Declarations.
/********************************/

/********************************/
// Exported Declarations.
/********************************/
export const Todo = Record({
  text: '',
  completed: false
});

export const FilterSettings = Object.freeze({
  completed: 'COMPLETED',
  active: 'ACTIVE',
  all: 'ALL'
});

export const State = Record({
  todos: List(),
  filter: FilterSettings.all
});

export const dispatch = (action: Object) => STORE.dispatch(action);

export const STORE = createStore(todo_app);
