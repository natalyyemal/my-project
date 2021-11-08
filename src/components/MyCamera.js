import { Camera } from 'expo-camera';
import React, {Component} from 'react'
import {Text, View, TouchableOpacity} from 'react-native';


class MyCamera extends Component {

    constructor (props){
        super(props);
        this.state={
            permission: false,
            photo: "",
        }
        this.camera;
    }
    takePicture(){
        this.camera.takePictureAsync()
        .then((photo) => {
            console.log (photo)
            this.setState({
                photo: photo.uri,

            })


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
         <TouchableOpacity onPress={()=> this.takePicture()}> 
             <Text> Shoot</Text>
            </TouchableOpacity>
       </>
     );
    }
}


           



export default MyCamera;