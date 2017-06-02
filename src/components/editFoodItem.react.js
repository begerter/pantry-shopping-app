import React, { Component } from 'react';
import { Modal, Text } from 'react-native';
import AmountEditor from './amountEditor.react';
import UnitQuickSelectors from './unitQuickSelectors.react';
import { Container, Form, Content, Header, Button, Icon, Body, Title, Left, Item, Label, Input } from 'native-base';

const initialState = {
  description: '',
  units: '',
  amount: ''
};

export default class EditFoodItem extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, initialState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editingItem) {
      this.setState({
        description: nextProps.editingItem.description,
        units: nextProps.editingItem.units,
        amount: nextProps.editingItem.amount
      });
    } else {
      this.setState(Object.assign({}, initialState));
    }
  }

  render() {
    const onAddPress = this.addItem.bind(this);
    const actionText = this.props.editingItem ? 'SAVE' : 'ADD';
    const headerText = this.props.editingItem ? 'Edit Item' : 'Add Item';

    return (
      <Modal visible={this.props.visible} onRequestClose={this.props.hideFunc} >
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this.props.hideFunc}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>{headerText}</Title>
            </Body>
          </Header>
          <Content>
            <Form>
              <AmountEditor onUpdate={(amount) => this.setState({amount: amount})} value={this.state.amount}/>
              <Item underline>
                <Label>Units</Label>
                <Input value={this.state.units}
                  onChangeText={(unit) => this.setState({units: unit})} />
              </Item>
              <UnitQuickSelectors onUpdate={(unit) => this.setState({units: unit})} />
              <Item underline>
                <Label>Description</Label>
                <Input onChangeText={(text) => this.setState({description: text})} value={this.state.description} />
              </Item>
              <Button primary block onPress={onAddPress} >
                <Text style={{color: '#FFF'}}>{actionText}</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </Modal>
    );
  }

  addItem() {
    const newItem = {
      description: this.state.description,
      units: this.state.units,
      amount: this.state.amount
    };

    if (this.props.editingItem) {
      newItem.index = this.props.editingItem.index;
    }

    this.props.addFunc(newItem);
  }
}
