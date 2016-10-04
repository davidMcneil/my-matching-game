/* @flow */
/* External Imports. */
/* Local Imports. */

/********************************/
// Local Declarations.
/********************************/
const SceneIds = Object.freeze({
  deck_list: 'DECK_LIST',
  deck_edit: 'DECK_EDIT'
});

const deck_list = {id: SceneIds.deck_list};

const deck_edit = {id: SceneIds.deck_edit};

/********************************/
// Exported Declarations.
/********************************/
export {SceneIds};

export const toDeckListFromDeckEdit = (navigator: Object) => navigator.pop();

export const toDeckEditFromDeckList = (navigator: Object) => (
  navigator.push(deck_edit)
);

export const INITIAL_ROUTE_STACK = [deck_list];
