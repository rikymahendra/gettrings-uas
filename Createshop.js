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
  AsyncStorage,
} from 'react-native';
import * as firebase from 'firebase';
var ImagePicker = require("react-native-image-picker");
import RNFetchBlob from 'react-native-fetch-blob';
import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer';
import GridView from 'react-native-super-grid';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import { Container, Header, Content, Text, Button, Form, Item, Input, Icon, Left, Body, Title, Right, Tabs, Tab, TabHeading, Card, CardItem} from 'native-base';
var{width,height}=Dimensions.get('window');
const polyfill = RNFetchBlob.polyfill;

window.XMLHttpRequest = polyfill.XMLHttpRequest;
window.Blob = polyfill.Blob;

export default class Createshop extends Component {
  static navigationOptions = {
      header : null
  };
  constructor(props){
    super(props);
    this.state={
      imagePath : '',
      imageUploadPath : '',
      name : '',
      phone : '',
      email : '',
      address : ''
    }
  }
    closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  GetImagePath=()=>{
    ImagePicker.showImagePicker((response) => {
        if (response.didCancel) {
        }
        else if (response.error) {
          alert("An Error Occurred During Open Library"); // jika terjadi kesalahan saat menggunakan image picker
        }
        else if (response.customButton) {
        }
        else {
          let source = { uri: response.uri };
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.setState({
            imagePath : source, //simpan alamat gambar untuk ditampilkan pada aplikasi --obj--
            imageUploadPath : source.uri //simpan alamat gambar untuk di upload ke firebase storage --url--
          });
        }
      });
   }

  create=()=>{
    AsyncStorage.multiSet([
      ["shopStatus", 'ada']
    ]);
    let today = new Date();
    let Times = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let sortTime = -1*today.getTime();// mengambil waktu sekarang utuk sorting
    var userId = firebase.auth().currentUser.uid;
    Blob.build(RNFetchBlob.wrap(""+this.state.imageUploadPath+""), { type : 'image/jpeg' }).then((blob)=>{
        firebase.storage().ref("shop/"+userId+"/"+sortTime+"").put(blob, {contentType : 'image/png'}).then(()=>{
          var storage = firebase.storage().ref("shop/"+userId+"/"+sortTime+"");    
          storage.getDownloadURL().then((url)=>{
              var database = firebase.database().ref("shop");
              database.push({
                sortTime : sortTime,
                uri : url,
                dateUploaded : Times,
                shopName : this.state.name,
                phone : this.state.phone,
                email : this.state.email,
                address : this.state.address
              }).then(()=>{
                database = firebase.database().ref("userShop/"+userId+"");
                database.push({
                  sortTime : sortTime,
                  uri : url,
                  dateUploaded : Times,
                  shopName : this.state.name,
                  phone : this.state.phone,
                  email : this.state.email,
                  address : this.state.address
                }).then(()=>{
                  const { navigate } = this.props.navigation;
                  navigate("Home");
                });
              });
          });
        });
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
                <Text style={{marginTop : 20}}> Home </Text>
                <TouchableOpacity>
                  <Text style={{marginTop : 20}}> Create Shop </Text>
                </TouchableOpacity>
                <Text style={{marginTop : 20}}> Manage Shop </Text>
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
          <Text style={{marginLeft : 20, color : 'white', fontSize : 20}}> Create Shop </Text>
        </View>
        <Header hasTabs />
        <Content>
          <Form>
            
          <Image style={{height:200,width:width, resizeMode:"cover",alignSelf:'center', marginTop : 10}} source={this.state.imagePath} />

          <View style={{width : width-50, height : 40, alignSelf : 'center'}}>
            <Button block onPress={()=>this.GetImagePath()} style={{width : width-50, height : 40, marginTop : 10}}>
              <Text> Choose Photo</Text>
            </Button>
          </View>
            <Item>
              <Input onChangeText={(name)=>this.setState({name : name})} style={{marginTop : 10}} placeholder="Shop Name" />
            </Item>
            <Item last>
              <Input onChangeText={(phone)=>this.setState({phone : phone})} placeholder="Phone Number" />
            </Item>
            <Item last>
              <Input onChangeText={(email)=>this.setState({email : email})} placeholder="Email" />
            </Item>
            <Item last>
              <Input onChangeText={(address)=>this.setState({address: address})} placeholder="Address" />
            </Item>
          </Form>
         
        </Content>
        <View style={{width : width, height : 40, position : 'absolute', bottom : 0}}>
            <Button block onPress={()=>this.create()} style={{width : width, height : 40}}>
              <Text> Create Shop</Text>
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
