import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { auth, db, firebase } from '../firebase';
import { query, doc, setDoc, collection, addDoc, orderBy } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'

const ChatScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])
    // useLayoutEffect(() => {
    //     const unsubscribe = db.collection('chats').orderBy('createdAt', 'desc').onSnapshot(snapshot =>
    //         setMessages(
    //             snapshot.docs.map(doc => ({ 
    //                 _id: doc.data()._id,
    //                 createdAt: doc.data().createdAt.toDate(),
    //                 text: doc.data().text,
    //                 user: doc.data().user
    //         }))
    //         ))
    //         return unsubscribe;
    //     }, [])
    //     const q = query(db.collection, orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
    //         snapshot.docs.map(doc => ({ 
    //             _id: doc.data()._id,
    //             createdAt: doc.data().createdAt.toDate(),
    //             text: doc.data().text,
    //             user: doc.data().user
    //     })))  
    //     ))
    //     return q;
    // }, [])
    

    //     const unsubscribe = collection(db, 'chats').orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
    //         snapshot.docs.map(doc => ({ 
    //             _id: doc.data()._id,
    //             createdAt: doc.data().createdAt.toDate(),
    //             text: doc.data().text,
    //             user: doc.data().user
    //     }))
    //     ))
    //     return unsubscribe;
    // }, [])
  
    const onSend = useCallback(async (messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user
        } = messages[0]
        // Works but overwrites rather than create a new chat to db.
        // await setDoc(doc(db, 'chats', 'test'), {
        //     _id,
        //     createdAt,
        //     text,
        //     user
        // });

        await addDoc(collection(db, "chats"), {
            _id,
            createdAt,
            text,
            user
        });
        // Doesn't work unhandled rejection promise states isn't a function
        // db.setDoc('chats', 'test').add({
        //     _id,
        //     createdAt,
        //     text,
        //     user
        // })
        // 
        
        // const docRef = await addDoc(collection(db, 'chats', 'newid'), {
        //     _id,
        //     createdAt,
        //     text,
        //     user
        // });

        // console.log(docRef.id);
        // collection(firestore, "chats")
        // addDoc(collection(db, 'chats'), {
        //     _id,
        //     createdAt,
        //     text,
        //     user
        // })
        // console.log(docRef);
    }, [])
  
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri:auth?.currentUser?.photoURL
                        }}
                    />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 30 }} onPress={signOut}>
                    <AntDesign name="logout" size={24} color="black" />
                </TouchableOpacity>
            )
        })

    }, [])

    const signOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('Login')
          }).catch((error) => {
            // An error happened.
          });
          
        
        // Web 9 version
        // const auth = getAuth();
        // signOut(auth).then(() => {
        //   // Sign-out successful.
        // }).catch((error) => {
        //   // An error happened.
        // });

    }
    return (
            <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
              onSend={messages => onSend(messages)}
              user={{
                  _id: 1,
                  name: auth?.currentUser?.displayName,
                  avatar: auth?.currentUser?.photoURL
              }}
            />
        // <View>
        //     <Text>Chat Screen</Text>
        // </View>
    )
}

export default ChatScreen