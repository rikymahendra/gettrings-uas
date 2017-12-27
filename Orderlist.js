/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer';
import GridView from 'react-native-super-grid';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Thumbnail} from 'native-base';
var{width,height}=Dimensions.get('window');
export default class Order extends Component {
  static navigationOptions = {
      header : null
  };
    closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };
  render() {
      const { navigate } = this.props.navigation;
    return (
      <Drawer
        type="overlay"
        ref={(ref) => this._drawer = ref}
        content={
          <View style={{width : width-150, height : height, backgroundColor : 'blue'}}> 
            <Image 
              source={require('./logo.png')}
              style={{height:150,width:-300}}/>
              <View style={{width : width-140, height : height, backgroundColor : 'white', paddingLeft : 20}}>
                <TouchableOpacity onPress = {()=>navigate('Home')}>
                  <Text style={{marginTop : 20}}> Home </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>navigate('Shop')}>
                  <Text style={{marginTop : 20}}> Shop </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>navigate('Createshop')}>
                  <Text style={{marginTop : 20}}> Create Shop </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>this.logout()}>
                  <Text style={{marginTop : 20}}> Logout </Text>
                </TouchableOpacity>
              </View>
          </View>

        }
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
        main: { opacity:(2-ratio)/2 }
        })}
      >
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Order List</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            <ListItem>
              <Body>
                <Text>Paket Panas</Text>
                <Text note>Order by admin@gmail.com</Text>
                <Button danger><Text> Pick Up Order </Text></Button>
              </Body>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <Body>
                <Text>Paket Panas</Text>
                <Text note>Order by admin@gmail.com</Text>
                <Button success><Text> Success </Text></Button>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
</Drawer>
    );
  }
}
const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
