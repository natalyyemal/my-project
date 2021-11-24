import React, { Component } from "react";
import {Text, TouchableOpacity,View,StyleSheet,Image,ActivityIndicator,FlatList,TextInput} from "react-native";
import { db, auth } from "../firebase/config";
import Post from "../components/Post";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
    };
  }
  componentDidMount() {
    console.log("En didMount de Profile");
    db.collection("posts")
      .where("owner", "==", auth.currentUser.email)
      // .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        console.log(docs);
        //Array para crear datos en formato más útil.
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        console.log(posts);

        this.setState({
          posteos: posts,
        });
      });
  }


  render() {
    console.log(this.state.posteos);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Bienvenid@ a tu perfil {this.props.userData.displayName} </Text>
        {/* <Text>Tenes {this.state.posteos.length} Cantidad de posteos hechos:</Text> */}

        {this.state.posteos.length > 0 ? (
          <View style={styles.ContainerGallery}>
            <FlatList
              numColumns={2}
              horizontal={false}
              data={this.state.posteos}
              // la prop render item va a estar pasando un objeto literal con 3 propiedades.

              keyExtractor={(post) => post.id}
              renderItem={({ item }) => (
                <View style={styles.profilePost}>
                  <Post postData={item} />

                  {/* <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => this.borrarPost()}
                  >
                    <Text style={styles.touchableText}>Eliminar post</Text>
                  </TouchableOpacity> */}
                  {/* <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => this.borrarPost()}
                    > 
                <Text style={styles.touchableText}>Eliminar post</Text>
                  </TouchableOpacity> */}

                </View>
              )}
              
            />
          </View>
        ) : (
          <Text>Tenes {this.state.posteos.length} posteos hechos:</Text>
        )}
      <View style={styles.infoPersona}>
        <Text style={styles.element}>Email: {auth.currentUser.email}</Text>
        <Text style={styles.element}>Usuario creado el: {this.props.userData.metadata.creationTime}</Text>
        <Text style={styles.element}>Último login: {this.props.userData.metadata.lastSignInTime}</Text>

        <TouchableOpacity
          style={styles.touchable}
          onPress={() => this.props.logout()}
        >
          <Text style={styles.touchableText}>Logout</Text>
        </TouchableOpacity>

      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  ContainerGallery: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  profilePost:{
    width: '49%',
    // alignItems: "c"
    paddingLeft: '0.5%',
    paddingRight: '0.5%',
  },
  welcome: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
  },
  element: {
    marginBottom: 10,
    // fontWeight: 'bold',
    // textDecorationLine: 'underline',
  },
  touchable: {
    padding: 10,
    backgroundColor: "#dc3545",
    marginTop: 20,
    borderRadius: 4,
  },
  touchableText: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  image: {
    flex: 1,
    padding: "0%",
    width: "100%",
    numColumns: 3,
  },
  infoPersona: {
    display:"flex", 
    flexDirection: "column",
    // flex: 4,
    justifyContent: "center",
    alignItems:"center",
    paddingBottom: '2%',
    paddingTop: '2%', 
  }
});

export default Profile;
