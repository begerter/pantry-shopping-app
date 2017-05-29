import React, { Component } from 'react';
import { AppRegistry, Text, View, Button } from 'react-native';

const itemViewStyle = {
  flex: 1,
  flexDirection: 'row',
  padding: 10
};

export default class FoodItem extends Component {
  render() {
    const onRemove = this.removeItem.bind(this);
    const food = this.props.foodItem.toString();

    return (
      <View style={itemViewStyle}>
        <Text>{food}</Text>
        <Button title='trash' onPress={onRemove} />
      </View>
    );
  }

  removeItem() {
    this.props.removeItem(this.props.foodItem.index);
  }
}

// App registration and rendering
AppRegistry.registerComponent('FoodItem', () => FoodItem);
