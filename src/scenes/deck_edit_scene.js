/* @flow */
/* External Imports. */
import React from 'react';
import {View} from 'react-native';
/* Local Imports. */
import AddCard from '../components/add_card';
import CardGrid from '../components/card_grid';
import DeckEditHeader from '../components/deck_edit_header';

/********************************/
// Local Declarations.
/********************************/

/********************************/
// Exported Declarations.
/********************************/
export const DeckEditScene = (props: {toDeckList: Function,
                                      toCamera: Function}) => (
  <View>
    <DeckEditHeader toDeckList={props.toDeckList}/>
    <CardGrid/>
    <AddCard toCamera={props.toCamera}/>
  </View>
);

export {DeckEditScene as default};
