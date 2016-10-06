/* @flow */
/* External Imports. */
/* Local Imports. */

/********************************/
// Local Declarations.
/********************************/

/********************************/
// Exported Declarations.
/********************************/
export const CREATE_DECK = 'CREATE_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const UPDATE_DECK_NAME = 'UPDATE_DECK_NAME';
export const UPDATE_DECK_AVATAR = 'UPDATE_DECK_AVATAR';
export const RESET_DECK_STATS = 'RESET_DECK_STATS';
export const MAKE_GUESS = 'MAKE_GUESS';
export const CREATE_CARD = 'CREATE_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const UPDATE_SELECTED_DECK = 'UPDATE_SELECTED_DECK';

export const createDeck = (id: number, name: string = '') => ({
  type: CREATE_DECK,
  id,
  name
});

export const deltetDeck = (id: number) => ({
  type: DELETE_DECK,
  id
});

export const updateDeckName = (id: number, name: string) => ({
  type: UPDATE_DECK_NAME,
  id,
  name
});

export const updateDeckAvatar = (id: number, avatar: string) => ({
  type: UPDATE_DECK_AVATAR,
  id,
  avatar
});

export const makeGuess = (id: number, correct: boolean) => ({
  type: MAKE_GUESS,
  id,
  correct
});

export const resetDeckStats = (id: number) => ({
  type: RESET_DECK_STATS,
  id
});

export const createCard = (id: number, deck_id: number) => ({
  type: CREATE_CARD,
  id,
  deck_id,
});

export const deleteCard = (id: number) => ({
  type: DELETE_CARD,
  id
});

export const updateSelectedDeck = (id: number) => ({
  type: UPDATE_SELECTED_DECK,
  id
});
