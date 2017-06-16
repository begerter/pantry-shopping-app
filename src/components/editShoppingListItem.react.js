import React, { Component } from 'react';
import { Modal, Text } from 'react-native';
import ModalEditor from './modalEditor.react';
import AmountEditor from './amountEditor.react';
import UnitPicker from './unitPicker.react';
import UnitQuickSelectors from './unitQuickSelectors.react';
import { Item, Label, Input } from 'native-base';

const initialState = {
  description: '',
  units: '',
  amount: ''
};

export default class EditShoppingListItem extends ModalEditor {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, initialState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editingItem) {
      this.setState({
        description: nextProps.editingItem.description,
        units: nextProps.editingItem.units,
        amount: nextProps.editingItem.amount
      });
    } else {
      this.setState(Object.assign({}, initialState));
    }
  }

  getModalHeaderText() {
    return this.props.editingItem ? 'Edit Item' : 'Add Item';
  }

  getActionButtonText() {
    return this.props.editingItem ? 'Edit Item' : 'Add Item';
  }

  renderFormInputItems() {
    const items = [
      <AmountEditor key='amount' onUpdate={(amount) => this.setState({amount: amount})} value={this.state.amount}/>,
      <UnitPicker key='units' onUpdate={(unit) => this.setState({units: unit})} value={this.state.units} />,
      <UnitQuickSelectors onUpdate={(unit) => this.setState({units: unit})} key='quickUnits'/>,
      <Item underline key='description'>
        <Label>Description</Label>
        <Input onChangeText={(text) => this.setState({description: text})} value={this.state.description} />
      </Item>
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

    this.props.saveFunc(newItem);
  }
}
