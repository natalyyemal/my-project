import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



import Home from '../screens/home';
import Register from '../screens/register';
import Login from '../screens/login';
import Perfil from '../screens/profile';
import PostForm from '../screens/postForm';
import { auth } from '../firebase/config';
import { Text, View } from 'react-native';


const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

class Menu extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedIn:false,
            user:'',
            mensajeError: '',
            codigoError:'',
        }
    }
    
    componentDidMount(){ //para ver si esta logueado
        auth.onAuthStateChanged(user => { // para ver si esta logueado
            if(user){
                this.setState({
                    loggedIn:true,
                    user: user,
                    loaded: true,
                })
            }
        })
    }

    register(email, pass, username){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( (response)=>{
                response.user.updateProfile({
                    displayName: username,
                })
            })
            .catch( error => {
                // <Text>Esta mal: {error} </Text>
                console.log(error);
                this.setState({
                    mensajeError: error.message,
                    
                })

            })
    }
    login(email,pass){
        auth.signInWithEmailAndPassword(email,pass)
            .then( response => {
                this.setState({
                    loggedIn: true,
                    user:response.user,
                })
            })
            .catch( e => {
                // <Text>Esta mal: {error} </Text>
                console.log(e);
                this.setState({
                    mensajeError: e.message,
                    
                })

            })
    }

    logout(){
        auth.signOut()
            .then( (res)=>{
                this.setState({
                    user:'',
                    loggedIn: false,
                })
            })
            .catch()
    }

    render(){
            return(
            <NavigationContainer>
            {this.state.loggedIn == false ?
                <Drawer.Navigator>
                    <Drawer.Screen name="Registro" component={()=><Register register={(email, pass, username)=>this.register(email, pass, username)} error= {this.state.mensajeError} />} />
                   
                    <Drawer.Screen name="Login" component={()=><Login login={(email, pass)=>this.login(email, pass)} error= {this.state.mensajeError} />}/>
                </Drawer.Navigator> :
                <Drawer.Navigator>
                     <Drawer.Screen name="Home" component={()=><Home />} 
                    //  options={{
                    //     tabBarIcon: ({color, size}) => (
                    //        <MaterialCommunityIcons name="home" color={color} size={26} />
                    //     ),
                    //  }} esto es para poner el icono de la casita, si esto anda, replicarlo en profile y en new post 
                     />
                     <Drawer.Screen name ="New Post" component={(drawerProps)=><PostForm drawerProps={drawerProps}/>}/>
                      <Drawer.Screen name="Perfil" component={()=><Perfil userData={this.state.user} logout={()=>this.logout() } />} 
                />
                </Drawer.Navigator>
            }
            </NavigationContainer>
        )
    }

}

export default Menu;