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
  <Icon type='font-awesome'
    name='file-image-o'
    size={26}
    raised={true}
    iconStyle={{fontSize: 34}}
    color='rgba(255, 255, 255, 1)'
    underlayColor='rgba(0, 175, 0, 1)'
    containerStyle={styles.add}
    onPress={() => props.toCamera()} />
);

/********************************/
// Exported Declarations.
/********************************/
export {AddCard as default}; 
