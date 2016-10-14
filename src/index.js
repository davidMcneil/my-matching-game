/* @flow */
/* External Imports. */
import React from 'react';
import {BackAndroid, Navigator} from 'react-native';
import Orientation from 'react-native-orientation';
import {Provider} from 'react-redux';
/* Local Imports. */
import {CameraScene} from './scenes/camera_scene';
import {DeckEditScene} from './scenes/deck_edit_scene';
import {DeckListScene} from './scenes/deck_list_scene';
import {DeckPlayScene} from './scenes/deck_play_scene';
import * as routes from './scenes/routes.js';
import {STORE} from './store';

/********************************/
// Local Declarations.
/********************************/
let navigator;

/* Enable back button on device. */
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
  return false;
});

const renderScene = (route, navigator) => {
  switch (route.id) {
  case routes.SceneIds.deck_list:
    return <DeckListScene
      toDeckPlay={() => routes.toDeckPlayFromDeckList(navigator)}
      toDeckEdit={() => routes.toDeckEditFromDeckList(navigator)}/>;
  case routes.SceneIds.deck_play:
    return <DeckPlayScene/>;
  case routes.SceneIds.deck_edit:
    return <DeckEditScene
      toDeckList={() => routes.toDeckListFromDeckEdit(navigator)}
      toCamera={() => routes.toCameraFromDeckEdit(navigator)}/>;
  case routes.SceneIds.camera:
    return <CameraScene/>;
  default:
    console.error('Invalid scene id!');
  }
};

const configureScene = (route) => {
  switch (route.id) {
  case routes.SceneIds.deck_list:
    return Navigator.SceneConfigs.FadeAndroid;
  case routes.SceneIds.deck_play:
    return Navigator.SceneConfigs.FadeAndroid;
  case routes.SceneIds.deck_edit:
    return Navigator.SceneConfigs.FadeAndroid;
  case routes.SceneIds.camera:
    return Navigator.SceneConfigs.FadeAndroid;
  default:
    console.error('Invalid scene id!');
  }
};

/********************************/
// Exported Declarations.
/********************************/
export const MyMatchingGame = () => {
  Orientation.lockToPortrait();
  return (
    <Provider store={STORE}>
      <Navigator ref={(nav) => navigator = nav}
        initialRouteStack={routes.INITIAL_ROUTE_STACK}
        renderScene={renderScene}
        configureScene={configureScene}/>
    </Provider>
  );
};
