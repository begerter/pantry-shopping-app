import React, { Component } from 'react';
import { Modal, Text } from 'react-native';
import { Container, Form, Content, Header, Button, Icon, Body, Title, Left, Label } from 'native-base';

export default class ModalEditor extends Component {
  // needs to be extended with functions:
  // getModalHeaderText - returns string
  // getActionButtonText - returns string
  // renderFormInputItems - returns [Item]
  // doAction - does an action when button is pressed

  getModalHeaderText() {
    return 'This is a modal editor';
  }

  getActionButtonText() {
    return 'Do something';
  }

  renderFormInputItems() {
    return [];
  }

  doAction() {
  }

  render() {
    const doAction = this.doAction.bind(this);

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
              <Title>{this.getModalHeaderText()}</Title>
            </Body>
          </Header>
          <Content>
            <Form>
              {this.renderFormInputItems()}
              <Button primary block onPress={doAction} >
                <Text style={{color: '#FFF'}}>{this.getActionButtonText()}</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </Modal>
    );
  }
}
