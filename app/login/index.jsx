import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'


export default function LoginScreen() {

  const router = useRouter();


  return (
    <View>
      <View
      style ={{
        display:'stretch',
        alignItems:'center',
        marginTop:40
      }}
      >
        <Image source = {require ('../../assets/images/logo.png')}
        
        style={ 

          styles.image

        }
        />

      </View>
    <View

      style={{
        padding: 25,
        backgroundColor: Colors.PRIMARY,
        height: '100%'

      }}


    >

      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          fontColor: 'white',
          textAlign: 'center'

        }}
      > Stay On Track, Stay Healthy.</Text>

      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 17,
          marginTop: 20
        }}

      > Track your medicine, Take control of your Health. Stay Consistent, stay confident
      </Text>

          <TouchableOpacity
          style={styles.button}
          onPress={()=>router.push('login/signIn')}
          >

          <Text
          style={{
            textAlign:'center',
            fontSize:16,
            color:Colors.PRIMARY
          }}
          > Continue</Text>
          </TouchableOpacity>

          <Text 
          style={{
            color:'white',
            marginTop:4
          }}>
              Note : By clicking continue button, you will agree to our terms and conditions
          </Text>

    </View>

    </View>
  )
}

const styles = StyleSheet.create({


      image:{
        width:500,
        height:450,
        borderRadius:23
      },
      button:{
        padding:15,
        backgroundColor:'white',
        borderRadius:99,
        marginTop:25

      }
})

