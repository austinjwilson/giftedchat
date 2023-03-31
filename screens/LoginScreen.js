import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

    } 


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged
            (function (user) {
                if (user) {
                    navigation.replace('Chat');
                } else {
                    navigation.canGoBack() &&
                        navigation.popToTop();
                    // No user is signed in.
                }
            });
        
        return unsubscribe
    }, [])

    return (
        <View style={styles.container}>
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
            <Button title="sign in" style={styles.button} onPress={signIn} />
            <Button title="register" style={styles.button} onPress={() => navigation.navigate('Register')}/>
            {/* <Text>Login Screen</Text> */}
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,
        paddingBottom: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    }
})