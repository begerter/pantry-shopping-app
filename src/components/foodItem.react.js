import React, { Component } from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from './button.react';
import { Container, Right, Body, ListItem } from 'native-base';

const iconButtonStyle = {
  backgroundColor: '#FFF'
};

export default class FoodItem extends Component {
  render() {
    const onRemove = this.removeItem.bind(this);
    const onEdit = this.editItem.bind(this);
    const food = this.props.foodItem.toString();
    const trash = (<Icon name='trash' size={30} color='#000' />);
    const edit = (<Icon name='pencil' size={30} color='#000' />)

    return (
      <ListItem icon>
        <Body><Text>{food}</Text></Body>
        <Right>
          <Button content={edit} onPress={onEdit} buttonStyle={iconButtonStyle} />
          <Button content={trash} onPress={onRemove} buttonStyle={iconButtonStyle} />
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
}
