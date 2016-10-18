/* @flow */
/* External Imports. */
import {List} from 'immutable';
import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableHighlight, View
       } from 'react-native';
import {AudioPlayer} from 'react-native-audio';
import {connect} from 'react-redux';
/* Local Imports. */
import {makeGuess} from '../actions';
import PlayAudio from '../components/play_audio';
import PlayScore from '../components/play_score';
import {Card, Deck, getCardAudioPath, getCardImagePath} from '../types';

/********************************/
// Local Declarations.
/********************************/
const {height: HEIGHT, width: WIDTH} = Dimensions.get('window');
const styles = StyleSheet.create({
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: WIDTH,
    height: HEIGHT
  },
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Tile = (props: {card: Card, transparent: boolean,
                      color: string, height: number,
                      width: number, onPress: Function}) => (
  <TouchableHighlight underlayColor='rgba(230, 230, 230, 1)'
    onPress={() => props.onPress()}
    style={{flex: 1, height: props.height, width: props.width}}>
    <View style={{flex: 1,
      backgroundColor: props.transparent ? props.color : 'rgba(0, 0, 0, 1)'}}>
      <Image source={{uri: `file://${getCardImagePath(props.card)}`}}
        style={{flex: 1}}
        opacity={props.transparent ? 0.75 : 1}/>
    </View>
  </TouchableHighlight>
);

class DeckPlay extends Component {
  static propTypes = {
    deck: React.PropTypes.instanceOf(Deck),
    cards: React.PropTypes.instanceOf(List),
    guess: React.PropTypes.func
  };
  state: {
    correct: number,
    cards: List<Card>,
    guessed_id: ?number,
    playing: boolean,
    widths: List<number>
  };
  should_play_initial_audio: boolean;
  constructor(props) {
    super(props);
    this.state = {
      ...this.getNewCards(),
      guessed_id: null,
      playing: false
    };
    this.should_play_initial_audio = true;
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    if (this.should_play_initial_audio) {
      this.should_play_initial_audio = false;
      this.playAudio();
    }
  }
  getNewCards() {
    const cards = this.props.cards
      .sortBy(()=>Math.random())
      .take(List([3, 4, 5, 6, 7, 8]).sortBy(()=>Math.random()).first());
    const correct = cards.sortBy(()=>Math.random()).first();
    let widths = List();
    for (let i = 0; i < (cards.count() / 2); i++) {
      const third_width = WIDTH / 3;
      const width = getRandomInt(third_width, third_width * 2);
      widths = widths.push(width);
      widths = widths.push(WIDTH - width);
    }
    return {cards, correct, widths};
  }
  playAudio() {
    if (!this.state.playing && this.props.cards.count() > 2) {
      this.setState({playing: true});
      AudioPlayer.play(getCardAudioPath(this.state.correct))
        .then(() => this.setState({playing: false}));
    }
  }
  onCardPress(card) {
    if (this.state.playing) {
      this.setState({playing: false});
      AudioPlayer.stop();
    }
    this.props.guess(this.props.deck.id, card === this.state.correct);
    this.setState({guessed_id: card.id});
    setTimeout(() => {
      this.should_play_initial_audio = true;
      this.setState({...this.getNewCards(), guessed_id: null});
    }, 1000);
  }
  render() {
    return (
      <View>
        {(() => {
          if (this.props.cards.count() < 3) {
            return (
              <Text style={{fontSize: 24, textAlign: 'center', padding: 20}}>
                {
                  "You need at least 3 cards with audio in this deck to play. "+
                  "Return to the deck edit screen and add more cards to play."
                }
              </Text>
            );
          } else {
            return (
              <View style={styles.tiles}>
                {this.state.cards.map((c, i) => {
                  if (c === this.state.correct) {
                    return <Tile key={c.id}
                      card={c}
                      color='rgba(0, 175, 0, 1)'
                      width={this.state.widths.get(i)}
                      height={HEIGHT / Math.ceil(this.state.cards.count() / 2)}
                      transparent={this.state.guessed_id !== null}
                      onPress={() => this.onCardPress(c)}/>;
                  } else {
                    return <Tile key={c.id}
                      card={c}
                      color='rgba(175, 0, 0, 1)'
                      width={this.state.widths.get(i)}
                      height={HEIGHT / Math.ceil(this.state.cards.count() / 2)}
                      transparent={this.state.guessed_id === c.id}
                      onPress={() => this.onCardPress(c)}/>;
                  }
                })}
                <PlayScore deck={this.props.deck}/>
                <PlayAudio icon_name={this.state.playing ? 'volume-up' : 'play'}
                  playAudio={() => this.playAudio()}/>
              </View>
            );
          }
        })()}
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
