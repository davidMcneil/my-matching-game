/* @flow */
/* External Imports. */
/* Local Imports. */

/********************************/
// Local Declarations.
/********************************/
const SceneIds = Object.freeze({
  deck_list: 'DECK_LIST',
  deck_play: 'DECK_PLAY',
  deck_edit: 'DECK_EDIT',
  camera: 'CAMERA'
});

const deck_list = {id: SceneIds.deck_list};

const deck_play = {id: SceneIds.deck_play};

const deck_edit = {id: SceneIds.deck_edit};

const camera = {id: SceneIds.camera};

/********************************/
// Exported Declarations.
/********************************/
export {SceneIds};

export const toDeckPlayFromDeckList = (navigator: Object) => (
  navigator.push(deck_play)
);

export const toDeckListFromDeckEdit = (navigator: Object) => navigator.pop();

export const toDeckEditFromDeckList = (navigator: Object) => (
  navigator.push(deck_edit)
);

export const toCameraFromDeckEdit = (navigator: Object) => (
  navigator.push(camera)
);

export const INITIAL_ROUTE_STACK = [deck_list];
