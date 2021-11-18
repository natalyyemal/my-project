import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import {db, auth } from '../firebase/config';
import Post from '../components/Post';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos: [],
    }
  }
  componentDidMount(){
    console.log('En didMount de Profile');
    db.collection('posts')
    .where('owner', '==', auth.currentUser.email)
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      docs => {
        console.log(docs);
        //Array para crear datos en formato más útil.
        let posts = [];
        docs.forEach( doc => {
          posts.push({
            id: doc.id,   
            data: doc.data(),
          })
        })
        console.log(posts);

        this.setState({
          posteos: posts,
        })
      }
    )
  }
  render(){
    console.log(this.state.posteos);
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}> Bienvenido: {this.props.userData.displayName}</Text>
        <Text>Tenes {this.state.posteos.length} posteos hechos</Text>
        
       
        <FlatList style={styles.image}
          numColumns={2}
          horizontal={false}
          data= { this.state.posteos }
          keyExtractor = { post => post.id}
          renderItem = { ({item}) => <Post postData={item} />}
          // la prop render item va a estar pasando un objeto literal con 3 propiedades. 
        />
        <Text style={styles.element}> Usuario creado el: {this.props.userData.metadata.creationTime}</Text>
          <Text style={styles.element}> Último login: {this.props.userData.metadata.lastSignInTime}</Text>
          <TouchableOpacity style={styles.touchable} onPress={()=>this.props.logout()}>
            <Text style={styles.touchableText}>Logout</Text> 
          </TouchableOpacity>
      </View>       
    )
  }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      marginTop: 40,
    },

    welcome:{
        fontSize:18,
        marginTop:20,
        marginBottom:30,
        fontWeight: 'bold'
    },
    element:{
        marginBottom:10,
    },
    touchable:{
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop: 30,
        borderRadius: 4,
    },
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    },
    image:{
      flex: 1,
      padding: '0%',
      width: '100%',
      numColumns:3,

    }
    
});

export default Profile;