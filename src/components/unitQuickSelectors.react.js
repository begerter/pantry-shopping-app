import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Item, Grid, Col } from 'native-base';

const quickUnits = ['oz', 'qt', 'cup', 'pint', 'g', 'tbsp'];

const quickSelectorStyle = {
  marginTop: 5,
  marginBottom: 10
};

export default class UnitQuickSelectors extends Component {
  render() {
    return (
      <Item style={quickSelectorStyle}>
        {this.renderUnitButtons()}
      </Item>
    );
  }

  renderUnitButtons() {
    const buttons = quickUnits.map((unit) => {
      return (
        <Button small light onPress={() => this.props.onUpdate(unit)} key={unit}
          style={{marginRight: 5}}>
          <Text>{unit}</Text>
        </Button>
      );
    });

    return buttons;
  }
}
