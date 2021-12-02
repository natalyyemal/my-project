import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import {storage} from '../firebase/config';

class MyCamera extends Component {

    constructor(props) {
        super(props);
        this.state = {
            permission: false,
            photo: "",
        };
        this.camera; //le avisa al sistema que estas usando esta camara
    }

     componentDidMount(){
        Camera.requestCameraPermissionsAsync()
          .then(() =>{
              this.setState({
                permission: true,
              });
         })
        .catch((err)=> console.log(err));
        

    }   

    takePicture() {
        this.camera.takePictureAsync()
            .then((photo) => {
                console.log(photo);
                this.setState({
                    photo: photo.uri,
                });
            })
            .catch((err) => console.log(err));
    }

    savePhoto() {
        fetch(this.state.photo)
            .then((res) => res.blob())
            .then((image) => {
                const ref = storage.ref(`photos/${Date.now()}.jpg`); //ruta interna de firebase
                ref.put(image).then(() => {
                    ref.getDownloadURL()
                    .then((url) => {
                        this.props.onImageUpload(url)
                        this.setState({
                            photo: "",
                        })
                    });
                });
            })
            .catch((err) => console.log(err));
    }

    cancelPhoto(){
        this.setState({
            photo: ""
        })
    }

render() {
    return (
        <>
            {this.state.photo ? (
                <>
                    <Image
                        style={{ flex: 1, width: "100%" }}
                        source={{ uri: this.state.photo }}
                    />
                    <View>
                        <TouchableOpacity onPress={() => this.savePhoto()}>
                            <Text>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.cancelPhoto()}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                    <>
                        <Camera
                            style={{ flex: 1, width: "100%" }}
                            type={Camera.Constants.Type.front}
                            ref={(cam) => this.camera = cam}
                        />
                        <TouchableOpacity onPress={() => this.takePicture()}>
                            <Text>Shoot</Text>
                        </TouchableOpacity>
                    </>
                )}
        </>
    );
    }
}
const styles = StyleSheet.create({})



export default MyCamera;
