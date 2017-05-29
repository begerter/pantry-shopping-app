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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const initialData = [];

    this.state = {
      dataSource: ds.cloneWithRows(initialData),
      data: initialData,
      addModalVisible: false
    };

    this.itemIndex = 0;
  }

  render() {
    const showAdd = this.showAddFunc.bind(this);
    const hideAdd = this.hideAddFunc.bind(this);
    const addItem = this.addFoodData.bind(this);
    const removeItem = this.removeFoodData.bind(this);

    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <Button title='add' onPress={showAdd} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <FoodItem foodItem={rowData} removeItem={removeItem} />}
          renderSeparator={this.renderSeparator}
        />

        <EditFoodItem visible={this.state.addModalVisible} hideFunc={hideAdd} addFunc={addItem} />
      </View>
    );
  }

  renderSeparator(sectionId, rowId) {
    return (
      <View key={`${sectionId}-${rowId}`} style={separatorStyle} />
    );
  }

  addFoodData(foodData) {
    const foodItem = new Food(foodData.description, foodData.amount, foodData.units, this.itemIndex);
    this.itemIndex++;
    this.state.data.push(foodItem);

    this.setState({
      data: this.state.data,
      dataSource: this.state.dataSource.cloneWithRows(this.state.data),
      addModalVisible: false
    });
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
    this.setState({addModalVisible: false});
  }

  showAddFunc() {
    this.setState({addModalVisible: true});
  }
}

// App registration and rendering
AppRegistry.registerComponent('FoodList', () => FoodList);
