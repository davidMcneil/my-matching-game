/* @flow */
/* External Imports. */
import {List} from 'immutable';
/* Local Imports. */
import * as actions from './actions';
import {Card, Deck} from './types';

/********************************/
// Local Declarations.
/********************************/
const cards = (state: List<Card> = List(), action: Object) => {
  switch(action.type) {
  case actions.ADD_CARD:
    return state.push(Card({...action}));
  case actions.REMOVE_CARD:
    return state.filter(c => c !== action.card);
  default:
    return state;
  }
};

const deck = (state: Deck, action: Object) => {
  switch(action.type) {
  case actions.SET_DECK_NAME:
    return state.set('name', action.name);
  case actions.SET_DECK_AVATAR:
    return state.set('avatar', action.avatar);
  case actions.CLEAR_DECK_STATS:
    return state.set('correct', 0).set('total', 0);
  case actions.MAKE_GUESS:
    return state.set('total', state.total + 1)
      .set('correct', action.correct ? state.correct + 1 : state.correct);
  case actions.ADD_CARD:
  case actions.REMOVE_CARD:
    return state.set('cards', cards(state.cards, action));
  default:
    return state;
  }
};

/********************************/
// Exported Declarations.
/********************************/
export const decks = (state: List<Deck> = List(), action: Object) => {
  switch(action.type) {
  case actions.ADD_DECK:
    return state.push(Deck({...action}));
  case actions.REMOVE_DECK:
    return state.filter(d => d.id !== action.id);
  case actions.SET_DECK_NAME:
  case actions.SET_DECK_AVATAR:
  case actions.CLEAR_DECK_STATS:
  case actions.MAKE_GUESS:
  case actions.ADD_CARD:
  case actions.REMOVE_CARD:
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

export const deck_to_edit = (state: number = null, action: Object) => {
  switch(action.type) {
  case actions.SET_DECK_TO_EDIT:
    return action.id;
  default:
    return state;
  }
};
