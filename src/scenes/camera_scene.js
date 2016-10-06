/* @flow */
/* External Imports. */
import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import RNFS from 'react-native-fs';
import Camera from 'react-native-camera';
import {connect} from 'react-redux';
/* Local Imports. */
import {createCard, deleteCard} from '../actions';
import {Deck, getImagePath} from '../types';

/********************************/
// Local Declarations.
/********************************/
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  preview: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    height: height,
    width: width
  }
});

class CameraComp extends Component {
  static propTypes = {
    deck: React.PropTypes.instanceOf(Deck),
    next_id: React.PropTypes.number,
    create: React.PropTypes.func,
    delete: React.PropTypes.func
  };
  constructor(props) {
    super(props);
  }
  takePicture() {
    if (this.props.deck){
      this.camera.capture()
        .then((data) => {
          const id = this.props.next_id;
          this.props.create(id, this.props.deck.id);
          RNFS.moveFile(data.path.replace('file://', ''),
                        getImagePath(id, this.props.deck.id))
            .catch(err => {
              this.props.delete(id);          
              console.error(err);
            });
        }).catch(err => console.error(err));
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Camera style={styles.preview}
          ref={(cam) => this.camera = cam}
          aspect={Camera.constants.Aspect.fill}
          captureMode={Camera.constants.CaptureMode.still}
          captureTarget={Camera.constants.CaptureTarget.disk}
          captureQuality={Camera.constants.CaptureQuality.high}
          type={Camera.constants.Type.back}
          orientation={Camera.constants.Orientation.auto}
          playSoundOnCapture={true}
          flashMode={Camera.constants.FlashMode.auto}>
          <Icon name='camera'
            type='font-awesome'
            size={26}
            raised={true}
            color='rgba(57, 63, 69, 1)'
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
  next_id: state.next_id
});

const mapDispatchToProps = (dispatch) => ({
  create: (id, deck_id) => {
    dispatch(createCard(id, deck_id));
  },
  delete: (id) => {
    dispatch(deleteCard(id));
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
