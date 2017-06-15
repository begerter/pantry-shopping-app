import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import { Container, Content, Tab, Tabs, Title, Header } from 'native-base';
import ShoppingList from './components/shoppingList.react';
import EditShoppingListItem from './components/editShoppingListItem.react';
import PantryList from './components/pantryList.react';
import EditPantryItem from './components/editPantryItem.react';
import ConsumePantryItem from './components/consumePantryItem.react';
import Item, { ITEM_TYPES, deserializeItem } from './models/item';
import { storage, saveShoppingList, savePantryList } from './models/storage';

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
      consumeFromPantryModalOpen: false,
      shoppingListData: [],
      pantryData: []
    };

    storage.load({
      key: 'shoppingList'
    }).then(shoppingListData => {
      this.setState({shoppingListData: shoppingListData.map(deserializeItem)});
    }).catch(err => {
      // do nothing for now
    });

    storage.load({
      key: 'pantryList'
    }).then(pantryData => {
      this.setState({pantryData: pantryData.map(deserializeItem)})
    }).catch(err => {
      // do nothing for now
    });
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
        <ConsumePantryItem visible={this.state.consumeFromPantryModalOpen}
          hideFunc={this.hideConsumeModal.bind(this)}
          saveFunc={this.consumeFromPantry.bind(this)}
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
          return new Item(data.description, data.amount, data.units, null, ITEM_TYPES.shopping, data.index);
        }
      }));
    } else {
      const foodItem = new Item(data.description, data.amount, data.units, null, ITEM_TYPES.shopping, new Date().valueOf());
      this.state.shoppingListData.push(foodItem);
    }


    this.setState({
      shoppingListData: newDataList? newDataList : this.state.shoppingListData,
      addToShoppingListModalOpen: false,
      editingItem: null
    });

    saveShoppingList(newDataList? newDataList : this.state.shoppingListData);
  }

  removeShoppingListData(index) {
    const newDataList = removeIndexFromList(this.state.shoppingListData, index);

    this.setState({
      shoppingListData: newDataList
    });

    saveShoppingList(newDataList);
  }

  savePantryData(data, shoppingIndexToRemove) {
    // modifying items in this.state.data wouldn't refresh view, so creating new list instead
    let newDataList = null;

    if (data.index) {
      newDataList = this.state.pantryData.map((datum => {
        if (datum.index !== data.index) {
          return datum;
        } else {
          return new Item(data.description, data.amount, data.units, data.time, ITEM_TYPES.pantry, data.index);
        }
      }));
    } else {
      const foodItem = new Item(data.description, data.amount, data.units, data.time, ITEM_TYPES.pantry, new Date().valueOf());
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

    saveShoppingList(shoppingListData);
    savePantryList(newDataList? newDataList : this.state.pantryData);
  }

  removePantryListData(index) {
    const newPantryList = removeIndexFromList(this.state.pantryData, index)
    this.setState({
      pantryData: newPantryList
    });

    savePantryList(newPantryList);
  }

  hideConsumeModal() {
    this.setState({consumeFromPantryModalOpen: false, editingItem: null});
  }

  consumeFromPantry(data) {
    const newDataList = [];

    this.state.pantryData.forEach(pantryItem => {
      if (pantryItem.index !== data.index) {
        newData.push(pantryItem);
      } else {
        if (data.units === pantryItem.units && data.amount !== pantryItem.amount) {
          pantryItem.amount = pantryItem.amount - data.amount;
          newData.push(pantryItem);
        } else if (data.units !== pantryItem.units) {
          // todo: unit conversions
          newData.push(pantryItem);
        }
      }
    });

    this.setState({
      pantryData: newDataList,
      consumeFromPantryModalOpen: false,
      editingItem: null
    });

    savePantryList(newDataList);
  }

  consumePantryListData(editingItem) {
    this.setState({consumeFromPantryModalOpen: true, editingItem});
  }

  editPantryData(editingItem) {
    this.setState({addToPantryModalOpen: true, editingItem});
  }

  hidePantryModal() {
    this.setState({addToPantryModalOpen: false, editingItem: null});
  }
}
