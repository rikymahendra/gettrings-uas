/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import { Image } from 'react-native';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Createshop from './Createshop';
import FoodView from './FoodView';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
export default class pbm extends Component {
static navigationOptions = {
      header : null
  };

  constructor(props){
    super(props);
    
  }
  render() {
     const { navigation } = this.props;
     const { navigate } = this.props.navigation;
    return (
    // <View style={{height: height, width: null, backgroundColor:"green", flex:1,alignItems:'center', justifyContent:'center'}}>
       <Login navigation={navigation}/>
    // </View>
     
    );
  }
}

const pbmNavigation = StackNavigator({
  Login : {screen : Login},
  Signup : {screen : Signup},
  Home : {screen : Home},
  Createshop : {screen : Createshop},
  FoodView : {screen : FoodView}
});

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

AppRegistry.registerComponent('pbm', () => pbmNavigation);
