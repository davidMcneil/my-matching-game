/* @flow */
/* External Imports. */
import {List} from 'immutable';
import React from 'react';
import {Alert, Dimensions, Image, StyleSheet, TouchableHighlight, ScrollView,
        View} from 'react-native';
import {AudioPlayer, AudioRecorder, AudioUtils} from 'react-native-audio';
import {Button, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
/* Local Imports. */
import * as actions from '../actions';
import {dispatch, getDeckToEdit} from '../store';
import {Card as CardRecord, Deck} from '../types';

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
  editableCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    borderColor: 'rgba(230, 230, 230, 1)',
    borderWidth: 1,
    width: width
  },
  leftContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1
  },
  closeButton: {
    height: 100,
    width: 40,
    paddingLeft: 10,
    paddingRight: 0,
    marginRight: 0
  },
  closeIcon: {
    fontSize: 24,
    color: 'rgba(57, 63, 69, 1)'
  },
  card: {
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

class EditableCard extends React.Component {
  static propTypes = {
    card: React.PropTypes.instanceOf(CardRecord),
    deck: React.PropTypes.instanceOf(Deck),
    setEditable: React.PropTypes.func,
    index: React.PropTypes.number
  };
  state: {recording: boolean};
  constructor(props) {
    super(props);
    this.state = {recording: false};
  }
  _stop() {
    if (this.state.recording) {
      AudioRecorder.stopRecording();
      this.setState({recording: false});
    }
  }
  _record() {
    if(!this.state.recording){
      let audioPath = `${AudioUtils.DocumentDirectoryPath}/deck_${this.props.deck.id}_${this.props.index}.aac`;
      AudioRecorder.prepareRecordingAtPath(audioPath, {
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
  _play() {
    if (this.state.recording) {
      this._stop();
      this.setState({recording: false});
    }
    let audioPath = `${AudioUtils.DocumentDirectoryPath}/deck_${this.props.deck.id}_${this.props.index}.aac`;
    AudioPlayer.play(audioPath);
  }
  setAvatar() {
    dispatch(actions.setDeckAvatar(getDeckToEdit().id, this.props.index));
  }
  removeCard() {
    Alert.alert( 'Delete Card',
      'Are you sure you want to proceed this operation is permanent?', 
      [{text: 'Cancel', undefined, style: 'cancel'},
      {text: 'Delete', onPress: () => {
        this.props.setEditable();
        dispatch(actions.removeCard(getDeckToEdit().id, this.props.card));
      }}]);
  }
  render() {
    return (
      <View style={styles.editableCard}>
        <View style={styles.leftContent}>
          <Image source={{uri: this.props.card.image}} style={styles.avatar}/>
          <Icon type='font-awesome'
            name='volume-up'
            size={24}
            raised={true}
            color='rgba(57, 63, 69, 1)'
            underlayColor='rgba(230, 230, 230, 1)'
            iconStyle={{fontSize: 24}}
            containerStyle={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              margin: 4
            }}
            onPress={() => this._play()}/>
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
            onPress={this.state.recording ? () => this._stop() :
                                            () => this._record()}/>
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
            onPress={() => this.setAvatar()}/>
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
            onPress={() => this.removeCard()} />
        </View>
        <Button icon={{type: 'font-awesome', name: 'chevron-left',
                       style: styles.closeIcon}}
          backgroundColor='rgba(230, 230, 230, 1)'
          buttonStyle={styles.closeButton}
          textStyle={styles.wideText}
          title=''
          onPress={() => this.props.setEditable()}/>
      </View>
    );
  }
}

const Card = (props: {card: CardRecord,
                      setEditable: Function}) => (
  <View style={styles.card}>
    <TouchableHighlight underlayColor='rgba(230, 230, 230, 1)'
      onPress={() => props.setEditable()}>
      <View>
        <Image source={{uri: props.card.image}}
               style={styles.avatar}/>
      </View>
    </TouchableHighlight>
  </View>
);

class Cards extends React.Component {
  static propTypes = {
    deck: React.PropTypes.instanceOf(Deck),
  };
  state: {editing: number};
  constructor(props) {
    super(props);
    this.state = {editing: null};
  }
  setEditable(index) {
    this.setState({editing: index});
  }
  render () {
    const cards = this.props.deck ? this.props.deck.cards : List();
    return (
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.scroll}>
          <View style={styles.grid}>
            {cards.map((c, i) => {
              if (i === this.state.editing) {
                return <EditableCard key={i}
                  index={i}
                  deck={this.props.deck}
                  card={c}
                  setEditable={() => this.setEditable(null)}/>;
              } else {
                return <Card key={i}
                  card={c}
                  setEditable={() => this.setEditable(i)}/>;
              }
            })}
          </View>
          <View style={styles.filler}></View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = () => ({
  deck: getDeckToEdit()
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
