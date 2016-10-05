/* @flow */
/* External Imports. */
import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Camera from 'react-native-camera';
/* Local Imports. */
import {addCard} from '../actions';
import {dispatch, getDeckToEdit} from '../store';

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

/********************************/
// Exported Declarations.
/********************************/
export class CameraScene extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
  }
  takePicture() {
    this.camera.capture()
      .then((data) => {
        dispatch(addCard(getDeckToEdit().id, data.path, 'audio'));
      }).catch(err => console.error(err));
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
          <Icon type='font-awesome'
            name='camera'
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

export {CameraScene as default};
