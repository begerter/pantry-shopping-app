import React, { Component } from 'react';
import { Text, DatePickerAndroid, TouchableWithoutFeedback, View } from 'react-native';
import { Item, Label } from 'native-base';

export default class TimeEditor extends Component {
  render() {
    return (
      <Item underline key='time'>
        <Label>Time</Label>
        <TouchableWithoutFeedback
            onPress={this.showPicker.bind(this, {
              date: new Date(this.props.value),
              minDate: new Date(),
              mode: 'default'
            })}>
            <View>
              <Text>{this.props.value}</Text>
            </View>
          </TouchableWithoutFeedback>
      </Item>
    );
  }

  showPicker () {
    async (options) => {
      try {
        const {action, year, month, day} = await DatePickerAndroid.open(options);
        if (action !== DatePickerAndroid.dismissedAction) {
          let date = new moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('L');
          this.props.onUpdate(date);
        }
      } catch ({code, message}) {
        console.warn(`whoops: `, message);
      }
    };
  }
}
