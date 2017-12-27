import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer';
import GridView from 'react-native-super-grid';
import * as firebase from "firebase";
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import { Container, Header, Content, Text, Button, Icon, Left, Body, Title, Right, Tabs, Tab, TabHeading, Card, CardItem, ListItem, List, Thumbnail} from 'native-base';
var{width,height}=Dimensions.get('window');
export default class Shop extends Component {
  static navigationOptions = {
      header : null
  };
    closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  constructor(props){
    super(props);
    this.state={
      items : [],
      temp : [],
      itemsMenu : [],
      tempMenu : [],
      modalVisible : false
    }
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

  edit=()=>{
    const { navigate } = this.props.navigation;
    navigate('EditMenu');
    this.setState({modalVisible : false});
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
     <Container style={{backgroundColor : "white"}}>
      <Modal
                animationType = {"fade"}
                transparent   = {true}
                visible       = {this.state.modalVisible} onRequestClose ={()=>{console.log('closed')}}
        >
        <View style={{width: width-200, height : 100, backgroundColor : 'white', alignSelf : 'center', marginTop : height/2.5}}>
        <TouchableOpacity onPress={()=>this.edit()}>
          <Text style={{marginTop : 10, marginLeft : 10}}>
            Edit
          </Text>
        </TouchableOpacity>
        <View style={{height : 10, width : width-200}}></View>
        <TouchableOpacity>
          <Text style={{marginTop : 10, marginLeft : 10}}>
            Delete
          </Text>
        </TouchableOpacity>
        </View>
      </Modal>
        <View style={{position :'absolute', zIndex : 1, marginLeft : 5, marginTop : 15, flexDirection : 'row'}}>
        <Icon onPress={()=>this.openControlPanel()} name = 'menu' style={{color : 'white'}}/>
        <Text style={{marginLeft : 20, color : 'white', fontSize : 20}}> Shop</Text>
        </View>
        <Header hasTabs />
        <Tabs initialPage={0}>
          <Tab heading="Manage Shop">
            <GridView
              itemWidth={130}
              items={[1,2]}
              renderItem={item => (
                <TouchableOpacity onPress={()=>navigate('FoodViewShop')}>
                  <Card >
                    <CardItem>
                      <View style={{position : 'absolute', bottom : 10, right : 0}}>
                        <TouchableOpacity onPress={()=>this.setState({modalVisible : true})}>
                          <Icon name = 'menu' style={{color : 'green'}}>
                          </Icon>
                        </TouchableOpacity>
                      </View>
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
          <Tab heading="Notification">
              <GridView
              itemWidth={130}
              items={[1]}
              renderItem={item => (
                  <Content>
                    <TouchableOpacity>
                      <List>
                        <ListItem>
                          <Body>
                            <Text>Paket Panas</Text>
                            <Text note>Order by admin@gmail.com</Text>
                            <Button danger><Text> Pick Up Order </Text></Button>
                          </Body>
                        </ListItem>
                        </List>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <List>
                        <ListItem>
                          <Body>
                            <Text>Paket Panas</Text>
                            <Text note>Order by admin@gmail.com</Text>
                            <Button success><Text> Success </Text></Button>
                          </Body>
                        </ListItem>
                      </List>
                    </TouchableOpacity>
                  </Content>
              )}
            />
          </Tab>
        </Tabs>
        <View style={{width : width, height : 40, position : 'absolute', bottom : 0}}>
          <Button block style={{width : width, height : 40}}>
            <TouchableOpacity onPress={()=>navigate('Createmenu')}>
              <Text>Create Package Food</Text>
            </TouchableOpacity>
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
