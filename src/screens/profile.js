import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      
    }
  }
  render(){
    console.log(this.props.userData);
    return(
      <View style={styles.container}>
        <Text>Profile</Text>
        <Text>email: {this.props.userData.email}</Text>
        
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:10,
  },
  formContainer:{
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    padding:10,
  },
  field:{
    borderColor: '#444',
    borderWidth:1,
    borderStyle: 'solid',
    height: 20,
    paddingHorizontal: 20,
    paddingVertical:10
  },
  image:{
    height: 250,
  },
  touchable:{
    backgroundColor: '#ccc',
    borderRadius:4,
    marginVertical:10,
  }
})

export default Profile;