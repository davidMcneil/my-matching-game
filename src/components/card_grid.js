/* @flow */
/* External Imports. */
import {List} from 'immutable';
import React from 'react';
import {Alert, Dimensions, Image, StyleSheet, TouchableHighlight, ScrollView,
        Text, View} from 'react-native';
import {AudioPlayer, AudioRecorder} from 'react-native-audio';
import {Button, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
/* Local Imports. */
import * as actions from '../actions';
import {Card as CardRecord, Deck, getCardAudioPath, getCardImagePath
       } from '../types';

/********************************/
// Local Declarations.
/********************************/
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: {
    height: height - 90,
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
  editableCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    borderColor: 'rgba(230, 230, 230, 1)',
    borderWidth: 1,
    width: width
  },
  iconAndControls: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1
  },
  closeButton: {
    height: 80,
    width: 40,
    paddingLeft: 10,
    paddingRight: 0,
    marginRight: 0
  },
  closeIcon: {
    fontSize: 24,
    color: 'rgba(57, 63, 69, 1)'
  },
  staticCard: {
    borderColor: 'rgba(230, 230, 230, 1)',
    borderWidth: 1,
    width: 60,
    height: 80,
    margin: 5
  },
  avatar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 60,
    height: 80
  },
  filler: {
    height: 120
  }
});

class StaticCard extends React.Component {
  static propTypes = {
    card: React.PropTypes.instanceOf(CardRecord),
    setEditable: React.PropTypes.func,
  };
  state: {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.staticCard}>
        <TouchableHighlight underlayColor='rgba(230, 230, 230, 1)'
          onPress={() => this.props.setEditable()}>
          <View>
            <Image source={{uri: `file://${getCardImagePath(this.props.card)}`}}
              style={styles.avatar}>
              {(() => {
                if (!this.props.card.audio_set) {
                  return (
                    <Icon name='mute'
                      type='octicon'
                      size={18}
                      raised={false}
                      color='rgba(175, 0, 0, 1)'
                      iconStyle={{}}
                      containerStyle={{padding: 2, margin: 0}}/>
                  );
                }
              })()}
            </Image>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

class Editable extends React.Component {
  static propTypes = {
    deck: React.PropTypes.instanceOf(Deck),
    first_card: React.PropTypes.instanceOf(CardRecord),
    card: React.PropTypes.instanceOf(CardRecord),
    setUneditable: React.PropTypes.func,
    setAvatar: React.PropTypes.func,
    setAvatarWithValue: React.PropTypes.func,
    deleteCard: React.PropTypes.func,
    setAudioSet: React.PropTypes.func
  };
  state: {
    recording: boolean,
    playing: boolean
  };
  constructor(props) {
    super(props);
    this.state = {recording: false, playing: false};
  }
  stop() {
    if (this.state.recording) {
      AudioRecorder.stopRecording();
      this.setState({recording: false});
      this.props.setAudioSet();
    }
  }
  record() {
    if(!this.state.recording){
      AudioRecorder.prepareRecordingAtPath(getCardAudioPath(this.props.card), {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'Low',
        AudioEncoding: 'aac',
        AudioEncodingBitRate: 32000
      });
      AudioRecorder.startRecording();
      this.setState({recording: true});
    }
  }
  play() {
    if (this.state.recording) {
      this.stop();
      this.setState({recording: false});
    }
    if (!this.state.playing) {
      this.setState({playing: true});
      AudioPlayer.play(getCardAudioPath(this.props.card))
        .then(() => this.setState({playing: false}));
    }
  }
  deleteCard() {
    Alert.alert('Delete Card',
      'Are you sure you want to proceed this operation is permanent?',
      [{text: 'Cancel', undefined, style: 'cancel'},
      {text: 'Delete', onPress: () => {
        this.props.deleteCard();
        const {first_card, card} = this.props;
        if (this.props.deck.avatar === getCardImagePath(card)) {
          if (first_card) {
            this.props.setAvatarWithValue(getCardImagePath(first_card));
          } else {
            this.props.setAvatarWithValue(undefined);
          }
        }
        this.props.setUneditable();
      }}]);
  }
  render() {
    let play_icon = 'play';
    if (!this.props.card.audio_set) {
      play_icon = 'mute';
    }
    return (
      <View style={styles.editableCard}>
        <View style={styles.iconAndControls}>
          <TouchableHighlight underlayColor='rgba(230, 230, 230, 1)'
            onPress={() => this.props.setUneditable()}>
            <View>
              <Image style={styles.avatar}
              source={{uri: `file://${getCardImagePath(this.props.card)}`}}/>
            </View>
          </TouchableHighlight>
          <Icon type={this.props.card.audio_set ? 'font-awesome' : 'octicon'}
            name={this.state.playing ? 'volume-up' : play_icon}
            size={24}
            raised={true}
            color={this.props.card.audio_set ? 'rgba(57, 63, 69, 1)' :
                                               'rgba(230, 230, 230, 1)'}
            underlayColor='rgba(230, 230, 230, 1)'
            iconStyle={{fontSize: 24}}
            containerStyle={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              margin: 4
            }}
            onPress={this.props.card.audio_set ? () => this.play() : () => {}}/>
          <Icon type='font-awesome'
            name={this.state.recording ? 'stop' : 'microphone'}
            size={24}
            raised={true}
            color='rgba(57, 63, 69, 1)'
            underlayColor='rgba(230, 230, 230, 1)'
            iconStyle={{fontSize: 24}}
            containerStyle={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              margin: 4
            }}
            onPress={this.state.recording ? () => this.stop() :
                                            () => this.record()}/>
          <Icon type='font-awesome'
            name='user'
            size={24}
            raised={true}
            color='rgba(57, 63, 69, 1)'
            underlayColor='rgba(230, 230, 230, 1)'
            iconStyle={{fontSize: 24}}
            containerStyle={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              margin: 4
            }}
            onPress={() => this.props.setAvatar()}/>
          <Icon type='font-awesome'
            name='remove'
            size={24}
            raised={true}
            color='rgba(175, 0, 0, 1)'
            underlayColor='rgba(230, 230, 230, 1)'
            iconStyle={{fontSize: 24}}
            containerStyle={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              margin: 4
            }}
            onPress={() => this.deleteCard()} />
        </View>
        <Button icon={{type: 'font-awesome', name: 'chevron-left',
                       style: styles.closeIcon}}
          backgroundColor='rgba(230, 230, 230, 1)'
          buttonStyle={styles.closeButton}
          textStyle={styles.wideText}
          title=''
          onPress={() => {
            this.stop();
            this.props.setUneditable();
          }}/>
      </View>
    );
  }
}

