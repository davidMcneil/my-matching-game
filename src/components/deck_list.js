/* @flow */
/* External Imports. */
import {List} from 'immutable';
import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableHighlight, ScrollView,
        View} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
/* Local Imports. */
import {setDeckToEdit} from '../actions';
import {Deck as DeckRecord} from '../types';

/********************************/
// Local Declarations.
/********************************/
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: {
    height: height - 75,
    marginTop: 10,
    borderColor: 'rgba(230, 230, 230, 1)',
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  outer: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderColor: 'rgba(230, 230, 230, 1)',
    borderBottomWidth: 1
  },
  inner: {
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
  textView: {
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
  const image = props.deck.cards.count() > 0 ? props.deck.cards.get(props.deck.avatar).image : 'https://thumb1.shutterstock.com/display_pic_with_logo/10654/116211973/stock-vector-illustration-of-zoo-and-animals-in-a-beautiful-nature-116211973.jpg';
  return (
    <View style={styles.outer}>
      <TouchableHighlight underlayColor='rgba(230, 230, 230, 1)'
        onPress={() => props.onPlay()}>
        <View style={styles.inner}>
          <View style={styles.textAndAvatar}>
            <Image source={{uri: image}}
                   style={styles.avatar}/>
            <View style={styles.textView}>
              <Text style={styles.name}>
                {props.deck.name}
              </Text>
              <Text style={styles.score}>
                {`${props.deck.correct}/${props.deck.total}`}
              </Text>
            </View>
          </View>
          <View style={styles.editIcon}>
            <Icon type='font-awesome'
              name='pencil'
              size={16}
              raised={true}
              color='rgba(57, 63, 69, 1)'
              underlayColor='rgba(230, 230, 230, 1)'
              containerStyle={{backgroundColor: 'rgba(255, 255, 255, 1)'}}
              onPress={() => props.onEdit()}/>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const Decks = (props: {decks: List<DeckRecord>, onDeckPlay: Function,
                       onDeckEdit: Function }) => (
  <View style={styles.scrollContainer}>
    <ScrollView bouncesZoom={true}>
      {props.decks
        .sort((d, o) => d.name.toLowerCase()
          .localeCompare(o.name.toLowerCase()))
        .map((d, i) => 
          <Deck key={i}
            deck={d}
            onPlay={() => props.onDeckPlay(d)}
            onEdit={() => props.onDeckEdit(d)}/>)}
      <View style={styles.filler}></View>
    </ScrollView>
  </View>
);

const mapStateToProps = (state) => ({
  decks: state.decks
});

const mapDispatchToProps = (dispatch, props) => ({
  onDeckPlay: (d) => console.log(`open deck '${d.name}'`),
  onDeckEdit: (d) => {
    dispatch(setDeckToEdit(d.id));
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
