/* @flow */
/* External Imports. */
import {Record} from 'immutable';
import RNFS from 'react-native-fs';
/* Local Imports. */

/********************************/
// Local Declarations.
/********************************/

/********************************/
// Exported Declarations.
/********************************/
export const Card = Record({
  id: undefined,
  deck_id: undefined,
  audio_set: false
}, 'Card');

export const getImagePath = (id, deck_id) => (
	`${RNFS.DocumentDirectoryPath}/deck_${deck_id}-card_${id}.jpg`
);

export const getAudioPath = (id, deck_id) => (
	`${RNFS.DocumentDirectoryPath}/deck_${deck_id}-card_${id}.aac`
);

export const getCardImagePath = (card: Card) => (
	getImagePath(card.id, card.deck_id)
);

export const getCardAudioPath = (card: Card) => (
	getAudioPath(card.id, card.deck_id)
);

export const Deck = Record({
  id: undefined,
  name: '',
  avatar: undefined,
  correct: 0,
  total: 0
}, 'Deck');
