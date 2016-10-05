/* @flow */
/* External Imports. */
/* Local Imports. */
import {Card} from './types';

/********************************/
// Local Declarations.
/********************************/

/********************************/
// Exported Declarations.
/********************************/
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const SET_DECK_NAME = 'SET_DECK_NAME';
export const SET_DECK_AVATAR = 'SET_DECK_AVATAR';
export const CLEAR_DECK_STATS = 'CLEAR_DECK_STATS';
export const MAKE_GUESS = 'MAKE_GUESS';
export const SET_DECK_TO_EDIT = 'SET_DECK_TO_EDIT';
export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';

export const addDeck = (id: number, name: string = '') => ({
  type: ADD_DECK,
  id,
  name
});

export const removeDeck = (id: number) => ({
  type: REMOVE_DECK,
  id
});

export const setDeckName = (id: number, name: string) => ({
  type: SET_DECK_NAME,
  id,
  name
});

export const setDeckAvatar = (id: number, avatar: number) => ({
  type: SET_DECK_AVATAR,
  id,
  avatar
});

export const makeGuess = (id: number, correct: boolean) => ({
  type: MAKE_GUESS,
  id,
  correct
});

export const clearDeckStats = (id: number) => ({
  type: CLEAR_DECK_STATS,
  id
});

export const setDeckToEdit = (id: number) => ({
  type: SET_DECK_TO_EDIT,
  id
});

export const addCard = (id: number, image: string, audio: string) => ({
  type: ADD_CARD,
  id,
  image,
  audio
});

export const removeCard = (id: number, card: Card) => ({
  type: REMOVE_CARD,
  id,
  card
});
