/* @flow */
/* External Imports. */
import React from 'react';
import {Alert, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
/* Local Imports. */
import * as actions from '../actions';
import {Deck} from '../types';

/********************************/
// Local Declarations.
/********************************/
const styles = StyleSheet.create({
  staticHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 125, 0, 1)',
    borderBottomWidth: 1,
    paddingTop: 0,
    paddingBottom: 0
  },
  staticTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  staticName: {
    marginRight: 10,
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 26
  },
  staticScore: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 14
  },
  editName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  nameInput: {
    flex: 1,
    fontSize: 18
  },
  wideButton: {
    marginTop: 5,
    padding: 10,
    backgroundColor: 'rgba(0, 125, 0, 1)'
  },
  wideIcon: {
    marginRight: 3,
    fontSize: 18,
    color: 'rgba(255, 255, 255, 1)'
  },
  wideText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 1)'
  }
});

const StaticHeader = (props: {deck: Deck, openEditable: Function}) => {
  const source = props.deck.avatar ? {uri: `file://${props.deck.avatar}`} :
    require('../flat_icon.png');
  return (
    <View style={styles.staticHeader}>
      <View style={styles.staticTitle}>
        <Image source={source}
               style={{width: 60, height: 50, marginRight: 10}}/>
        <Text style={styles.staticName}>
          {`${props.deck.name}`}
        </Text>
        <Text style={styles.staticScore}>
          {`${props.deck.correct}/${props.deck.total}`}
        </Text>
      </View>
      <Icon name='pencil'
        type='font-awesome'
        size={16}
        raised={true}
        color='rgba(57, 63, 69, 1)'
        underlayColor='rgba(230, 230, 230, 1)'
        iconStyle={{fontSize: 20}}
        containerStyle={{backgroundColor: 'rgba(255, 255, 255, 1)'}}
        onPress={() => props.openEditable()} />
    </View>
  );
};

class Editable extends React.Component {
  static propTypes = {
    deck: React.PropTypes.instanceOf(Deck),
    toDeckList: React.PropTypes.func,
    closeEditable: React.PropTypes.func,
    next_id: React.PropTypes.number,
    create: React.PropTypes.func,
    update: React.PropTypes.func,
    reset: React.PropTypes.func,
    delete: React.PropTypes.func
  };
  state: {name: string};
  constructor(props) {
    super(props);
    this.state = {name: props.deck ? props.deck.name : ''};
  }
  onSavePress() {
    if(this.state.name.trim().length > 0) {
      if (this.props.deck) {
        this.props.update(this.state.name);
      } else {
        this.props.create(this.props.next_id, this.state.name);
      }
      this.setState({name: ''});
      this.props.closeEditable();
    }
  }
  onResetPress() {
    if (this.props.deck) {
      Alert.alert( 'Reset Score',
        'Are you sure you want to proceed this operation is permanent?', 
        [{text: 'Cancel', undefined, style: 'cancel'},
        {text: 'Reset', onPress: () => {
          this.props.reset();
          this.props.closeEditable();
        }}]);
    }
  }
  onDeletePress() {
    if (this.props.deck) {
      Alert.alert( 'Delete Deck',
        'Are you sure you want to proceed this operation is permanent?', 
        [{text: 'Cancel', undefined, style: 'cancel'},
        {text: 'Delete', onPress: () => {
          this.props.toDeckList();
          this.props.delete();
        }}]);
    } else {
      this.props.toDeckList();
    }
  }
  render() {
    return (
      <View style={{borderBottomWidth: 1, paddingBottom: 5}}>
        <View style={styles.editName}>
          <TextInput style={styles.nameInput}
            autoFocus={true}
            value={this.state.name}
            placeholder='Deck name...'
            autoCapitalize='words'
            onChangeText={name => this.setState({name})}/>
          <Icon type='font-awesome'
            name='check'
            size={16}
            raised={true}
            color='rgba(255, 255, 255, 1)'
            underlayColor='rgba(0, 175, 0, 1)'
            iconStyle={{fontSize: 22}}
            containerStyle={{backgroundColor: 'rgba(0, 125, 0, 1)'}}
            onPress={() => this.onSavePress()} />
        </View>
        <Button icon={{type: 'font-awesome', name: 'refresh',
            style: styles.wideIcon}}
          backgroundColor='rgba(230, 230, 230, 1)'
          buttonStyle={styles.wideButton}
          textStyle={styles.wideText}
          title='Reset Score'
          onPress={() => this.onResetPress()}/>
        <Button icon={{type: 'font-awesome', name: 'remove',
            style: styles.wideIcon}}
          backgroundColor='rgba(230, 230, 230, 1)'
          buttonStyle={styles.wideButton}
          textStyle={styles.wideText}
          title='Delete Deck'
          onPress={() => this.onDeletePress()}/>
      </View>
    );
  }
}

const editableMapStateToProps = (state) => ({
  next_id: state.next_id
});

const editableMapDispatchToProps = (dispatch, props) => ({
  create: (id, name) => {
    dispatch(actions.createDeck(id, name));
    dispatch(actions.updateSelectedDeck(id));
  },
  update: (name) => {
    dispatch(actions.updateDeckName(props.deck.id, name));
  },
  reset: () => {
    dispatch(actions.resetDeckStats(props.deck.id));
  },
  delete: () => {
    dispatch(actions.updateSelectedDeck(null));
    dispatch(actions.deleteDeck(props.deck.id));
  }
});

const EditableHeader = connect(
  editableMapStateToProps,
  editableMapDispatchToProps
)(Editable);

class Header extends React.Component {
  static propTypes = {
    deck: React.PropTypes.instanceOf(Deck),
    toDeckList: React.PropTypes.func
  };
  state: {editable: boolean};
  constructor(props) {
    super(props);
    this.state = {editable: false};
  }
  render() {
    if (!this.props.deck || this.state.editable) {
      return (
        <EditableHeader deck={this.props.deck}
          toDeckList={this.props.toDeckList}
          closeEditable={() => this.setState({editable: false})}/>
      );
    }
    return (
      <StaticHeader deck={this.props.deck}
        openEditable={() => this.setState({editable: true})}/>
    );
  }
}

const mapStateToProps = (state) => ({
  deck: state.decks.find(d => d.id === state.selected_deck)
});

const mapDispatchToProps = () => ({
});

/********************************/
// Exported Declarations.
/********************************/
export const DeckEditHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export {DeckEditHeader as default}; 
