/* @flow */
/* External Imports. */
import React from 'react';
import {BackAndroid, Navigator} from 'react-native';
import {Provider} from 'react-redux';
/* Local Imports. */
import {HomeScene} from './scenes/home_scene';
import {TodosScene} from './scenes/todos_scene';
import {INITIAL_ROUTE_STACK, SceneIds, toHomeFromTodos, toTodosFromHome
       } from './scenes/routes.js';
import {STORE} from './store';

/********************************/
// Local Declarations.
/********************************/
let navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
  return false;
});

const renderScene = (route, navigator) => {
  switch (route.id) {
  case SceneIds.home:
    return <HomeScene toTodos={() => toTodosFromHome(navigator)}/>;
  case SceneIds.todos:
    return <TodosScene toHome={() => toHomeFromTodos(navigator)}/>;
  default:
    console.error('Invalid scene id!');
  }
};

const configureScene = (route) => {
  switch (route.id) {
  case SceneIds.home:
    return Navigator.SceneConfigs.FadeAndroid;
  case SceneIds.todos:
    return Navigator.SceneConfigs.FadeAndroid;
  default:
    console.error('Invalid scene id!');
  }
};

/********************************/
// Exported Declarations.
/********************************/
export const MyMatchingGame = () => (
  <Provider store={STORE}>
    <Navigator ref={(nav) => navigator = nav}
      initialRouteStack={INITIAL_ROUTE_STACK}
      renderScene={renderScene}
      configureScene={configureScene}/>
  </Provider>
);
