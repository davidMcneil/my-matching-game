/* @flow */
/* External Imports. */
import React from 'react';
import {Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
/* Local Imports. */
import {createCard, deleteCard, updateDeckAvatar} from '../actions';
import {Deck, getCardImagePath, getImagePath} from '../types';

/********************************/
// Local Declarations.
/********************************/
const {height, width} = Dimensions.get('window');
const styles = {
  add: {
    position: 'absolute',
    top: height - 100,
    left: 5,
    backgroundColor: 'rgba(0, 125, 0, 1)'
  }
};

export const AddCard = (props: {next_id: number, deck: Deck,
  create: Function, delete: Function, updateDeckAvatar: Function}) => (
  <Icon name='file-image-o'
    type='font-awesome'
    size={26}
    raised={true}
    color='rgba(255, 255, 255, 1)'
    underlayColor='rgba(0, 175, 0, 1)'
    iconStyle={{fontSize: 30}}
    containerStyle={styles.add}
    onPress={() => {
      ImagePicker.openPicker({
        multiple: true
      }).then(images => {
        let next_id = props.next_id;
        let set_avatar = false;
        for (const {path} of images) {
          const id = next_id;
          props.create(id, props.deck.id);
          RNFS.copyFile(path.replace('file://', ''),
                        getImagePath(id, props.deck.id))
            .then(() => {
              if (!props.deck.avatar && !set_avatar) {
                props.updateDeckAvatar(props.deck.id,
                  getImagePath(id, props.deck.id));
                  set_avatar = true;
              }
            }).catch(err => {
              props.delete(id, props.deck.id);
              console.error(err);
            });
          /* This is a total hack to guess the next id from the store. */
          next_id++;
        }
      }).catch(err => console.log(err));
    }}/>
);

const mapStateToProps = (state) => ({
  deck: state.decks.find(d => d.id === state.selected_deck),
  next_id: state.next_id
});

const mapDispatchToProps = (dispatch) => ({
  create: (id, deck_id) => {
    dispatch(createCard(id, deck_id));
  },
  delete: (id, deck_id) => {
    dispatch(deleteCard(id, deck_id));
  },
  updateDeckAvatar: (id, avatar) => {
    dispatch(updateDeckAvatar(id, avatar));
  }
});

/********************************/
// Exported Declarations.
/********************************/
export const AddCardFromFiles = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);

export {AddCardFromFiles as default};
