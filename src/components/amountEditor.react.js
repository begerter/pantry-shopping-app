import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { Button, Item, Icon } from 'native-base';

const initialState = {
  amount: '0'
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
      <Item underline style={{justifyContent: 'center'}}>
        <Button transparent onPress={onDecrement}>
          <Icon name='remove' />
        </Button>
        <TextInput keyboardType='numeric' value={amount} style={{borderWidth: 0}}
          onChangeText={(text) => onUpdate(text)} />
        <Button transparent onPress={onIncrement}>
          <Icon name='add' />
        </Button>
      </Item>
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
