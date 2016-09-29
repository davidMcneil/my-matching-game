/* @flow */
/* External Imports. */
import {List} from 'immutable';
import {AsyncStorage} from 'react-native';
import {combineReducers, createStore} from 'redux';
import {autoRehydrate, persistStore} from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
/* Local Imports. */
import * as reducers from './reducers';
import {FilterSettings, Todo} from './types';

/********************************/
// Local Declarations.
/********************************/
const reducer = combineReducers(reducers);

const InitialState = {
  todos: List(),
  filter: FilterSettings.all
};

/********************************/
// Exported Declarations.
/********************************/
export const dispatch = (action: Object) => STORE.dispatch(action);

export const STORE = createStore(reducer, InitialState, autoRehydrate());
persistStore(STORE, {
  storage: AsyncStorage,
  transforms: [immutableTransform({records: [Todo]})]
});
