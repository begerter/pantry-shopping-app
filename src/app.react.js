import React, { Component } from 'react';
import FoodList from './components/foodList.react';
import EditFoodItem from './components/editFoodItem.react';
import TimeBasedFoodList from './components/timeBasedFoodList.react';
import EditPantryItem from './components/addItemToPantry.react';
import { Text } from 'react-native';
import { Container, Content, Tab, Tabs, Title, Header } from 'native-base';

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
            <FoodList data={this.state.pantryData} />
          </Tab>
          <Tab heading="My Pantry">
            <TimeBasedFoodList data={this.state.shoppingListData} />
          </Tab>
        </Tabs>
        <EditFoodItem visible={this.state.addToShoppingListModalOpen}
          hideFunc={this.hideShoppingListModal.bind(this)}
          addFunc={null}
          editingItem={this.state.editingItem} />
        <EditPantryItem visible={this.state.addToPantryModalOpen}
          hideFunc={this.hidePantryModal.bind(this)}
          addFunc={null}
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

  addShoppingListData() {
    this.setState({addToShoppingListModalOpen: true});
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
