import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Item, Grid, Col } from 'native-base';

const quickTimes = [
  {
    display: 'today',
    increment: 0,
    unit: 'days'
  }, {
    display: 'tomorrow',
    increment: 1,
    unit: 'days'
  }, {
    display: '1 week',
    increment: 7,
    unit: 'days'
  }, {
    display: '2 weeks',
    increment: 14,
    unit: 'days'
  }
];

export default class TimeQuickSelectors extends Component {
  render() {
    return (
      <Item>
        {this.renderTimeButtons()}
      </Item>
    );
  }

  renderTimeButtons() {
    const buttons = quickTimes.map((timeObj) => {
      return (
        <Button small light
          onPress={() => this.props.onUpdate(timeObj.increment, timeObj.unit)}
          key={timeObj.display}
          style={{marginRight: 5}}>
          <Text>{timeObj.display}</Text>
        </Button>
      );
    });

    return buttons;
  }
}
