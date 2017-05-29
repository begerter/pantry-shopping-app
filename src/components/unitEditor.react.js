import React, { Component } from 'react';
import { AppRegistry, TextInput, View } from 'react-native';
import Button from './button.react';

const initialState = {
  unit: ''
};

const quickUnits = ['oz', 'qt', 'cup', 'pint', 'g'];

export default class UnitEditor extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, initialState);
  }

  render() {
    const onUpdate = this.onUpdate.bind(this);
    const quickSelectors = this.renderUnitButtons();

    return (
      <View  style={{flex: 1, flexDirection: 'column'}}>
        <TextInput value={this.state.unit}
          onChangeText={(text) => onUpdate(text)} />
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            {quickSelectors}
          </View>
      </View>
    );
  }

  renderUnitButtons() {

    const buttons = quickUnits.map((unit) => {
      return (
        <Button content={unit} onPress={() => this.onUpdate(unit)} key={unit} />
      );
    });

    return buttons;
  }

  onUpdate(unit) {
    this.setState({unit: unit});
    this.props.onUpdate(unit);
  }
}

// App registration and rendering
AppRegistry.registerComponent('UnitEditor', () => UnitEditor);
