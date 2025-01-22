import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'
import { auth } from '../../config/FirebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth"
import { getLocalStorage,setLocalStorage } from '../../service/Storage';

export default function SignIn() {

    const router = useRouter();
    const [email,setEmail]=useState();
    const [password,setPassword]= useState();

    const onSignInClick = () => {

        if(!email ||!password){
         ToastAndroid.show('Please Fill all details', ToastAndroid.BOTTOM)
         return;  
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);

               await setLocalStorage('userDetail',user);

                router.replace('(tabs)')


                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode=='auth/invalid-credential'){
                    ToastAndroid.show('Invalid email or password', ToastAndroid.BOTTOM)
                }
            });

    }
    return (
        <View
            style={{
                padding: 25
            }}>
            <Text
                style={styles.textHeader}
            >Let's Sign you in</Text>
            <Text
                style={styles.subText}
            >Welcome Back</Text>
            <Text
                style={styles.subText}
            >You've been missed!</Text>

            <View
                style={{
                    marginTop: 25
                }}
            >
                <Text>Email</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Enter Email'
                    onChangeText={(value)=>setEmail(value)}
                />
            </View>
            <View
                style={{
                    marginTop: 25
                }}
            >
                <Text>Password</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Enter Password'
                    secureTextEntry={true}
                    onChangeText={(value)=>setPassword(value)}
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={onSignInClick}
            >
                <Text
                    style={{
                        fontSize: 17,
                        color: 'white',
                        textAlign: 'center'
                    }}
                >Login</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.buttonCreate}
                onPress={() => router.push('login/signUp')}
            >
                <Text
                    style={{
                        fontSize: 17,
                        color: Colors.PRIMARY,
                        textAlign: 'center'
                    }}
                >Sign Up</Text>
            </TouchableOpacity>


        </View>


    )
}

const styles = StyleSheet.create({

    textHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 15
    },
    subText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        color: Colors.GRAY

    },
    textInput: {

        padding: 10,
        borderWidth: 1,
        fontSize: 17,
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: 'white'
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        marginTop: 35
    },

    buttonCreate: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 35,
        borderWidth: 1,
        borderColor: Colors.PRIMARY
    }

})