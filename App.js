import React, { Component } from 'react';
import { StyleSheet,View,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from "firebase";
import Icon from 'react-native-vector-icons/FontAwesome';

import LoginPage from './components/auth/Login';
import RegisterPage from './components/auth/Register';
import MainPage from './components/Main';
import DetailPage from './components/News';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//Add your firebase detils here
const firebaseConfig = {
  apiKey: "***********************",
  authDomain: "*********************",
  projectId: "*********************",
  storageBucket: "**********************",
  messagingSenderId: "*******************",
  appId: "****************************",
  measurementId: "******************"
};


//verifying we are not running any firebase instance at the moment
if(firebase.apps.length === 0){
  //initalizing firebase
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
     super(props);

     this.state = {
       loaded:false,
     }

   }

   componentDidMount(){
     firebase.auth().onAuthStateChanged((user) => {
       if(!user){
         this.setState({
           loggedIn:false,
           loaded:true
         })
       }else{
         this.setState({
           loggedIn:true,
           loaded:true
         })
       }
     })
   }

   render() {
     const {loggedIn, loaded} = this.state;
     if(!loaded){
       return(
         <View style={styles.view}>
           <Icon name="bullseye" size={80} />
         </View>
       )
     }
     if(!loggedIn){
       return (
         <NavigationContainer>
           <Stack.Navigator initialRouteName="Landing"   screenOptions={{ headerShown: false }} >
             <Stack.Screen name="Login" component={LoginPage} navigation={this.props.navigation}/>
             <Stack.Screen name="Register" component={RegisterPage}/>

           </Stack.Navigator>
         </NavigationContainer>
       );
     }

     return(
         <NavigationContainer>
           <Stack.Navigator initialRouteName="Main" >
             <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }} navigation={this.props.navigation}/>
             <Stack.Screen name="News" component={DetailPage}  />
           </Stack.Navigator>
         </NavigationContainer>
     )
 }
}

export default App;


const styles = StyleSheet.create({
  view: {
      flex: 1,
      justifyContent: 'center',
      width: '100%',
      left:'40%',
  },
});
