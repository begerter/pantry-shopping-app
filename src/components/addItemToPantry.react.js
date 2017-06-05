import React, { Component } from 'react';
import { Modal, Text } from 'react-native';
import ModalEditor from './modalEditor.react';
import AmountEditor from './amountEditor.react';
import UnitQuickSelectors from './unitQuickSelectors.react';
import TimeEditor from './timeEditor.react';
import { Item, Label, Input } from 'native-base';

const initialState = {
  description: '',
  units: '',
  amount: '',
  time: ''
};

export default class AddItemToPantry extends ModalEditor {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, initialState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemToAdd) {
      this.setState({
        description: nextProps.editingItem.description,
        units: nextProps.editingItem.units,
        amount: nextProps.editingItem.amount,
        time: ''
      });
    } else {
      this.setState(Object.assign({}, initialState));
    }
  }

  getModalHeaderText() {
    return this.props.itemToAdd ? `Add ${this.props.itemToAdd.description} to pantry`: 'Add to pantry';
  }

  getActionButtonText() {
    return 'Add';
  }

  renderFormInputItems() {
    const items = [
      <AmountEditor key='amount' onUpdate={(amount) => this.setState({amount: amount})} value={this.state.amount}/>,
      <Item underline key='units'>
        <Label>Units</Label>
        <Input value={this.state.units}
          onChangeText={(unit) => this.setState({units: unit})} />
      </Item>,
      <UnitQuickSelectors onUpdate={(unit) => this.setState({units: unit})} key='quickUnits'/>,
      <TimeEditor />
    ];

    return items;
  }

  doAction() {
    const newItem = {
      description: this.state.description,
      units: this.state.units,
      amount: this.state.amount
    };

    if (this.props.editingItem) {
      newItem.index = this.props.editingItem.index;
    }

    this.props.addFunc(newItem);
  }
}
