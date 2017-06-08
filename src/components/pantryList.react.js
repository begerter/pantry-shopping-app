import React, { Component } from 'react';
import { Text } from 'react-native';
import Food from '../models/food';
import { List, Container, Footer, Button, Body, Icon, Separator, ListItem, Content } from 'native-base';
import PantryListItem from './pantryListItem.react';
import moment from 'moment';

const separatorStyle = {
    maxHeight: 50
};

export default class PantryList extends Component {
  render() {
    const showAdd = this.showAddFunc.bind(this);

    return (
      <Container>
        <Content>
          {this.renderLists(this.getDataBuckets())}
        </Content>
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

  getDataBuckets() {
    const expiresToday = [];
    const today = moment().endOf('day');
    const expiresTomorrow = [];
    const tomorrow = moment().add(1, 'day').endOf('day');
    const expiresWithin5 = [];
    const in5 = moment().add(5, 'day').endOf('day');
    const expiresLater = [];

    this.props.data.forEach((pantryItem) => {
      const expiration = moment(pantryItem.time, 'MM/DD/YYYY');
      if (expiration.isBefore(today)) {
        expiresToday.push(pantryItem);
      } else if (expiration.isBefore(tomorrow)) {
        expiresTomorrow.push(pantryItem);
      } else if (expiration.isBefore(in5)) {
        expiresWithin5.push(pantryItem);
      } else {
        expiresLater.push(pantryItem);
      }
    })

    return [
      { dataList: expiresToday, header: 'Expires Today' },
      { dataList: expiresTomorrow, header: 'Expires Tomorrow' },
      { dataList: expiresWithin5, header: 'Expires Soon' },
      { dataList: expiresLater, header: 'Expires Later' }
    ];
  }

  renderLists(dataLists) {
    const renderList = [];

    dataLists.forEach((data) => {
      if (data.dataList.length > 0) {
        renderList.push(this.renderListSeparator(data.header));
        data.dataList.forEach((item) => {
          renderList.push(this.renderListItem(item))
        });
      }
    });

    return renderList;
  }

  renderListSeparator(headerText) {
    return (
      <ListItem itemDivider bordered key={headerText} >
        <Text>{headerText}</Text>
      </ListItem>
    );
  }

  renderListItem(item) {
    return (
      <PantryListItem foodItem={item} key={item.index}
        removeItem={this.props.onRemove}
        editItem={this.props.onEdit}
        consumeItem={this.props.onConsume} />
    );
  }

  showAddFunc() {
    this.props.onEdit(null);
  }

}
