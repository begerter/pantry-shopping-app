import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container, Right, Body, ListItem, Icon, Button } from 'native-base';

const iconButtonStyle = {
  backgroundColor: '#FFF'
};

export default class PantryListItem extends Component {
  render() {
    const onRemove = this.removeItem.bind(this);
    const onEdit = this.editItem.bind(this);
    const onConsume = this.consumeItem.bind(this);
    const food = this.props.foodItem.toString();

    return (
      <ListItem icon>
        <Body><Text>{food}</Text></Body>
        <Right>
          <Button onPress={onEdit} transparent>
            <Icon name='redo' />
          </Button>
          <Button onPress={onRemove} transparent>
            <Icon name='trash' />
          </Button>
        </Right>
      </ListItem>
    );
  }

  editItem() {
    this.props.editItem(this.props.foodItem);
  }

  removeItem() {
    this.props.removeItem(this.props.foodItem.index);
  }

  consumeItem() {
    this.props.consumeItem(this.props.foodItem);
  }
}
