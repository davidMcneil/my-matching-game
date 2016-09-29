/* @flow */
/* External Imports. */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
/* Local Imports. */

/********************************/
// Local Declarations.
/********************************/
const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginTop: 50,
    padding: 0
  },
  textStyle: {
    fontSize: 40,
    color: 'rgba(0, 125, 0, 1)'
  }
});

/********************************/
// Exported Declarations.
/********************************/
export const HomeScene = (props: {toTodos: Function}) => (
  <Button title='My TodoApp!'
    buttonStyle={styles.buttonStyle}
    textStyle={styles.textStyle}
    onPress={props.toTodos}/>
);
