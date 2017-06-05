import React, { Component } from 'react';
import { Text } from 'react-native';
import FoodItem from './foodItem.react';
import Food from '../models/food';
import EditFoodItem from './editFoodItem.react';
import { List, Container, Footer, Button, Body, Icon } from 'native-base';

export default class FoodList extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      addModalVisible: false
    };

    this.itemIndex = 1;
  }

  render() {
    const showAdd = this.showAddFunc.bind(this);
    const hideAdd = this.hideAddFunc.bind(this);
    const addItem = this.addFoodData.bind(this);
    const removeItem = this.removeFoodData.bind(this);
    const editItem = this.editFoodData.bind(this);

    return (
      <Container>
        <List dataArray={this.state.data}
          renderRow={(item) =>
            <FoodItem foodItem={item} removeItem={removeItem} editItem={editItem} />
          }>
        </List>
        <EditFoodItem visible={this.state.addModalVisible} hideFunc={hideAdd} addFunc={addItem} editingItem={this.state.editingItem} />
        <Footer>
          <Body>
            <Button iconLeft primary full onPress={showAdd} >
              <Icon name='add' />
              <Text style={{color: '#FFF'}}>Add</Text>
            </Button>
          </Body>
        </Footer>
      </Container>
    );
  }

  addFoodData(foodData) {
    // modifying items in this.state.data wouldn't refresh view, so creating new list instead
    let newDataList = null;

    if (foodData.index) {
      newDataList = this.state.data.map((datum => {
        if (datum.index !== foodData.index) {
          return datum;
        } else {
          return new Food(foodData.description, foodData.amount, foodData.units, foodData.index);
        }
      }));
    } else {
      const foodItem = new Food(foodData.description, foodData.amount, foodData.units, this.itemIndex);
      this.itemIndex++;
      this.state.data.push(foodItem);
    }


    this.setState({
      data: newDataList? newDataList : this.state.data,
      addModalVisible: false,
      editingItem: null
    });
  }

  editFoodData(editingItem) {
    this.setState({addModalVisible: true, editingItem});
  }

  removeFoodData(index) {
    const newData = [];
    this.state.data.forEach(food => {
      if (food.index != index) {
        newData.push(food);
      }
    });

    this.setState({
      data: newData,
    });
  }

  hideAddFunc() {
    this.setState({addModalVisible: false, editingItem: null});
  }

  showAddFunc() {
    this.setState({addModalVisible: true});
  }
}
