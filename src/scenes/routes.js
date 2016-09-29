/* @flow */
/* External Imports. */
/* Local Imports. */

/********************************/
// Local Declarations.
/********************************/
const SceneIds = Object.freeze({
  home: 'HOME_SCENE',
  todos: 'TODOS_SCENE'
});

const home_route = {id: SceneIds.home};

const todos_route = {id: SceneIds.todos};

/********************************/
// Exported Declarations.
/********************************/
export {SceneIds};

export const toHomeFromTodos = (navigator: Object) => navigator.pop();

export const toTodosFromHome = (navigator: Object) => (
  navigator.push(todos_route)
);

export const INITIAL_ROUTE_STACK = [home_route];
