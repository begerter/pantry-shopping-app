import React, { Component } from 'react';
import FoodList from './components/foodList.react';
import EditFoodItem from './components/editFoodItem.react';
import TimeBasedFoodList from './components/timeBasedFoodList.react';
import EditPantryItem from './components/addItemToPantry.react';
import { Text } from 'react-native';
import { Container, Content, Tab, Tabs, Title, Header } from 'native-base';
import Food, { FOOD_TYPES } from './models/food';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addToShoppingListModalOpen: false,
      addToPantryModalOpen: false,
      shoppingListData: [],
      pantryData: []
    };

    this.shoppingItemIndex = 1;
    this.pantryItemIndex = 1;
  }

  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading="Shopping List">
            <FoodList data={this.state.shoppingListData}
              onEdit={this.editShoppingListData.bind(this)}
              onRemove={this.removeShoppingListData.bind(this)}
              onTransfer={this.editPantryData.bind(this)} />
          </Tab>
          <Tab heading="My Pantry">
            <TimeBasedFoodList data={this.state.pantryData} />
          </Tab>
        </Tabs>
        <EditFoodItem visible={this.state.addToShoppingListModalOpen}
          hideFunc={this.hideShoppingListModal.bind(this)}
          saveFunc={this.saveShoppingListData.bind(this)}
          editingItem={this.state.editingItem} />
        <EditPantryItem visible={this.state.addToPantryModalOpen}
          hideFunc={this.hidePantryModal.bind(this)}
          saveFunc={this.savePantryData.bind(this)}
          editingItem={this.state.editingItem} />
      </Container>
    );
  }

  editShoppingListData(editingItem) {
    this.setState({addToShoppingListModalOpen: true, editingItem});
  }

  hideShoppingListModal() {
    this.setState({addToShoppingListModalOpen: false, editingItem: null});
  }

  saveShoppingListData(data) {
    // modifying items in this.state.data wouldn't refresh view, so creating new list instead
    let newDataList = null;

    if (data.index) {
      newDataList = this.state.shoppingListData.map((datum => {
        if (datum.index !== data.index) {
          return datum;
        } else {
          return new Food(data.description, data.amount, data.units, FOOD_TYPES.shopping, data.index);
        }
      }));
    } else {
      const foodItem = new Food(data.description, data.amount, data.units, FOOD_TYPES.shopping, this.shoppingItemIndex);
      this.shoppingItemIndex++;
      this.state.shoppingListData.push(foodItem);
    }


    this.setState({
      shoppingListData: newDataList? newDataList : this.state.shoppingListData,
      addToShoppingListModalOpen: false,
      editingItem: null
    });
  }

  removeShoppingListData(index) {
    const newData = [];
    this.state.shoppingListData.forEach(food => {
      if (food.index != index) {
        newData.push(food);
      }
    });

    this.setState({
      shoppingListData: newData,
    });
  }

  savePantryData(data, shoppingIndexToRemove) {

  }

  editPantryData(editingItem) {
    this.setState({addToPantryModalOpen: true, editingItem});
  }

  hidePantryModal() {
    this.setState({addToPantryModalOpen: false, editingItem: null});
  }

  addPantryData() {
    this.setState({addToPantryModalOpen: true});
  }
}
