/* @flow */
/* External Imports. */
import {List} from 'immutable';
/* Local Imports. */
import {ADD_TODO, SET_FILTER, SET_TODO_COMPLETED} from './actions';
import {State, Todo} from './store';

/********************************/
// Local Declarations.
/********************************/
const todos = (state: List<Todo> = List(), action: Object) => {
  switch(action.type) {
  case ADD_TODO:
    return state.insert(0, Todo({...action}));
  case SET_TODO_COMPLETED:
    return state.map(t => {
      if (t === action.todo) {
        return t.set('completed', action.completed);
      }
      return t;
    });
  default:
    console.error(`Invalid action '${action.type}' recieved!`);
    return state;
  }
};

/********************************/
// Exported Declarations.
/********************************/
export default function todo_app(state: State = State(), action: Object) {
  switch(action.type) {
  case ADD_TODO:
  case SET_TODO_COMPLETED:
    return state.set('todos', todos(state.todos, action));
  case SET_FILTER:
    return state.set('filter', action.filter);
  default:
    return state;
  }
}
