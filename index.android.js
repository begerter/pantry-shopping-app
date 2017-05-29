/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import FoodList from './src/components/foodList.react';
import EditFoodItem from './src/components/editFoodItem.react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class pantry extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FoodList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('pantry', () => pantry);
