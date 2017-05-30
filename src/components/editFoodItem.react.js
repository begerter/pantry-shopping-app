import React, { Component } from 'react';
import { AppRegistry, TextInput, Modal, View } from 'react-native';
import AmountEditor from './amountEditor.react';
import UnitEditor from './unitEditor.react';
import Button from './button.react';

const initialState = {
  description: '',
  units: '',
  amount: ''
};

export default class EditFoodItem extends Component {
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

  render() {
    const onAddPress = this.addItem.bind(this);
    const actionText = this.props.editingItem ? 'SAVE' : 'ADD';

    return (
      <Modal visible={this.props.visible} onRequestClose={this.props.hideFunc} style={{flex: 1, justifyContent: 'flex-start'}} >
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }} >
          <View style={{height: 50}}>
            <AmountEditor onUpdate={(amount) => this.setState({amount: amount})} value={this.state.amount}/>
          </View>
          <View style={{height: 100}}>
            <UnitEditor onUpdate={(unit) => this.setState({units: unit})} value={this.state.units}/>
          </View>
          <View style={{height: 50}}>
            <TextInput placeholder='item to buy' onChangeText={(text) => this.setState({description: text})} value={this.state.description} />
          </View>
          <View style={{flex: 1, flexDirection: 'row', height: 50, justifyContent: 'center'}} >
            <Button content={actionText} onPress={onAddPress} buttonStyle={{backgroundColor:'#003D00'}} textStyle={{color:'white'}}/>
            <Button content='CANCEL' onPress={this.props.hideFunc} />
          </View>
        </View>
      </Modal>
    );
  }

  addItem() {
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

// App registration and rendering
AppRegistry.registerComponent('EditFoodItem', () => EditFoodItem);
