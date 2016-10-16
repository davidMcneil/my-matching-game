/* @flow */
/* External Imports. */
import React from 'react';
import {Dimensions, Text} from 'react-native';
/* Local Imports. */
import {Deck} from '../types';

/********************************/
// Local Declarations.
/********************************/
const {height} = Dimensions.get('window');
const styles = {
  add: {
    position: 'absolute',
    top: height - 70,
    left: 3,
    fontSize: 24,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: 'rgba(255, 255, 255, 1)',
  }
};

export const PlayScore = (props: {deck: Deck}) => (
  <Text style={styles.add}>
    {`${props.deck.correct}/${props.deck.total}`}
  </Text>
);

/********************************/
// Exported Declarations.
/********************************/
export {PlayScore as default};
