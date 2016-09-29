/* @flow */
/* External Imports. */
/* Local Imports. */
import {Todo} from './types';

/********************************/
// Local Declarations.
/********************************/

/********************************/
// Exported Declarations.
/********************************/
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const SET_TODO_COMPLETED = 'SET_TODO_COMPLETED';
export const SET_FILTER = 'SET_FILTER';

export const addTodo = (text: string) => ({
  type: ADD_TODO,
  text
});

export const removeTodo = (todo: Todo) => ({
  type: REMOVE_TODO,
  todo
});

export const setTodoCompleted = (todo: Todo, completed: boolean) => ({
  type: SET_TODO_COMPLETED,
  todo,
  completed
});

export const setFilter = (filter: string) => ({
  type: SET_FILTER,
  filter
});
