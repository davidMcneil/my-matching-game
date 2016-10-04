/* @flow */
/* External Imports. */
import React from 'react';
import {Icon} from 'react-native-elements';
/* Local Imports. */
import {setDeckToEdit} from '../actions';
import {connect} from 'react-redux';

/********************************/
// Local Declarations.
/********************************/
const styles = {
  add: {
    position: 'absolute',
    top: 590,
    left: 343,
    backgroundColor: 'rgba(0, 125, 0, 1)'
  }
};

export const Button = (props: {toDeckEdit: Function, onPress: Function}) => (
  <Icon type='font-awesome'
    name='plus'
    size={26}
    raised={true}
    color='rgba(255, 255, 255, 1)'
    underlayColor='rgba(0, 175, 0, 1)'
    containerStyle={styles.add}
    onPress={() => props.onPress()} />
);

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch, props) => ({
  onPress: () => {
    dispatch(setDeckToEdit(null));
    props.toDeckEdit();
  }
});

/********************************/
// Exported Declarations.
/********************************/
export const AddDeck = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);

export {AddDeck as default}; 
