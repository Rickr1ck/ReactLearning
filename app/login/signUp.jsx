import { View, Text,StyleSheet,TextInput,TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'
import { auth } from '../../config/FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getLocalStorage,setLocalStorage } from '../../service/Storage';


export default function SignUp() {

    const router =useRouter();
   

    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [userName,setUserName]=useState();
    const OnCreateAccount=()=>{

        if(!email || !password ||!userName)
        {
            ToastAndroid.show('Please Fill all details', ToastAndroid.BOTTOM)
            return;
        }

        
    createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // Signed up 
    const user = userCredential.user;
    await updateProfile(user,{
        displayName:userName
    })
   await setLocalStorage('userDetail',user);
    console.log(user);
    router.push('(tabs)')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    if(errorCode=='auth/email-already-in-use'){
        ToastAndroid.show('Email already exist',ToastAndroid.BOTTOM)
    }
    // ..
  });

    }
  return (
    <View
               style={{
                   padding: 25
               }}>
               <Text
                   style={styles.textHeader}
               >Create New Account</Text>
            
               <View
                   style={{
                       marginTop: 25
                   }}
               >
                   <Text>Full Name</Text>
                   <TextInput
                       style={styles.textInput}
                       placeholder='Enter Full Name'
                       onChangeText={(value)=>setUserName(value)}
                   />
               </View>

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
               onPress={OnCreateAccount}
               >
                   <Text
                   style={{
                       fontSize:17,
                       color:'white',
                       textAlign:'center'
                   }}
                   >Create Account</Text>
               </TouchableOpacity>
   
   
               <TouchableOpacity
               style={styles.buttonCreate}
               onPress={()=>router.push('login/signIn')}
               >
                   <Text
                   style={{
                       fontSize:17,
                       color:Colors.PRIMARY,
                       textAlign:'center'
                   }}
                   >Already Have Account? | Sign in</Text>
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
    button:{
        padding:15,
        backgroundColor:Colors.PRIMARY,
        borderRadius:10,
        marginTop:35
    },

    buttonCreate:{
        padding:15,
        backgroundColor:'white',
        borderRadius:10,
        marginTop:35,
        borderWidth:1,
        borderColor:Colors.PRIMARY
    }

})