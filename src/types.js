/* @flow */
/* External Imports. */
import {List, Record} from 'immutable';
/* Local Imports. */

/********************************/
// Local Declarations.
/********************************/

/********************************/
// Exported Declarations.
/********************************/
export const Card = Record({
  image: '',
  audio: ''
}, 'Card');

export const Deck = Record({
  id: undefined,
  name: '',
  avatar: 0,
  correct: 0,
  total: 0,
  cards: List()
}, 'Deck');
