/* @flow */
/* External Imports. */
import React from 'react';
import {View} from 'react-native';
/* Local Imports. */
import AddDeck from '../components/add_deck';
import DeckList from '../components/deck_list';
import DeckListHeader from '../components/deck_list_header';

/********************************/
// Local Declarations.
/********************************/

/********************************/
// Exported Declarations.
/********************************/
export const DeckListScene = (props: {toDeckEdit: Function, 
                                      toDeckPlay: Function}) => (
  <View>
    <DeckListHeader/>
    <DeckList toDeckEdit={props.toDeckEdit} toDeckPlay={props.toDeckPlay}/>
    <AddDeck toDeckEdit={props.toDeckEdit}/>
  </View>
);

export {DeckListScene as default};
