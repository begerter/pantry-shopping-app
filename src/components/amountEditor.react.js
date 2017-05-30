import React, { Component } from 'react';
import { AppRegistry, TextInput, View} from 'react-native';
import Button from './button.react';

const initialState = {
  amount: '0'
};

const buttonStyle={
  height: 25,
  width: 25,
  borderRadius: 5,
  backgroundColor: '#d3d3d3',
  paddingLeft: 10,
  paddingTop: 3
};

export default class AmountEditor extends Component {
  constructor(props) {
    super(props);

    if (props.value) {
      this.state = {amount: props.value};
    } else {
      this.state = Object.assign({}, initialState);
    }
  }

  render() {
    const onDecrement = this.onDecrement.bind(this);
    const onIncrement = this.onIncrement.bind(this);
    const onUpdate = this.onUpdate.bind(this);
    let amount = this.state.amount;

    if (!amount) {
      amount = '0';
    }

    return (
      <View  style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <Button onPress={onDecrement} buttonStyle={buttonStyle} content='-' />
        <TextInput keyboardType='numeric' value={amount}
          onChangeText={(text) => onUpdate(text)} style={{height: 40}}/>
        <Button onPress={onIncrement} buttonStyle={buttonStyle} content='+' />
      </View>
    );
  }

  onIncrement() {
    // todo: decide how to handle fractions/decimals
    let val = parseFloat(this.state.amount);

    val = val + 1;
    val = val.toString();
    this.onUpdate(val);
  }

  onDecrement() {
    // todo: decide how to handle fractions/decimals
    let val = parseFloat(this.state.amount);

    val = val - 1;

    if (val < 0) {
      val = 0;
    }

    val = val.toString();
    this.onUpdate(val);
  }

  onUpdate(num) {
    this.setState({amount: num});
    this.props.onUpdate(num);
  }
}

// App registration and rendering
AppRegistry.registerComponent('AmountEditor', () => AmountEditor);
