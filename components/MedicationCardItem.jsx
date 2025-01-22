import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MedicationCardItem({ medicine, selectedDate = '' }) {
  const [status, setStatus] = useState();

  useEffect(() => {
    console.log('Medicine Object:', medicine); // Debugging the medicine object
    CheckStatus();
  }, [medicine]);

  const CheckStatus = () => {
    // Ensure that 'action' is an array before trying to access it
    const actions = Array.isArray(medicine?.action) ? medicine?.action : [];
    const data = actions.find((item) => item.date === selectedDate) || null;
    console.log('Status data:', data);
    setStatus(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: medicine?.type?.icon }}
            style={{
              width: 60,
              height: 60,
            }}
          />
        </View>

        <View>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{medicine?.name || 'No name'}</Text>
          <Text style={{ fontSize: 17 }}>{medicine?.when || 'No time specified'}</Text>
          <Text style={{ color: Colors.GRAY }}>
            {medicine?.dose} {medicine?.type?.name}
          </Text>
        </View>
      </View>

      <View style={styles.reminderContainer}>
        <Text>
          <Ionicons name="timer-outline" size={24} color="black" />
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{medicine?.reminder || 'No reminder'}</Text>
      </View>

      {status?.date && (
        <View style={styles.statusContainer}>
          {status?.status === 'Taken' ? (
            <Ionicons name="checkmark-circle-sharp" size={24} color={Colors.GREEN} />
          ) : status?.status === 'Missed' ? (
            <Ionicons name="close-circle-sharp" size={24} color="red" />
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    backgroundColor: Colors.LIGHT_PRIMARY,
    marginTop: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },

  imageContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 15,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderContainer: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
  },
  statusContainer: {
    position: 'absolute',
    top: 5,
    padding: 7,
  },
});
