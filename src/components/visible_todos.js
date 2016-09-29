/* @flow */
/* External Imports. */
import {List} from 'immutable';
import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
/* Local Imports. */
import {setTodoCompleted, removeTodo} from '../actions';
import {FilterSettings, Todo as TodoRecord} from '../types';

/********************************/
// Local Declarations.
/********************************/
const styles = StyleSheet.create({
  todoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(179, 204, 255, 0.2)',
    padding: 8,
    borderBottomWidth: 1
  },
  buttonView: {
    flexGrow: 4,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    margin: 0,
    padding: 0
  },
  buttonIcon: {
    fontSize: 26,
    color: 'rgba(125, 0, 0, 1)'
  },
  todoText: {
    fontFamily: 'Arial',
    fontSize: 18,
    textAlignVertical: 'center'
  },
  completed: {
    textDecorationLine: 'line-through'
  }
});

const Todo = (props: {todo: TodoRecord, onClick: Function,
                      onnRemoveClick: Function}) => {
  const text_style = props.todo.completed ? styles.completed : undefined;
  return (
    <View style={styles.todoView}>
      <TouchableNativeFeedback onPress={props.onClick}>
        <View style={{'flexGrow': 1}}>
          <Text style={[styles.todoText, text_style]}>
            {props.todo.text}
          </Text>
        </View>
      </TouchableNativeFeedback>
      {(() => {
        if (props.todo.completed) {
          return (
            <Button title=''
              icon={{type: 'font-awesome', name: 'remove',
                     style: styles.buttonIcon}}
              buttonStyle={styles.buttonView}
              onPress={() => props.onRemoveClick()}/>
          );
        }
      })()}
    </View>
  );
};

const Todos = (props: {todos: List<TodoRecord>, onTodoClick: Function,
                       onRemoveClick: Function}) => (
  <View>
    {props.todos.map((t, i) => 
      <Todo key={i} todo={t} 
        onClick={() => props.onTodoClick(t)}
        onRemoveClick={() => props.onRemoveClick(t)}/>)}
  </View>
);

const getVisibleTodos = (todos, filter) => {
  switch(filter) {
  case FilterSettings.active:
    return todos.filter(t => !t.completed);
  case FilterSettings.completed:
    return todos.filter(t => t.completed);
  case FilterSettings.all:
    return todos;
  default:
    console.error(`Invalid filter '${filter}' recieved!`);
    return todos;
  }
};

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.filter)
});

const mapDispatchToProps = (dispatch) => ({
  onTodoClick: (todo) => dispatch(setTodoCompleted(todo, !todo.completed)),
  onRemoveClick: (todo) => dispatch(removeTodo(todo))
});

/********************************/
// Exported Declarations.
/********************************/
export const VisibleTodos = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);

export {VisibleTodos as default}; 
