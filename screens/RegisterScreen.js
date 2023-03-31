import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [imageURL, setImageURL] = useState('');
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateProfile(user, {
                displayName: name,
                photoURL: imageURL? imageURL: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                }).then(() => {
                // Update successful
                alert('Registered, please login.')
                }).catch((error) => {
                // An error occurred
                // ...
                });  

                // ...
                navigation.popToTop();
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage)
            });
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter your name'
                label="Name"
                leftIcon={{ type: 'material', name: 'badge' }}
                value={name}
                onChangeText={text => setName(text)}
            />
            <Input
                placeholder='Enter your email'
                label="Email"
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder='Enter your password'
                label="Password"
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Input
                placeholder='Enter your image Url'
                label="Profile Picture"
                leftIcon={{ type: 'material', name: 'face' }}
                value={imageURL}
                onChangeText={text => setImageURL(text)}
            />
            <Button title="register" style={styles.button} onPress={register}/>
        </View>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    }
})

// const user = firebase.auth().currentUser;
