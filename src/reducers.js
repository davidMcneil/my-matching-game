/* @flow */
/* External Imports. */
import {List} from 'immutable';
import RNFS from 'react-native-fs';
/* Local Imports. */
import * as actions from './actions';
import {Card, Deck, getAudioPath, getCardAudioPath, getCardImagePath,
        getImagePath} from './types';

/********************************/
// Local Declarations.
/********************************/
const deck = (state: Deck, action: Object) => {
  switch(action.type) {
  case actions.UPDATE_DECK_NAME:
    return state.set('name', action.name);
  case actions.UPDATE_DECK_AVATAR:
    return state.set('avatar', action.avatar);
  case actions.RESET_DECK_STATS:
    return state.set('correct', 0).set('total', 0);
  case actions.MAKE_GUESS:
    return state.set('total', state.total + 1)
      .set('correct', action.correct ? state.correct + 1 : state.correct);
  default:
    return state;
  }
};

/********************************/
// Exported Declarations.
/********************************/
export const decks = (state: List<Deck> = List(), action: Object) => {
  switch(action.type) {
  case actions.CREATE_DECK:
    return state.push(Deck({...action}));
  case actions.DELETE_DECK:
    return state.filter(d => d.id !== action.id);
  case actions.UPDATE_DECK_NAME:
  case actions.UPDATE_DECK_AVATAR:
  case actions.RESET_DECK_STATS:
  case actions.MAKE_GUESS:
    return state.map(d => {
      if (d.id === action.id) {
        return deck(d, action);
      }
      return d;
    });
  default:
    return state;
  }
};

export const cards = (state: List<Card> = List(), action: Object) => {
  switch(action.type) {
  case actions.CREATE_CARD:
    return state.push(Card({...action}));
  case actions.DELETE_CARD:
    RNFS.unlink(getAudioPath(action.id, action.deck_id))
      .catch((err) => console.error(err.message));
    RNFS.unlink(getImagePath(action.id, action.deck_id))
      .catch((err) => console.error(err.message));
    return state.filter(c => c.id !== action.id);
  case actions.SET_AUDIO_SET:
    return state.map(c => {
      if (c.id === action.id) {
        return c.set('audio_set', true);
      }
      return c;
    });
  case actions.DELETE_DECK:
    for (const card of state) {
      if (card.audio_set) {
        RNFS.unlink(getCardAudioPath(card))
          .catch((err) => console.error(err.message));
      }
      RNFS.unlink(getCardImagePath(card))
        .catch((err) => console.error(err.message));
    }
    return state.filter(c => c.deck_id !== action.id);
  default:
    return state;
  }
};

export const next_id = (state: number = 0, action: Object) => {
  switch(action.type) {
  case actions.CREATE_DECK:
  case actions.CREATE_CARD:
    return state + 1;
  default:
    return state;
  }
};

export const selected_deck = (state: ?number = null, action: Object) => {
  switch(action.type) {
  case actions.UPDATE_SELECTED_DECK:
    return action.id;
  default:
    return state;
  }
};
