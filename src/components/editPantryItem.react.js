import React, { Component } from 'react';
import { Modal, Text } from 'react-native';
import ModalEditor from './modalEditor.react';
import AmountEditor from './amountEditor.react';
import UnitPicker from './unitPicker.react';
import UnitQuickSelectors from './unitQuickSelectors.react';
import TimeEditor from './timeEditor.react';
import TimeQuickSelectors from './timeQuickSelectors.react';
import { Item, Label, Input } from 'native-base';
import { ITEM_TYPES } from '../models/item';
import moment from 'moment';

const initialState = {
  description: '',
  units: '',
  amount: '',
  time: null
};

export default class EditPantryItem extends ModalEditor {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, initialState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editingItem) {
      this.setState({
        description: nextProps.editingItem.description,
        units: nextProps.editingItem.units,
        amount: nextProps.editingItem.amount,
        time: nextProps.editingItem.time
      });
    } else {
      this.setState(Object.assign({}, initialState));
    }
  }

  getModalHeaderText() {
    if (this.props.editingItem && this.props.editingItem.type === ITEM_TYPES.shopping) {
      return `Move ${this.props.editingItem.description} to pantry`;
    } else if (this.props.editingItem) {
      return `Edit ${this.props.editingItem.description}`;
    }
    return 'Add to pantry';
  }

  getActionButtonText() {
    if (this.props.editingItem && this.props.editingItem.type === ITEM_TYPES.shopping) {
      return 'Move';
    } else if (this.props.editingItem) {
      return 'Save';
    }
    return 'Add';
  }

  renderFormInputItems() {
    const items = [
      <AmountEditor key='amount' onUpdate={(amount) => this.setState({amount: amount})} value={this.state.amount}/>,
      <UnitPicker key='units' onUpdate={(unit) => this.setState({units: unit})} value={this.state.units} />,
      <UnitQuickSelectors onUpdate={(unit) => this.setState({units: unit})} key='quickUnits'/>,
      <TimeEditor onUpdate={(date) => this.setState({time: date})} value={this.state.time} key='time'/>,
      <TimeQuickSelectors onUpdate={this.setTime.bind(this)} onClear={this.clearTime.bind(this)} key='quickTime'/>
    ];

    if (!this.props.editingItem) {
      items.push(
        <Item underline key='description'>
          <Label>Description</Label>
          <Input onChangeText={(text) => this.setState({description: text})} value={this.state.description} />
        </Item>
      );
    }

    return items;
  }

  setTime(increment, unit) {
    this.setState({time: moment().add(increment, unit).format('L')});
  }

  clearTime() {
    this.setState({time: null});
  }

  doAction() {
    const newItem = {
      description: this.state.description,
      units: this.state.units,
      amount: this.state.amount,
      time: this.state.time
    };

    let itemIndexToRemove = null;
    // only keep index around if editing, not if moving or adding
    if (this.props.editingItem && this.props.editingItem.type === ITEM_TYPES.pantry) {
      newItem.index = this.props.editingItem.index;
    } else if (this.props.editingItem) {
      itemIndexToRemove = this.props.editingItem.index;
    }

    this.props.saveFunc(newItem, itemIndexToRemove);
  }
}
