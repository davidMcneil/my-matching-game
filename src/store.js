/* @flow */
/* External Imports. */
import {List} from 'immutable';
import {AsyncStorage} from 'react-native';
import {combineReducers, createStore} from 'redux';
import {autoRehydrate, persistStore} from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
/* Local Imports. */
import * as reducers from './reducers';
import {Card, Deck} from './types';

/********************************/
// Local Declarations.
/********************************/
const reducer = combineReducers(reducers);

const InitialState = {
  decks: List(),
  cards: List(),
  next_id: 0,
  selected_deck: null
};

/********************************/
// Exported Declarations.
/********************************/
export const STORE = createStore(reducer, InitialState, autoRehydrate());
persistStore(STORE, {
  storage: AsyncStorage,
  transforms: [immutableTransform({records: [Deck, Card]})]
});
