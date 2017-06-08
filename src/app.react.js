import React, { Component } from 'react';
import ShoppingList from './components/shoppingList.react';
import EditShoppingListItem from './components/editShoppingListItem.react';
import PantryList from './components/pantryList.react';
import EditPantryItem from './components/editPantryItem.react';
import { Text } from 'react-native';
import { Container, Content, Tab, Tabs, Title, Header } from 'native-base';
import Food, { FOOD_TYPES } from './models/food';

function removeIndexFromList(list, index) {
  const newData = [];
  list.forEach(food => {
    if (food.index != index) {
      newData.push(food);
    }
  });

  return newData;
}

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
            <ShoppingList data={this.state.shoppingListData}
              onEdit={this.editShoppingListData.bind(this)}
              onRemove={this.removeShoppingListData.bind(this)}
              onTransfer={this.editPantryData.bind(this)} />
          </Tab>
          <Tab heading="My Pantry">
            <PantryList data={this.state.pantryData}
              onEdit={this.editPantryData.bind(this)}
              onRemove={this.removePantryListData.bind(this)}
              onConsume={this.consumePantryListData.bind(this)} />
          </Tab>
        </Tabs>
        <EditShoppingListItem visible={this.state.addToShoppingListModalOpen}
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
          return new Food(data.description, data.amount, data.units, null, FOOD_TYPES.shopping, data.index);
        }
      }));
    } else {
      const foodItem = new Food(data.description, data.amount, data.units, null, FOOD_TYPES.shopping, this.shoppingItemIndex);
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
    this.setState({
      shoppingListData: removeIndexFromList(this.state.shoppingListData, index)
    });
  }

  savePantryData(data, shoppingIndexToRemove) {
    // modifying items in this.state.data wouldn't refresh view, so creating new list instead
    let newDataList = null;

    if (data.index) {
      newDataList = this.state.pantryData.map((datum => {
        if (datum.index !== data.index) {
          return datum;
        } else {
          return new Food(data.description, data.amount, data.units, data.time, FOOD_TYPES.pantry, data.index);
        }
      }));
    } else {
      const foodItem = new Food(data.description, data.amount, data.units, data.time, FOOD_TYPES.pantry, this.pantryItemIndex);
      this.pantryItemIndex++;
      this.state.pantryData.push(foodItem);
    }

    const shoppingListData = shoppingIndexToRemove?
      removeIndexFromList(this.state.shoppingListData, shoppingIndexToRemove) :
      this.state.shoppingListData;

    this.setState({
      shoppingListData,
      pantryData: newDataList? newDataList : this.state.pantryData,
      addToPantryModalOpen: false,
      editingItem: null
    });
  }

  removePantryListData(index) {
    this.setState({
      pantryData: removeIndexFromList(this.state.pantryData, index),
    });
  }

  consumePantryListData(editingItem) {
    // todo
  }

  editPantryData(editingItem) {
    this.setState({addToPantryModalOpen: true, editingItem});
  }

  hidePantryModal() {
    this.setState({addToPantryModalOpen: false, editingItem: null});
  }
}
