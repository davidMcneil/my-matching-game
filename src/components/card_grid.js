/* @flow */
/* External Imports. */
import {List} from 'immutable';
import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableHighlight, ScrollView,
        View} from 'react-native';
import {connect} from 'react-redux';
/* Local Imports. */
import {getDeckById} from '../store';
import {Card as CardRecord} from '../types';

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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  outer: {
    borderColor: 'rgba(230, 230, 230, 1)',
    borderWidth: 1,
    width: 60,
    height: 80,
    margin: 5
  },
  avatar: {
    width: 80,
    height: 100
  },
  filler: {
    height: 120
  }
});

const Card = (props: {card: CardRecord}) => (
  <View style={styles.outer}>
    <TouchableHighlight underlayColor='rgba(230, 230, 230, 1)'
      onPress={() => console.log('test')}>
      <View>
        <Image source={{uri: props.card.image}}
               style={styles.avatar}/>
      </View>
    </TouchableHighlight>
  </View>
);

const Cards = (props: {cards: List<DeckRecord>}) => (
  <View style={styles.scrollContainer}>
    <ScrollView style={styles.scroll}>
      <View style={styles.grid}>
        {props.cards.map((c, i) => 
          <Card key={i} card={c}/>)}
      </View>
      <View style={styles.filler}></View>
    </ScrollView>
  </View>
);

const mapStateToProps = (state) => ({
  cards: (state.deck_to_edit === null ? List() :
                                        getDeckById(state.deck_to_edit).cards)
});

const mapDispatchToProps = () => ({
});

/********************************/
// Exported Declarations.
/********************************/
export const CardGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards);

export {CardGrid as default}; 
