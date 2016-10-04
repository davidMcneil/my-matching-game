/* @flow */
/* External Imports. */
import React from 'react';
import {View} from 'react-native';
/* Local Imports. */
import DeckEditHeader from '../components/deck_edit_header';

/********************************/
// Local Declarations.
/********************************/

/********************************/
// Exported Declarations.
/********************************/
export const DeckEditScene = (props: {toDeckList: Function}) => (
  <View>
    <DeckEditHeader toDeckList={props.toDeckList}/>
  </View>
);

export {DeckEditScene as default};
