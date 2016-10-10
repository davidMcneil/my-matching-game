/* @flow */
/* External Imports. */
import React from 'react';
import {Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
/* Local Imports. */

/********************************/
// Local Declarations.
/********************************/
const {height, width} = Dimensions.get('window');
const styles = {
  add: {
    position: 'absolute',
    top: height - 90,
    left: width - 65,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  }
};

export const PlayAudio = (props: {playAudio: Function}) => (
  <Icon name='volume-up'
    type='font-awesome'
    size={26}
    raised={true}
    color='rgba(255, 255, 255, 1)'
    underlayColor='rgba(0, 0, 0, 0.5)'
    iconStyle={{fontSize: 34}}
    containerStyle={styles.add}
    onPress={() => props.playAudio()} />
);

/********************************/
// Exported Declarations.
/********************************/
export {PlayAudio as default}; 
