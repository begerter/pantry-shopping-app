import React, { Component } from 'react';
import { Picker } from 'react-native';
import { Item, Label } from 'native-base';
import convert from 'convert-units';

export default class UnitPicker extends Component {
  render() {
    let emptyItem = <Picker.Item label='' value='' key='' />;

    if (this.props.hideEmpty) {
      emptyItem = [];
    }

    return (
      <Item underline key='units'>
        <Label>Units</Label>
        <Picker mode='dropdown' selectedValue={this.props.value} style={{ width: 300 }}
          onValueChange={(unit) => this.props.onUpdate(unit) }>
          {emptyItem}
          {this.renderUnitPossibilities()}
        </Picker>
      </Item>
    );
  }

  renderUnitPossibilities() {
    let possibleUnits = this.props.possibleUnits;

    if (!possibleUnits) {
      possibleUnits = convert().possibilities('mass');
      possibleUnits = possibleUnits.concat(convert().possibilities('volume'));
    }

    return possibleUnits.map((unit) => {
      return (
        <Picker.Item label={unit} value={unit} key={unit} />
      );
    });
  }

}
