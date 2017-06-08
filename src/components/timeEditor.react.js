import React, { Component } from 'react';
import { Text, DatePickerAndroid, TouchableWithoutFeedback, View } from 'react-native';
import { Item, Label } from 'native-base';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';

export default class TimeEditor extends Component {
  render() {
    return (
      <Item underline key='time'>
        <Label>Expiration</Label>
        <DatePicker
          style={{width: 250}}
          date={this.props.value}
          mode='date'
          placeholder='select date'
          format={dateFormat}
          minDate={moment().format(dateFormat)}
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36,
              borderWidth: 0
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={this.props.onUpdate}
        />
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
