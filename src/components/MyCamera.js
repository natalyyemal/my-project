import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'

class MyCamera extends Component {

    constructor(props) {
        super(props)
        this.state = {
            permission: false,
            photo: "",
        }
        this.camera;
    }

    takePicture() {
        //cuando se ejecuta este metodo devuelve una promesa
        this.camera.takePictureAsync()
            .then((photo) => {
                console.log(photo);
                this.setState({
                    //uri es donde se almacena la foto, nosotros no lo vemos

                    photo: photo.uri,
                });
            })
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <>
                <Camera
                    style={{ flex: 1, width: "100%" }}
                    type={Camera.Constants.Type.front}
                    ref={(cam) => (this.camera = cam)}
                />
                <TouchableOpacity onPress={() => this.takePicture()}>
                    <Text>Shoot</Text>
                </TouchableOpacity>
            </>
        );
    }
}

const styles = StyleSheet.create({})



export default MyCamera;
