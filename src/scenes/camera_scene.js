/* @flow */
/* External Imports. */
import {List} from 'immutable';
import React, {Component} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import RNFS from 'react-native-fs';
import Camera from 'react-native-camera';
import {connect} from 'react-redux';
/* Local Imports. */
import {createCard, deleteCard, updateDeckAvatar} from '../actions';
import {Deck, getCardImagePath, getImagePath} from '../types';

/********************************/
// Local Declarations.
/********************************/
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 1)'
  },
  preview: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    height: height - 40,
    width: width
  }
});

let SCROLL_TO_END;
class CameraComp extends Component {
  static propTypes = {
    deck: React.PropTypes.instanceOf(Deck),
    next_id: React.PropTypes.number,
    cards: React.PropTypes.instanceOf(List),
    create: React.PropTypes.func,
    delete: React.PropTypes.func,
    updateDeckAvatar: React.PropTypes.func
  };
  state: {taking: boolean};
  constructor(props) {
    super(props);
    this.state = {taking: null};
  }
  takePicture() {
    if (this.props.deck && !this.state.taking){
      this.setState({taking: true});
      this.camera.capture()
        .then((data) => {
          const id = this.props.next_id;
          this.props.create(id, this.props.deck.id);
          RNFS.moveFile(data.path.replace('file://', ''),
                        getImagePath(id, this.props.deck.id))
            .then(() => {
              this.setState({taking: false});
              if (!this.props.deck.avatar) {
                this.props.updateDeckAvatar(this.props.deck.id,
                  getImagePath(id, this.props.deck.id));
              }
            }).catch(err => {
              this.setState({taking: false});
              this.props.delete(id, this.props.deck.id);          
              console.error(err);
            });
        }).catch(err => {
          this.setState({taking: false});
          console.error(err);
        });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}
          ref={ref => this.scrollView = ref}  
          style={{height: 40}}
          onContentSizeChange={(contentWidth) => {
            SCROLL_TO_END = contentWidth;
            this.scrollView.scrollTo({x: SCROLL_TO_END + 60});
          }}>
          {this.props.cards.map((c) => (
            <Image key={c.id}
              source={{uri: `file://${getCardImagePath(c)}`}}
              style={{width: 60, height: 40}}/>
          ))}
        </ScrollView>
        <Camera style={styles.preview}
          ref={(cam) => this.camera = cam}
          aspect={Camera.constants.Aspect.fill}
          captureMode={Camera.constants.CaptureMode.still}
          captureTarget={Camera.constants.CaptureTarget.disk}
          captureQuality={Camera.constants.CaptureQuality.low}
          type={Camera.constants.Type.back}
          orientation={Camera.constants.Orientation.auto}
          playSoundOnCapture={true}
          flashMode={Camera.constants.FlashMode.auto}>
          <Icon name='camera'
            type='font-awesome'
            size={26}
            raised={true}
            color={this.state.taking ? 'rgba(230, 230, 230, 1)' : 
                'rgba(57, 63, 69, 1)'}
            underlayColor='rgba(230, 230, 230, 1)'
            iconStyle={{fontSize: 36}}
            containerStyle={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              margin: 40
            }}
            onPress={() => this.takePicture()} />
        </Camera>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  deck: state.decks.find(d => d.id === state.selected_deck),
  next_id: state.next_id,
  cards: state.cards.filter(c => c.deck_id === state.selected_deck)
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
export const CameraScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraComp);

export {CameraScene as default};
