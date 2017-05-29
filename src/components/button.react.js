import React, { Component } from 'react';
import { AppRegistry, Text, TouchableOpacity } from 'react-native';

const defaultButtonStyle = {
  height: 25,
  //width: 25,
  borderRadius: 2,
  backgroundColor: '#d3d3d3',
  paddingLeft: 10,
  paddingRight: 10,
  marginRight: 5,
  marginLeft: 5,
  justifyContent: 'center'
}
export default class Button extends Component {

  render() {
    let buttonStyle = Object.assign({}, defaultButtonStyle);

    if (this.props.buttonStyle) {
      buttonStyle = Object.assign(buttonStyle, this.props.buttonStyle);
    }

    let textStyle = {};

    if (this.props.textStyle) {
      textStyle = Object.assign(textStyle, this.props.textStyle);
    }

    return (
      <TouchableOpacity  style={buttonStyle} onPress={this.props.onPress}>
        <Text style={textStyle}>{this.props.content}</Text>
      </TouchableOpacity>
    );
  }

}

// App registration and rendering
AppRegistry.registerComponent('Button', () => Button);
