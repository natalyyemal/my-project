import React, { Component } from "react";
import {Text,View,StyleSheet,TouchableOpacity,Modal,TextInput,Image} from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      myLike: false,
      showModal: false, //Para la vista del modal
      comment: "", //para limpiar el campo después de enviar.
    };
  }
  componentDidMount() {
    if (this.props.postData.data.likes) {
      this.setState({
        likes: this.props.postData.data.likes.length,
        myLike: this.props.postData.data.likes.includes(auth.currentUser.email),
      });
    }
  }

  darLike() {
    //Agregar mi usuario a un array de usuario que likearon.
    //Updatear el registro (documento)
    db.collection("posts")
      .doc(this.props.postData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        this.setState({
          likes: this.props.postData.data.likes.length,
          //likes:this.state.likes + 1, //Opción más rápida de respuesta
          myLike: true,
        });
      });
  }
  quitarLike() {
    db.collection("posts")
      .doc(this.props.postData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() => {
        this.setState({
          likes: this.props.postData.data.likes.length,
          myLike: false,
        });
      });
  }
  showModal() {
    this.setState({
      showModal: true,
    });
  }

  hideModal() {
    this.setState({
      showModal: false,
    });
  }

  guardarComentario() {
    console.log("Guardando comentario...");
    let oneComment = {
      createdAt: Date.now(),
      author: auth.currentUser.email,
      comment: this.state.comment,
    };
    db.collection("posts")
      .doc(this.props.postData.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(oneComment),
      })
      .then(() => {
        this.setState({
          showModal: false,
          comment: "",
        });
      });
  }
  deletePost() {
    let borrar = confirm("Se va a borrar tu posteo")
    if(borrar){
      db.collection("posts").doc(this.props.postData.id).delete()
      .then(() => {
          console.log("eliminado");
      })
    }
  }


  render() {
    console.log(this.props.postData);
    return (
      <View style={styles.contanier}>

        <Text style={styles.textoPost}>Usuario: {this.props.postData.data.owner} </Text>    
        <Image
          source={{ uri: this.props.postData.data.photo }}
          style={styles.image}
        />
        <Text style={styles.textoPost}>Texto del post: {this.props.postData.data.texto}</Text>
        
        <Text style={styles.textoPost}>Likes: {this.state.likes} </Text>
        {/* Cambio de botones me gusta/ me dejó de gustar */}
        {this.state.myLike == false ? (
          <TouchableOpacity onPress={() => this.darLike()}>
            <Text style={styles.textoPost}>Me gusta</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.quitarLike()}>
            <Text style={styles.textoPost}>Quitar like</Text>
          </TouchableOpacity>
        )}
        
        {/* Ver modal */}
        {this.props.postData.data.comments ? 
          <TouchableOpacity onPress={() => this.showModal()}>
            <Text style={styles.textoPost}>Clickea para ver los {this.props.postData.data.comments.length} comentarios</Text>
          </TouchableOpacity> 
          :
          <TouchableOpacity onPress={() => this.showModal()}>
            <Text style={styles.textoPost}>Clickea para comentar</Text>
          </TouchableOpacity> 
        }
        

        {/* borrar  */}

        {this.props.postData.data.owner == auth.currentUser.email ? (
                <TouchableOpacity style={styles.touchable} 
                    onPress={(id)=>this.deletePost(this.props.postData.id)}>
                    <Text> Eliminar post </Text>
                </TouchableOpacity>
                ):
                    null
        }

        {/* Modal para comentarios */}
        {this.state.showModal ? (
          <Modal
            style={styles.modalContainer}
            visible={this.state.showModal}
            animationType="slide"
            transparent={false}
          >
            <TouchableOpacity onPress={() => this.hideModal()}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>

{this.props.postData.data.comments ?
        <FlatList
              data={this.props.postData.data.comments}
              keyExtractor={(comment) => comment.createdAt.toString()}
              renderItem={({ item }) => (
                <Text>
                  {item.author}: {item.comment}
                </Text>
              )}
            />
      :
    <Text>Aún no hay comentarios. Sé el primero en opinar.</Text>
}
            
            {/* Formulario para nuevo comentarios */}
            <View>
              <TextInput
                style={styles.input}
                placeholder="Comentar..."
                keyboardType="default"
                multiline
                onChangeText={(text) => this.setState({ comment: text })}
                value={this.state.comment}
              />
              <TouchableOpacity
                disabled={this.state.comment ? false: true}
                style={styles.button}
                onPress={() => {
                  this.guardarComentario();
                }}
              >
                <Text style={styles.textButton}>Guadar comentario</Text>
              </TouchableOpacity>

              
                
                  
            </View>
          </Modal>
        ) : (
          <Text></Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contanier: {
    marginBottom: 20,
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    backgroundColor:`#d3d3d3`,
  },
  modalContainer: {
    width: "97%",
    borderRadius: 4,
    padding: 5,
    // backgroundColor:`#696969`,
    // backgroundColor: "#fff",
    // backgroundColor:`#f8f8ff`,
    backgroundColor:`#d3d3d3`,
    justifyContent: "center",
    alignSelf: "center",
    boxShadow: "rgb(204 204 204 ) 0px 0px 9px 7px #ccc",
    marginTop: 20,
    marginBottom: 10,
  },
  closeButton: {
    color: "#fff",
    padding: 5,
    backgroundColor: "#dc3545",
    alignSelf: "flex-end",
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#28a745",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#28a745",
  },
  touchable: {
    padding: 10,
    backgroundColor: "#dc3545",
    marginTop: 30,
    borderRadius: 4,
  },
  textButton: {
    color: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 7,
    marginBottom: 10,
  },
  textoPost: {
    color: `#000000`,
    padding: "1%",
  },
});

export default Post;
