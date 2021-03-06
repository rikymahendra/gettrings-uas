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
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer';
import GridView from 'react-native-super-grid';
import * as firebase from "firebase";
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import { Container, Header, Content, Text, Button, Icon, Left, Body, Title, Right, Tabs, Tab, TabHeading, Card, CardItem} from 'native-base';
var{width,height}=Dimensions.get('window');
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      items : [],
      temp : [],
      itemsMenu : [],
      tempMenu : []
    }
  }
  static navigationOptions = {
      header : null
  };
    closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  logout=()=>{
   let keys = ['albums','email', 'password', 'userId','username','fullName','gender','birth'];

  AsyncStorage.multiRemove(keys, (err) => {

      alert("Logged out!");

  });

  firebase.auth().signOut().then(()=>{
     const { navigate } = this.props.navigation;
     navigate("Login");
  });
  }

  componentWillMount(){
    //ambil data shop
    var database = firebase.database().ref("shop");
    database.on("child_added",(snaphot)=>{
        this.state.temp.push({
          id : snaphot.key,
          uri : snaphot.val().uri,
          shopName : snaphot.val().shopName
        });
        this.setState({
          items : this.state.temp
        });
    });

    //ambil data menu atau makanan
    database = firebase.database().ref("Menu");
    database.on("child_added",(snaphot)=>{
      this.state.tempMenu.push({
        id : snaphot.key,
        uri : snaphot.val().uri,
        paket : snaphot.val().paket,
        harga : snaphot.val().price,
        menu : snaphot.val().menu
      });
      this.setState({
        itemsMenu : this.state.tempMenu
      });
    });

    //remove data shop
    var userId = firebase.auth().currentUser.uid;
    var database = firebase.database().ref("shop");
    database.on("child_removed", (dataSnapshot)=>{
      this.state.temp = this.state.temp.filter((x)=>x.id !== dataSnapshot.key);
      this.setState({
        items : this.state.temp
       });   
    }); 

     //remove data menu
     database = firebase.database().ref("Menu");
     database.on("child_removed", (dataSnapshot)=>{
       this.state.tempMenu = this.state.tempMenu.filter((x)=>x.id !== dataSnapshot.key);
       this.setState({
         itemsMenu : this.state.tempMenu
        });   
     }); 
  }

  createShope=()=>{
    const { navigate } = this.props.navigation;
    AsyncStorage.getItem("shopStatus").then((data)=>{
        if(data == null){
          navigate("Createshop");
        }
        else{
          alert("You can only add 1 shop!");
        }
    });
  }
  
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
                <TouchableOpacity onPress = {()=>navigate('OrderList')}>
                  <Text style={{marginTop : 20}}> Order List </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>this.createShope()}>
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
        <Text style={{marginLeft : 20, color : 'white', fontSize : 20}}> Home</Text>
        </View>
        <Header hasTabs />
        <Tabs initialPage={0}>
          <Tab heading="Food & Drink">
            <GridView
              itemWidth={130}
              items={this.state.itemsMenu}
              renderItem={item => (
                <TouchableOpacity onPress={()=>navigate('FoodView',{id : item.id, uri : item.uri, harga : item.harga, paket : item.paket, menu : item.menu})}>
                 <Card >
                   <CardItem>
                    <Body>
                       <Image 
                       source={{uri:item.uri}}
                        style={{height:150,width:150}}/>
                        <Text style={{color : 'green'}}>
                          {item.paket}
                        </Text>
                        <Text style={{color : 'green'}}>
                         Rp. {item.harga}
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
              items={this.state.items}
              renderItem={item => (
                <TouchableOpacity onPress={()=>navigate("FoodView",{id : item.id, uri : item.uri, name : item.shopName})}>
                 <Card>
                   <CardItem>
                    <Body>
                       <Image 
                        source={{uri:item.uri}} 
                        style={{height:150,width:150}}/>
                        <Text style={{color : 'green'}}>
                          {item.shopName}
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
