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
  deck_to_edit: null
};

/********************************/
// Exported Declarations.
/********************************/
export const getDeckById = (id: number) => (
    STORE.getState().decks.find(d => d.id === id)
);

export const getNextDeckId = () => {
  let max_id = -1;
  for (const d of STORE.getState().decks) {
    max_id = Math.max(max_id, d.id);
  }
  return max_id + 1;
};

export const dispatch = (action: Object) => STORE.dispatch(action);

export const STORE = createStore(reducer, InitialState, autoRehydrate());
persistStore(STORE, {
  storage: AsyncStorage,
  transforms: [immutableTransform({records: [Deck, Card]})]
});
