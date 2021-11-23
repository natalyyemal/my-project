import React, { Component } from 'react';
import {View, Button, Text, TextInput, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {auth, db} from '../firebase/config';
import Post from '../components/Post';


class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            posteos: [],
            search:'',
            buscando: false,
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
                      buscando: true,
                  })
              })
          }  
        )
    }

    render(){
        return(

            <View style={styles.formContainer}>
                <TextInput style={styles.textInput}
                onChangeText={(text) => this.setState({search: text})}
                placeholder="buscar"
                keyboeardType="default"
                
               />

            { this.state.buscando ? (
                // NO ME ANDA
                this.state.posteos.length === 0 ? (
                  <Text style={styles.info}>No hay resultados, sigue buscando para un email existente</Text>
                ) : (
                    <Text style={styles.info}>Resultados para tu búsqueda: </Text>
                  )
              ) : (
                  null
                )
            }

        
            <FlatList
                data={this.state.posteos}
                keyExtractor={post => post.id}
                renderItem={({item}) => <Post postData={item} />}
            />


         
            </View>
        )
    }
}


const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: 'white',
    // },
    formContainer: {
        height: '100px',
        marginTop: 30,
        marginBottom: 30,
        flex: 1,
        // flexDirection: "row",
        width: "200px%",
        paddingHorizontal:10,
        marginTop: 20,
      },
    textInput:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    info:{
    fontWeight: 'bold',
    display:"flex", 
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    paddingBottom: '2%',
    paddingTop: '2%',
    },
})

export default Search
