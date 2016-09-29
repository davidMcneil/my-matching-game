/* @flow */
/* External Imports. */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
/* Local Imports. */
import {setFilter} from '../actions';
import {FilterSettings} from '../types';

/********************************/
// Local Declarations.
/********************************/
const styles = StyleSheet.create({
  filtersView: {
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
  buttonDisabled: {
    color: 'rgba(0, 0, 0, 1)'
  }
});

const Filter = (props: {text: string,
  disabled: boolean, onClick: Function}) => (
  <Button title={props.text}
    disabled={props.disabled}
    buttonStyle={styles.buttonView}
    textStyle={[styles.buttonText, 
      props.disabled ? styles.buttonDisabled : undefined]}
    onPress={props.onClick}/>
);

const Filters = (props: {filter: string, onFilterClick: Function}) => (
  <View style={styles.filtersView}>
    <Filter text='Active'
      disabled={!(props.filter !== FilterSettings.active)}
      onClick={() => props.onFilterClick(FilterSettings.active)}/>
    <Text> | </Text>
    <Filter text='Completed'
      disabled={!(props.filter !== FilterSettings.completed)}
      onClick={() => props.onFilterClick(FilterSettings.completed)}/>
    <Text> | </Text>
    <Filter text='All'
      disabled={!(props.filter !== FilterSettings.all)}
      onClick={() => props.onFilterClick(FilterSettings.all)}/>
  </View>
);

const mapStateToProps = (state) => ({
  filter: state.filter
});

const mapDispatchToProps = (dispatch) => ({
  onFilterClick: (filter) => {
    dispatch(setFilter(filter));
  }
});

/********************************/
// Exported Declarations.
/********************************/
export const FilterTodos = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);

export {FilterTodos as default}; 
