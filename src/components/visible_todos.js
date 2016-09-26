/* @flow */
/* External Imports. */
import {List} from 'immutable';
import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {connect} from 'react-redux';
/* Local Imports. */
import {setTodoCompleted} from '../actions';
import {FilterSettings, Todo as TodoRecord} from '../store';

/********************************/
// Local Declarations.
/********************************/
const styles = StyleSheet.create({
  todoView: {
    backgroundColor: 'rgba(179, 204, 255, 0.2)',
    padding: 8,
    borderBottomWidth: 1
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

const Todo = (props: {todo: TodoRecord, onClick: Function}) => {
  const text_style = props.todo.completed ? styles.completed : undefined;
  return (
    <TouchableNativeFeedback onPress={props.onClick}>
      <View style={styles.todoView}>
        <Text style={[styles.todoText, text_style]}>
          {props.todo.text}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const Todos = (props: {todos: List<TodoRecord>, onTodoClick: Function}) => (
  <View>
    {props.todos.map((t, i) => 
      <Todo key={i} todo={t} onClick={() => props.onTodoClick(t)}/>)}
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
  onTodoClick: (todo) => dispatch(setTodoCompleted(todo, !todo.completed))
});

/********************************/
// Exported Declarations.
/********************************/
export const VisibleTodos = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);

export {VisibleTodos as default}; 
