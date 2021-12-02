import { NavigationRouteContext } from "@react-navigation/native";
import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { auth, db } from '../firebase/config';
import MyCamera from '../components/MyCamera';

class PostForm extends Component{
    constructor(props){
        super(props)
        this.state={
            textoPost:'',
            showCamera: true,
            url: '',
        }
    }
    submitPost(){
        console.log('posteando...');
        db.collection('posts').add({
            owner: auth.currentUser.email, //autenticacion del ususario
            texto: this.state.textoPost,
            createdAt: Date.now(),
            photo: this.state.url,
        })
        .then( ()=>{ 
            this.setState({
                textoPost:'',
                showCamera: true,
            })
           
            this.props.drawerProps.navigation.navigate('Home') //te redirige al home despues que un usuario saque una foto. para que el proximo saque otra
        })
        .catch()
    }
    onImageUpload(url){
        this.setState({
            url: url,
            showCamera: false,
        })
    }

    render(){
        return(
            this.state.showCamera ? (
                <MyCamera onImageUpload={(url)=> this.onImageUpload(url)}/> // te devuelve como praramentro la url de la foto
            ) : (
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textoPost: text})}
                    placeholder='Escribí aquí'
                    keyboardType='default'
                    multiline
                    value={this.state.textoPost}    
                    />

                <TouchableOpacity style={styles.button} onPress={()=>this.submitPost()}>
                    <Text style={styles.textButton}>Guardar</Text>    
                </TouchableOpacity>
            </View>
        )
    )}
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },

    input:{
        height:100,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },

    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    
    textButton:{
        color: '#fff'
    },
})

export default PostForm;