const editableMapStateToProps = () => ({
});

const editableMapDispatchToProps = (dispatch, props) => ({
  setAvatar: () =>  {
    dispatch(actions.updateDeckAvatar(props.card.deck_id,
                                      getCardImagePath(props.card)));
  },
  setAvatarWithValue: (avatar: string) =>  {
    dispatch(actions.updateDeckAvatar(props.card.deck_id, avatar));
  },
  deleteCard: () => {
    dispatch(actions.deleteCard(props.card.id, props.card.deck_id));
  },
  setAudioSet: () => {
    dispatch(actions.setAudioSet(props.card.id));
  },
});

const EditableCard = connect(
  editableMapStateToProps,
  editableMapDispatchToProps
)(Editable);

class Cards extends React.Component {
  static propTypes = {
    cards: React.PropTypes.instanceOf(List),
    deck: React.PropTypes.instanceOf(Deck)
  };
  state: {editing: ?number};
  constructor(props) {
    super(props);
    this.state = {editing: null};
  }
  setEditable(index) {
    this.setState({editing: index});
  }
  render () {
    return (
      <View style={styles.scrollContainer}>
        {(() => {
          if (this.props.cards.count() === 0) {
            return (
              <Text style={{fontSize: 24, textAlign: 'center', padding: 20}}>
                {
                  "You don't have any cards in this deck. " +
                  "Press the camera button below to add cards."
                }
              </Text>
            );
          } else {
            return (
              <ScrollView>
                <View style={styles.grid}>
                  {this.props.cards.map((c, i) => {
                    if (c.id === this.state.editing) {
                      return (
                        <EditableCard key={c.id}
                          first_card={i === 0 ? this.props.cards.get(1) :
                            this.props.cards.get(0)}
                          deck={this.props.deck}
                          card={c}
                          setUneditable={() => this.setEditable(null)}/>
                      );
                    } else {
                      return (
                        <StaticCard key={c.id}
                          card={c}
                          setEditable={() => this.setEditable(c.id)}/>
                      );
                    }
                  })}
                </View>
                <View style={styles.filler}></View>
              </ScrollView>
            );
          }
        })()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  deck: state.decks.find(d => d.id === state.selected_deck),
  cards: state.cards.filter(c => c.deck_id === state.selected_deck)
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
