/* @flow */
/* External Imports. */
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
/* Local Imports. */
import * as actions from '../actions';
import {Deck} from '../types';
import {dispatch, getDeckById, getNextDeckId} from '../store';

/********************************/
// Local Declarations.
/********************************/
const styles = StyleSheet.create({
  staticHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(230, 230, 230, 1)',
    borderBottomWidth: 1
  },
  staticText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  staticTitle: {
    marginRight: 10,
    color: 'rgba(57, 63, 69, 1)',
    fontSize: 26
  },
  staticScore: {
    color: 'rgba(57, 63, 69, 1)',
    fontSize: 14
  },
  backButton: {
    marginLeft: 5,
    padding: 0
  },
  backIcon: {
    fontSize: 18,
    color: 'rgba(57, 63, 69, 1)'
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
    padding: 10
  },
  wideIcon: {
    marginRight: 3,
    fontSize: 18,
    color: 'rgba(57, 63, 69, 1)'
  },
  wideText: {
    fontSize: 18,
    color: 'rgba(57, 63, 69, 1)'
  }
});

const Static = (props: {deck: Deck, toDeckList: Function,
                        openEditable: Function}) => (
  <View style={styles.staticHeader}>
    <Button icon={{type: 'font-awesome', name: 'chevron-left',
                  style: styles.backIcon}}
      backgroundColor='rgba(230, 230, 230, 1)'
      buttonStyle={styles.backButton}
      title=''
      onPress={() => props.toDeckList()} />
    <View style={styles.staticText}>
      <Text style={styles.staticTitle}>
        {`${props.deck.name}`}
      </Text>
      <Text style={styles.staticScore}>
        {`${props.deck.correct}/${props.deck.total}`}
      </Text>
    </View>
    <Icon type='font-awesome'
      name='pencil'
      size={10}
      raised={true}
      color='rgba(57, 63, 69, 1)'
      underlayColor='rgba(230, 230, 230, 1)'
      iconStyle={{fontSize: 16}}
      containerStyle={{backgroundColor: 'rgba(255, 255, 255, 1)'}}
      onPress={() => props.openEditable()} />
  </View>
);

class Editable extends React.Component {
  static propTypes = {
    deck: React.PropTypes.instanceOf(Deck),
    toDeckList: React.PropTypes.func,
    closeEditable: React.PropTypes.func
  };
  state: {name: string};
  constructor(props) {
    super(props);
    this.state = {name: props.deck ? props.deck.name : ''};
  }
  onSavePress() {
    if(this.state.name.trim().length > 0) {
      if (this.props.deck) {
        dispatch(actions.setDeckName(this.props.deck.id, this.state.name));
      } else {
        let id = getNextDeckId();
        dispatch(actions.addDeck(id, this.state.name));
        dispatch(actions.setDeckToEdit(id));
      }
      this.setState({name: ''});
      this.props.closeEditable();
    }
  }
  onResetPress() {
    if (this.props.deck) {
      dispatch(actions.clearDeckStats(this.props.deck.id));
    }
  }
  onDeletePress() {
    if (this.props.deck) {
      dispatch(actions.removeDeck(this.props.deck.id));
    }
    this.props.toDeckList();
  }
  render() {
    return (
      <View>
        <View style={styles.editName}>
          <TextInput style={styles.nameInput}
            value={this.state.name}
            placeholder='Deck name...'
            autoCapitalize='words'
            onChangeText={name => this.setState({name})}/>
          <Icon type='font-awesome'
            name='check'
            size={14}
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
      return <Editable deck={this.props.deck}
                       toDeckList={this.props.toDeckList}
                       closeEditable={() => this.setState({editable: false})}/>;
    }
    return <Static deck={this.props.deck}
                   toDeckList={this.props.toDeckList}
                   openEditable={() => this.setState({editable: true})}/>;
  }
}

const mapStateToProps = (state) => ({
  deck: getDeckById(state.deck_to_edit)
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
