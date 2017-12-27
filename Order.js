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
import { Container, Header, Content, Text, Button, Form, Item, Input, Icon, Left, Body, Title, Right, Tabs, Tab, TabHeading, Card, CardItem} from 'native-base';
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
        <View style={{position :'absolute', zIndex : 1, marginLeft : 5, marginTop : 15, flexDirection : 'row'}}>
        <Icon onPress={()=>this.openControlPanel()} name = 'menu' style={{color : 'white'}}/>
          <Text style={{marginLeft : 20, color : 'white', fontSize : 20}}> Order Food & Drink </Text>
        </View>
        <Header hasTabs />
        <Content>
          <Form>
            <Item>
              <Input placeholder="Name"/>
            </Item>
            <Item last>
              <Input placeholder="Quantities"/>
            </Item>
            <Item last>
              <Input placeholder="Phone Number" />
            </Item>
            <Item last>
              <Input placeholder="Email" />
            </Item>
            <Item last>
              <Input placeholder="Address" />
            </Item>
            <Item last style={{marginTop : 10}}>
            <Text>Total Price : </Text>
            </Item>
          </Form>
        </Content>
        <View style={{width : width, height : 40, position : 'absolute', bottom : 0}}>
          <Button block style={{width : width, height : 40}}>
            <Text>Order</Text>
          </Button>
        </View>
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
