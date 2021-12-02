import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';

 
import Home from '../screens/home';
import Register from '../screens/register';
import Login from '../screens/login';
import Perfil from '../screens/profile';
import PostForm from '../screens/postForm';
import Search from '../screens/search';
import { auth } from '../firebase/config';
import { Text, View } from 'react-native';




const Drawer = createDrawerNavigator();

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
    
    componentDidMount(){ 
        auth.onAuthStateChanged(user => { 
            if(!user){
                this.setState({
                    loggedIn:false,
                    user: user,
                })
            }else{
                this.setState({
                    loggedIn:true,
                    user: user,
                })
            }
        })
    }

    register(email, pass, username){ 
        auth.createUserWithEmailAndPassword(email, pass)
            .then( (response)=>{ //response tiene un obejto literal con los datos del usuario
                response.user.updateProfile({
                    displayName: username,
                })
            })
            .catch( error => {

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
                    user:'', //vacio porque volves al estado inicial
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
                    {/* tipo de navegador */}
                    <Drawer.Screen name="Registro" component={()=><Register register={(email, pass, username)=>this.register(email, pass, username)} error= {this.state.mensajeError} />} />
                    <Drawer.Screen name="Login" component={()=><Login login={(email, pass)=>this.login(email, pass)} error= {this.state.mensajeError} />}/>
                </Drawer.Navigator> :
                <Drawer.Navigator>
                     <Drawer.Screen name="Home" component={()=><Home />} 
                     />
                     <Drawer.Screen name="Search" component={()=><Search />} 
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