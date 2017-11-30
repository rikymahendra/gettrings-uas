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
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
var{width,height}=Dimensions.get('window');
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import * as firebase from "firebase";
export default class Signup extends Component {
  static navigationOptions = {
      header : null
  };
  constructor(props){
    super(props);
    this.state = {
      username:"",
      email:"",
      pass:"",
      phonenum:""
    }
  }

  signup = ()=>{
    firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.pass).then(() => {
      var userId = firebase.auth().currentUser.uid;
      AsyncStorage.multiSet([
          ["email", this.state.email],
          ["password", this.state.pass],
          ["userId", userId]
        ]);
      this.writeToDatabase(userId);
      const { navigate } = this.props.navigation;
      navigate('Home');
    }).catch((error) => {
        alert("error " + error.message );
    });
  }

writeToDatabase = (userId) => {
  let today = new Date();
  let Times = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let sortTime = -1*today.getTime();
  var database = firebase.database().ref("users").child(userId);
  database.set({
    sortTime : sortTime,
    createdAt : Times,
    userId : userId,
    email : this.state.email,
    username :this.state.username,
    phonenum : this.state.phonenum,
  }).then((snapshot)=>{

     firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
     
        AsyncStorage.multiSet([
          ["email", this.state.email],
          ["password", this.state.pass],
          ["userId", userId],
          ["username", this.state.username],
        ]);
      /** Set AsyncStorage START **/
      // const { navigate } = this.props.navigation;
      // navigate('Home');
      
      }).catch((error) => {
          alert("error " + error.message );
         
      });

  });

}

  render() {
    const { navigate } = this.props.navigation;
    return (
     <Image
          source={require('./login.png')}
          style={{height:height,width:width}}
        >
        <Text style={{color:'white',textAlign:'center',marginTop:250,fontSize:45}}>
          
        </Text>
       
        <TextInput
          style={{height: 40, width: 300, borderColor: 'grey', borderWidth: 1, alignSelf: 'center', color: 'white', fontSize: 15, borderRadius: 10, marginTop:10}}
          placeholder='Username'
          placeholderTextColor='grey'
          underlineColorAndroid='transparent'
          onChangeText={(username)=>this.setState({username})}
        />
        <TextInput
          style={{height: 40, width: 300, borderColor: 'grey', borderWidth: 1, alignSelf: 'center', color: 'white', fontSize: 15, borderRadius: 10, marginTop:10}}
          placeholder='Email'
          placeholderTextColor='grey'
          underlineColorAndroid='transparent'
          onChangeText={(email)=>this.setState({email})}
        />
        <TextInput
          style={{height: 40, width: 300, borderColor: 'grey', borderWidth: 1, alignSelf: 'center', color: 'white', fontSize: 15, borderRadius: 10, marginTop:10}}
          placeholder='Phone Number'
          placeholderTextColor='grey'
          underlineColorAndroid='transparent'
          onChangeText={(phonenum)=>this.setState({phonenum})}
        />
        <TextInput
          style={{height: 40, width: 300, borderColor: 'grey', borderWidth: 1, alignSelf: 'center', color: 'white', fontSize: 15, borderRadius: 10, marginTop:10}}
          placeholder='Password'
          placeholderTextColor='grey'
          underlineColorAndroid='transparent'
          onChangeText={(pass)=>this.setState({pass})}
          secureTextEntry={true}
        />
        <Button rounded light onPress={()=>this.signup()}
        style={{alignSelf:'center', marginTop:10, height: 40, width: 300}}>
            <Text
            style={{marginLeft:'35%'}}>Sign Up</Text>
          </Button>

        </Image>
    );
  }
}

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
