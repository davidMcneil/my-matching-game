/* @flow */
/* External Imports. */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
/* Local Imports. */

/********************************/
// Local Declarations.
/********************************/
const styles = StyleSheet.create({
  header: {
    flexDirection:'row',
    backgroundColor: 'rgba(230, 230, 230, 1)',
    borderBottomWidth: 1,
  },
  filler: {
    flex: 1,
  },
  title: {
    flex: 3,
    justifyContent:'center',
    fontSize: 26,
    color: 'rgba(57, 63, 69, 1)'
  }
});

/********************************/
// Exported Declarations.
/********************************/
export const DeckListHeader = () => (
  <View style={styles.header}>
    <View style={styles.filler}></View>
    <Text style={styles.title}>
      My Matching Game
    </Text>
    <Icon name='question'
      type='font-awesome'
      size={10}
      raised={true}
      color='rgba(57, 63, 69, 1)'
      underlayColor='rgba(230, 230, 230, 1)'
      iconStyle={{fontSize: 16}}
      containerStyle={{backgroundColor: 'rgba(255, 255, 255, 1)'}}
      onPress={() => console.log('help')} />
  </View>
);

export {DeckListHeader as default}; 
