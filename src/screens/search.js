import React, { Component } from 'react';
import React from 'react'
import {View, Button, Text, TextInput, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

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
    todosLosPosteos(){
        db.collection ('posts'). where ('titile', '?=', this.state.search).onSnapshot(
          docs => {
              let posts = [];
              docs.forEach( doc =>{
                  posts.push({
                      id:doc.id,
                      data:doc.data()
                  })
                  this.setState({
                      todosLosPosteos: posts,
                  })
              })
          }  
        )
    }

    render(){
        return(
            <View style={StyleSheet.container}>
                <TextInput
                onChangeText={(text) => this.setState({search: text})}
                placeholder="buscar"
                keyboeardType="default"
                multiline value= {this.state.search}
               />
             <Button 
             title="buscar"
             onPress={() => this.todosLosPosteos}>

             </Button>
             <FlatList 
             data={this.state.posteos}
             keyExtractor={item => item.id.toString()}
             renderItem= {({item}) => <Posteo data = {item}/>}
             />

            </View>
        )
    }
}

export default Search

const styles =StyleSheet.create({
    container: {
        felx: 1,
        backgroundColor: 'white',
    }
})
