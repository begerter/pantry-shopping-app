import React, { Component } from 'react';
import { Text } from 'react-native';
import Food from '../models/food';
import { List, Container, Footer, Button, Body, Icon, Separator } from 'native-base';
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
        {this.renderLists(this.getDataBuckets())}
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
        renderList.push(
          <Separator bordered key={data.header} style={separatorStyle}>
            <Text>{data.header}</Text>
          </Separator>
        );
        renderList.push(
          <List dataArray={data.dataList} key = {`list-${data.header}`}
            renderRow={(item) =>
              <PantryListItem foodItem={item}
                removeItem={this.props.onRemove}
                editItem={this.props.onEdit}
                consumeItem={this.props.onConsume} />
            }>
          </List>
        );
      }
    });

    return renderList;
  }

  showAddFunc() {
    this.props.onEdit(null);
  }

}
