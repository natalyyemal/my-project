import React, {Component} from "react";
import {View, Button, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            username:'',
            password:'',
        }
    }
    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Register</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({username: text})}
                    placeholder='user name'
                    keyboardType='default'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    secureTextEntry={true}
                    keyboardType='email-address'
                    secureTextEntry={true}
                />
                <Text style={styles.error}>{this.props.error}</Text>
                <TouchableOpacity
                    disabled={this.state.email && this.state.password ? false: true}
                    // style={styles.button}
                    style={[styles.button, this.state.email && this.state.password && this.state.username ? styles.buttonEnabled : styles.buttonDisabled]}
                    onPress={() => this.props.register(this.state.email, this.state.password, this.state.username)}
                >
                    <Text style={styles.textButton}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
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
    error:{
        marginBottom: 10,
        color: "#dc3545",
        fontSize: 12
    },
    buttonEnabled: {
        backgroundColor: 'blue',
    },
    buttonDisabled: {
        backgroundColor: '#D3D3D3',
        borderColor: '#D3D3D3',
    },
})

export default Register;