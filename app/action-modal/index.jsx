import { View, Text, StyleSheet,Image, Touchable, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '../../constant/Colors';
import MedicationCardItem from '../../components/MedicationCardItem';

import AntDesign from '@expo/vector-icons/AntDesign';
import { arrayUnion, doc,updateDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import moment from 'moment';

export default function MedicationActionModal() {
  const medicine = useLocalSearchParams();
  const router = useRouter();

  const UpdateActionStatus = async (status)=>{

    try{

      const docRef =doc(db,'medication',medicine?.docId);

      await updateDoc(docRef,{
        action:arrayUnion({
        status:status,
        time:moment().format('LT'),
        date:medicine?.selectedDate
      })

    });

    Alert.alert(status,'Response Saved',[
    {
      text:'OK',
      onPress:()=>router.replace('(tabs)')
    }
    ])

    }catch(e){
      console.log(e)

    }

  }
  console.log(medicine);
  return (
    <View style={styles.container}>
     <Image source={require('../../assets/images/notification.gif')}

     style={{
      width:120,
      height:120
     }}
     
     />

     <Text style={{
      fontSize:18
     }}>{medicine?.selectedDate}</Text>

<Text style={{
      fontSize:40,
      fontWeight:'bold',
      color:Colors.PRIMARY

     }}>{medicine?.reminder}</Text>


     <Text style={{
      fontSize:18
     }}> Its Time to Take </Text>


     <MedicationCardItem medicine={medicine} />

     <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.closeButton}
        onPress={()=>UpdateActionStatus('Missed')}
        >
          <Text style={{
            fontSize:20,
            color:'red'
          }}> Missed</Text>

          <AntDesign name="closecircleo" size={24} color="red" />
        </TouchableOpacity>


        <TouchableOpacity style={styles.successButton}
          onPress={()=>UpdateActionStatus('Taken')}
          >
          <Text style={{
            fontSize:20,
            color:'white'
          }}> Taken </Text>

          <AntDesign name="checkcircleo" size={24} color="white" />
        </TouchableOpacity>

     </View>
     <TouchableOpacity style={{
      position:'absolute',
      bottom:25
     }}

     onPress={()=>router.back()}
     >
     <AntDesign name="closesquareo" size={44} color={Colors.GRAY} />
     </TouchableOpacity>

    </View>
  )
}

const styles =StyleSheet.create({

  container:{
    padding:25,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    height:'100%'
  },
  closeButton:{
    padding:10,
    flexDirection:'row',
    gap:6,
    borderWidth:1,
    alignItems:'center',
    borderColor:'red',
    borderRadius:10
  },

  successButton:{

    padding:10,
    flexDirection:'row',
    gap:6,
    backgroundColor:Colors.GREEN,
    alignItems:'center',
    borderRadius:10

  },

  buttonContainer:{

    flexDirection:'row',
    gap:10,
    marginTop:25
  }
  
})