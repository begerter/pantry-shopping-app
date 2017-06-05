import React, { Component } from 'react';
import App from './src/app.react';
import { AppRegistry } from 'react-native';

export default class pantry extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('pantry', () => pantry);
