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
    top: height - 100,
    left: width - 75,
    backgroundColor: 'rgba(0, 125, 0, 1)'
  }
};

export const AddCard = (props: {toCamera: Function}) => (
  <Icon name='camera'
    type='font-awesome'
    size={26}
    raised={true}
    color='rgba(255, 255, 255, 1)'
    underlayColor='rgba(0, 175, 0, 1)'
    iconStyle={{fontSize: 30}}
    containerStyle={styles.add}
    onPress={() => props.toCamera()}/>
);

/********************************/
// Exported Declarations.
/********************************/
export {AddCard as default};
