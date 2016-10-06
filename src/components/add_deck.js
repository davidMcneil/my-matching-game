/* @flow */
/* External Imports. */
import React from 'react';
import {Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
/* Local Imports. */
import {updateSelectedDeck} from '../actions';
import {connect} from 'react-redux';

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

export const Button = (props: {toDeckEdit: Function, onPress: Function}) => (
  <Icon name='plus'
    type='font-awesome'
    size={26}
    raised={true}
    color='rgba(255, 255, 255, 1)'
    underlayColor='rgba(0, 175, 0, 1)'
    iconStyle={{}}
    containerStyle={styles.add}
    onPress={() => props.onPress()} />
);

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch, props) => ({
  onPress: () => {
    dispatch(updateSelectedDeck(null));
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
