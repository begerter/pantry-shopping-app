import React, { Component } from 'react';
import { AppRegistry, ListView, View, Button } from 'react-native';
import FoodItem from './foodItem.react';
import Food from '../models/food';
import EditFoodItem from './editFoodItem.react';

const separatorStyle = {
  height: 1,
  backgroundColor: '#CCCCCC'
};

export default class FoodList extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.toString() !== r2.toString()});

    const initialData = [];

    this.state = {
      dataSource: ds.cloneWithRows(initialData),
      data: initialData,
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
      <View style={{flex: 1, paddingTop: 22}}>
        <Button title='add' onPress={showAdd} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <FoodItem foodItem={rowData} removeItem={removeItem} editItem={editItem} />}
          renderSeparator={this.renderSeparator}
        />

        <EditFoodItem visible={this.state.addModalVisible} hideFunc={hideAdd} addFunc={addItem} editingItem={this.state.editingItem} />
      </View>
    );
  }

  renderSeparator(sectionId, rowId) {
    return (
      <View key={`${sectionId}-${rowId}`} style={separatorStyle} />
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
      dataSource: this.state.dataSource.cloneWithRows(newDataList? newDataList : this.state.data),
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
      dataSource: this.state.dataSource.cloneWithRows(newData),
    });
  }

  hideAddFunc() {
    this.setState({addModalVisible: false, editingItem: null});
  }

  showAddFunc() {
    this.setState({addModalVisible: true});
  }
}

// App registration and rendering
AppRegistry.registerComponent('FoodList', () => FoodList);
