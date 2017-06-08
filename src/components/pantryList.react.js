import React, { Component } from 'react';
import { Text } from 'react-native';
import Food from '../models/food';
import { List, Container, Footer, Button, Body, Icon } from 'native-base';
import PantryListItem from './pantryListItem.react';

export default class PantryList extends Component {
  render() {
    const showAdd = this.showAddFunc.bind(this);

    return (
      <Container>
        <List dataArray={this.props.data}
          renderRow={(item) =>
            <PantryListItem foodItem={item}
              removeItem={this.props.onRemove}
              editItem={this.props.onEdit}
              consumeItem={this.props.onConsume} />
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
