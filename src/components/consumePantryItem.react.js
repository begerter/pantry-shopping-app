import React, { Component } from 'react';
import { Modal, Text } from 'react-native';
import ModalEditor from './modalEditor.react';
import AmountEditor from './amountEditor.react';
import UnitPicker from './unitPicker.react';
import { Item, Label, Input, Picker, Button } from 'native-base';
import convert from 'convert-units';

const initialState = {
  units: '',
  amount: ''
};

export default class ConsumePantryItem extends ModalEditor {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, initialState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editingItem) {
      this.setState({
        units: nextProps.editingItem.units,
        amount: nextProps.editingItem.amount
      });
    } else {
      this.setState(Object.assign({}, initialState));
    }
  }

  getModalHeaderText() {
    if (this.props.editingItem) {
      return `Consume ${this.props.editingItem.description} from pantry`;
    }
    return 'This model shouldnt be here';
  }

  getActionButtonText() {
    return 'Consume';
  }

  renderFormInputItems() {
    if (this.props.editingItem) {
      const items = [
        <AmountEditor key='amount' onUpdate={(amount) => this.setState({amount: amount})} value={this.state.amount}/>,
        <UnitPicker key='units' onUpdate={(unit) => this.setState({units: unit})}
          value={this.state.units} hideEmpty={true}
          possibleUnits={this.props.editingItem.possibleUnits()} />,
        <Item key='consumeAll'>
          <Button small light style={{marginRight: 5}}
            onPress={this.consumeAll.bind(this)}>
            <Text>Consume all</Text>
          </Button>
        </Item>
      ];

      return items;
    } else {
      return [];
    }
  }

  consumeAll() {
    this.setState({units: this.props.editingItem.units, amount: this.props.editingItem.amount});
  }

  doAction() {
    const newItem = {
      units: this.state.units,
      amount: this.state.amount,
      index: this.props.editingItem.index
    };

    this.props.saveFunc(newItem);
  }
}
