/* @flow */
/* External Imports. */
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
/* Local Imports. */

/********************************/
// Local Declarations.
/********************************/
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 125, 0, 1)',
    borderBottomWidth: 1,
    paddingTop: 0,
    paddingBottom: 0
  },
  title: {
    flex: 3,
    justifyContent: 'center',
    fontSize: 26,
    color: 'rgba(255, 255, 255, 1)'
  }
});

/********************************/
// Exported Declarations.
/********************************/
export const DeckListHeader = () => (
  <View style={styles.header}>
    <Image source={require('../resources/flat_icon.png')}
           style={{width: 50, height: 50, marginRight: 10}}/>
    <Text style={styles.title}>
      My Matching Game
    </Text>
    {/* <Icon name='question'
      type='font-awesome'
      size={16}
      raised={true}
      color='rgba(57, 63, 69, 1)'
      underlayColor='rgba(230, 230, 230, 1)'
      iconStyle={{fontSize: 20}}
      containerStyle={{backgroundColor: 'rgba(255, 255, 255, 1)'}}
      onPress={() => console.log('help')} /> */}
  </View>
);

export {DeckListHeader as default};
