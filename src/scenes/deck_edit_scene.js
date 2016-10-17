/* @flow */
/* External Imports. */
import React from 'react';
import {View} from 'react-native';
/* Local Imports. */
import AddCardFromCamera from '../components/add_card_from_camera';
import AddCardFromFiles from '../components/add_card_from_files';
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
    <AddCardFromFiles/>
    <AddCardFromCamera toCamera={props.toCamera}/>
  </View>
);

export {DeckEditScene as default};
