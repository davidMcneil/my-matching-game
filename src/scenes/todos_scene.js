/* @flow */
/* External Imports. */
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
/* Local Imports. */
import AddTodoComp from '../components/add_todo';
import FilterTodos from '../components/filter_todos';
import VisibleTodos from '../components/visible_todos';

/********************************/
// Local Declarations.
/********************************/
const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    margin: 0,
    padding: 0
  },
  buttonText: {
    fontSize: 20,
    color: 'rgba(0, 125, 0, 1)'
  },
});

/********************************/
// Exported Declarations.
/********************************/
export const TodosScene = (props: {toHome: Function}) => (
  <ScrollView>
    <AddTodoComp/>
    <View style={styles.view}>
      <Button title='Home'
        buttonStyle={styles.buttonView}
        textStyle={styles.buttonText}
        onPress={props.toHome}/>
      <Text> | </Text>
      <FilterTodos/>
    </View>
    <VisibleTodos/>
  </ScrollView>
);      