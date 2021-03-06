import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            error:'',
        }
    }

    render(){
        console.log(this.props.login);
        return(
            <View style={styles.formContainer}>
                <Text>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                />
                <Text style={styles.error}>{this.props.error}</Text>

                <TouchableOpacity
                    disabled={this.state.email && this.state.password ? false : true} 
                    style={[styles.button, this.state.email && this.state.password ? styles.buttonEnabled : styles.buttonDisabled]}
                    onPress={() => this.props.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}> Ingresar</Text>
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
        // backgroundColor:'#28a745'
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

export default Login;