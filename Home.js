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
import { Container, Header, Content, Text, Button, Icon, Left, Body, Title, Right, Tabs, Tab, TabHeading, Card, CardItem} from 'native-base';
var{width,height}=Dimensions.get('window');
export default class Home extends Component {
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
                <Text style={{marginTop : 20}}> Home </Text>
                <TouchableOpacity onPress = {()=>navigate('Createshop')}>
                  <Text style={{marginTop : 20}}> Create Shop </Text>
                </TouchableOpacity>
                <Text style={{marginTop : 20}}> Manage Shop </Text>
                <Text style={{marginTop : 20}}> Edit Profile </Text>
                <Text style={{marginTop : 20}}> Logout </Text>
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
        <Text style={{marginLeft : 20, color : 'white', fontSize : 20}}> Home</Text>
        </View>
        <Header hasTabs />
        <Tabs initialPage={0}>
          <Tab heading="Food & Drink">
            <GridView
              itemWidth={130}
              items={[1,2]}
              renderItem={item => (
                <TouchableOpacity onPress={()=>navigate('FoodView')}>
                 <Card >
                   <CardItem>
                    <Body>
                       <Image 
                        source={require('./mieayam.jpg')}
                        style={{height:150,width:150}}/>
                        <Text style={{color : 'green'}}>
                          Mie Ayam
                        </Text>
                        <Text style={{color : 'green'}}>
                         Rp. 10000/porsi
                        </Text>
                    </Body>
                   </CardItem>
                </Card>
                </TouchableOpacity>
              )}
            />
          </Tab>
          <Tab heading="Shop">
              <GridView
              itemWidth={130}
              items={[1]}
              renderItem={item => (
                <TouchableOpacity>
                 <Card>
                   <CardItem>
                    <Body>
                       <Image 
                        source={require('./acc.png')}
                        style={{height:150,width:150}}/>
                        <Text style={{color : 'green'}}>
                          Warung Sari Bhoga
                        </Text>
                    </Body>
                   </CardItem>
                </Card>
                </TouchableOpacity>
              )}
            />
          </Tab>
        </Tabs>
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
