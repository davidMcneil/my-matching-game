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
    borderBottomWidth: 1
  },
  placeholder: {
    flex: 1,
  },
  title: {
    flex: 3,
    justifyContent:'center',
    color: 'rgba(57, 63, 69, 1)',
    fontSize: 26
  }
});

/********************************/
// Exported Declarations.
/********************************/
export const DeckListHeader = () => (
  <View style={styles.header}>
    <View style={styles.placeholder}></View>
    <Text style={styles.title}>
      My Matching Game
    </Text>
    <Icon type='font-awesome'
      name='question'
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
