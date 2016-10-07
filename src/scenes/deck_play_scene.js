/* @flow */
/* External Imports. */
import {List} from 'immutable';
import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import RNFS from 'react-native-fs';
import Camera from 'react-native-camera';
import {connect} from 'react-redux';
/* Local Imports. */
import {makeGuess} from '../actions';
import {Deck} from '../types';

/********************************/
// Local Declarations.
/********************************/
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
});

class DeckPlay extends Component {
  static propTypes = {
    deck: React.PropTypes.instanceOf(Deck),
    cards: React.PropTypes.instanceOf(List),
    guess: React.PropTypes.func
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>
          Testing!!
        </Text>
        {this.props.cards.map((c) => {
          return(
            <Text key={c.id}>
              {c.id}
            </Text>
          );
        })}
        <Text>
          Testing!!
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  deck: state.decks.find(d => d.id === state.selected_deck),
  cards: state.cards.filter(c => c.deck_id === state.selected_deck && 
                                 c.audio_set)
});

const mapDispatchToProps = (dispatch) => ({
  guess: (id, correct) => {
    dispatch(makeGuess(id, correct));
  }
});

/********************************/
// Exported Declarations.
/********************************/
export const DeckPlayScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckPlay);

export {DeckPlayScene as default};
