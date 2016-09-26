/* @flow */
/* External Imports. */
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
/* Local Imports. */
import {addTodo} from '../actions';
import {dispatch} from '../store';

/********************************/
// Local Declarations.
/********************************/
const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    margin: 0,
    padding: 0
  },
  buttonText: {
    fontSize: 24,
    color: 'rgba(0, 125, 0, 1)'
  },
  buttonIcon: {
    fontSize: 14,
    color: 'rgba(0, 125, 0, 1)',
    marginRight: 2
  }
});

/********************************/
// Exported Declarations.
/********************************/
export default class AddTodoComp extends React.Component {
  state: {text: string};
  constructor() {
    super();
    this.state = {text: ''};
  }
  addTodo() {
    if(this.state.text.trim().length > 0) {
      dispatch(addTodo(this.state.text));
      this.setState({text: ''});
    }
  }
  render() {
    return (
      <View>
        <TextInput value={this.state.text}
          placeholder='Todo...'
          onChangeText={text => this.setState({text})}/>
        <Button title='Add Todo!'
          icon={{type: 'font-awesome', name: 'plus', style: styles.buttonIcon}}
          buttonStyle={styles.buttonView}
          textStyle={styles.buttonText}
          onPress={() => this.addTodo()}/>
      </View>
    );
  }
}
