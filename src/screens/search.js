import React, { Component } from 'react';
<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> 9c6dd0bf0f3db014f267713ce2e10263002e1376
import {View, Button, Text, TextInput, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {auth, db} from '../firebase/config';
import Post from '../components/Post';


class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            posteos: [],
            search:'',
        };
    }

    componentDidUpdate(){
        this.todosLosPosteos();
    }

    todosLosPosteos(){
        db.collection ('posts'). where ('owner', '==', this.state.search).onSnapshot(
          docs => {
              let posts = [];
              docs.forEach( doc =>{
                  posts.push({
                      id:doc.id,
                      data:doc.data()
                  })
                  this.setState({
                      posteos: posts,
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
               />
            <FlatList
                data={this.state.posteos}
                keyExtractor={post => post.id}
                renderItem={({item}) => <Post postData={item} />}
            />
            </View>
        )
    }
}


const styles =StyleSheet.create({
    container: {
        felx: 1,
        backgroundColor: 'white',
    }
})

export default Search
