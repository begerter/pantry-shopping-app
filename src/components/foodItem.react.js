import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from './button.react';

const itemViewStyle = {
  flex: 1,
  flexDirection: 'row',
  padding: 10
};

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
      <View style={itemViewStyle}>
        <Text>{food}</Text>
        <Button content={edit} onPress={onEdit} buttonStyle={iconButtonStyle} />
        <Button content={trash} onPress={onRemove} buttonStyle={iconButtonStyle} />
      </View>
    );
  }

  editItem() {
    this.props.editItem(this.props.foodItem);
  }

  removeItem() {
    this.props.removeItem(this.props.foodItem.index);
  }
}

// App registration and rendering
AppRegistry.registerComponent('FoodItem', () => FoodItem);
