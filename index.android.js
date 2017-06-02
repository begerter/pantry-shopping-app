import React, { Component } from 'react';
import FoodList from './src/components/foodList.react';
import EditFoodItem from './src/components/editFoodItem.react';
import { AppRegistry, Text } from 'react-native';
import { Container, Content, Tab, Tabs, Title, Header } from 'native-base';

export default class pantry extends Component {
  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading="Shopping List">
            <FoodList />
          </Tab>
          <Tab heading="My Pantry">
            <Text>tab2</Text>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

AppRegistry.registerComponent('pantry', () => pantry);
