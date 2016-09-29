/* @flow */
/* External Imports. */
import {Record} from 'immutable';
/* Local Imports. */

/********************************/
// Local Declarations.
/********************************/

/********************************/
// Exported Declarations.
/********************************/
export const Todo = Record({
  text: '',
  completed: false
}, 'Todo');

export const FilterSettings = {
  completed: 'COMPLETED',
  active: 'ACTIVE',
  all: 'ALL'
};
