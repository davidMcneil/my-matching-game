/* @flow */
/* External Imports. */
import {List} from 'immutable';
import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableHighlight, ScrollView,
        View} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
/* Local Imports. */
import {updateSelectedDeck} from '../actions';
import {Deck as DeckRecord} from '../types';

/********************************/
// Local Declarations.
/********************************/
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: {
    height: height - 75,
    marginTop: 10,
    borderColor: 'rgba(230, 230, 230, 1)',
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  touchableDeck: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderColor: 'rgba(230, 230, 230, 1)',
    borderBottomWidth: 1
  },
  deck: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textAndAvatar: {
    flexDirection: 'row',
    flex: 1
  },
  avatar: {
    width: 60,
    height: 60
  },
  text: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    color: 'rgba(57, 63, 69, 1)'
  },
  score: {
    fontSize: 14,
    color: 'rgba(150, 163, 172, 1)'
  },
  editIcon: {
    flex: 0,
    width: 40,
    marginRight: 10
  },
  filler: {
    height: 120
  }
});

const Deck = (props: {deck: DeckRecord, onPlay: Function,
                      onEdit: Function}) => {
  const image = props.deck.avatar ? `file://${props.deck.avatar}` :
    'https://thumb1.shutterstock.com/display_pic_with_logo/10654/116211973/stock-vector-illustration-of-zoo-and-animals-in-a-beautiful-nature-116211973.jpg';
  return (
    <TouchableHighlight style={styles.touchableDeck}
      underlayColor='rgba(230, 230, 230, 1)'
      onPress={() => props.onPlay()}>
      <View style={styles.deck}>
        <View style={styles.textAndAvatar}>
          <Image source={{uri: image}}
                 style={styles.avatar}/>
          <View style={styles.text}>
            <Text style={styles.name}>
              {props.deck.name}
            </Text>
            <Text style={styles.score}>
              {`${props.deck.correct}/${props.deck.total}`}
            </Text>
          </View>
        </View>
        <View style={styles.editIcon}>
          <Icon name='pencil'
            type='font-awesome'
            size={16}
            raised={true}
            color='rgba(57, 63, 69, 1)'
            underlayColor='rgba(230, 230, 230, 1)'
            iconStyle={{}}
            containerStyle={{backgroundColor: 'rgba(255, 255, 255, 1)'}}
            onPress={() => props.onEdit()}/>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const Decks = (props: {toDeckEdit: Function, toDeckPlay: Function,
                       decks: List<DeckRecord>, onPlay: Function,
                       onEdit: Function }) => (
  <View style={styles.scrollContainer}>
    <ScrollView>
      {props.decks.sort((d, o) => d.name.toLowerCase()
          .localeCompare(o.name.toLowerCase()))
        .map((d) => 
          <Deck key={d.id}
            deck={d}
            onPlay={() => props.onPlay(d)}
            onEdit={() => props.onEdit(d)}/>)}
      <View style={styles.filler}></View>
    </ScrollView>
  </View>
);

const mapStateToProps = (state) => ({
  decks: state.decks
});

const mapDispatchToProps = (dispatch, props) => ({
  onPlay: (d) => {
    dispatch(updateSelectedDeck(d.id));
    props.toDeckPlay();
  },
  onEdit: (d) => {
    dispatch(updateSelectedDeck(d.id));
    props.toDeckEdit();
  }
});

/********************************/
// Exported Declarations.
/********************************/
export const DeckList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Decks);

export {DeckList as default}; 
