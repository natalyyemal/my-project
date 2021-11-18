import React, { Component } from 'react';
import React from 'react'
import {View, Button, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            posteos: '',
            search:'',
        }
    }

    componentDidUpdate(){
        this.todosLosPosteos();
    }

    render(){
        return(

        )
    }
}





export default Search

