import React, { Component } from 'react';
import { Text } from 'react-native';
import FoodItem from './foodItem.react';
import { List, Container, Footer, Button, Body, Icon } from 'native-base';

export default class FoodList extends Component {
  render() {
    const showAdd = this.showAddFunc.bind(this);

    return (
      <Container>
        <List dataArray={this.props.data}
          renderRow={(item) =>
            <FoodItem foodItem={item}
              removeItem={this.props.onRemove} editItem={this.props.onEdit} />
          }>
        </List>
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

  showAddFunc() {
    this.props.onEdit(null);
  }
}
