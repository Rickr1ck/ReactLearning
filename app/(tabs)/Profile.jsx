import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { getLocalStorage, removeLocalStorage } from '../../service/Storage';
import Colors from '../../constant/Colors';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Menu items
  const Menu = [
    { id: '1', name: 'Add New Medication', icon: 'add-circle-outline', route: '/add-new-medication' },
    { id: '2', name: 'My Medication', icon: 'medkit-outline', route: '/(tabs)' },
    { id: '3', name: 'History', icon: 'time-outline', route: '/History' },
    { id: '4', name: 'Logout', icon: 'log-out-outline' },
  ];

  // Handle menu item clicks
  const onPressMenu = (menu) => {
    if (menu.route) {
      router.push(menu.route);
    } else if (menu.name === 'Logout') {
      handleLogout();
    }
  };

  // Fetch user data from local storage
  const GetUserDetail = async () => {
    try {
      const userInfo = await getLocalStorage('userDetail');
      if (!userInfo) {
        router.replace('/login');
      } else if (typeof userInfo === 'string' && userInfo.startsWith('{')) {
        setUser(JSON.parse(userInfo));
      } else {
        setUser(userInfo); // For already parsed objects
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Logout logic
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await signOut(auth);
              await removeLocalStorage('userDetail');
              router.replace('/login');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  // Load user data on component mount
  useEffect(() => {
    GetUserDetail();
  }, []);

  return (
    <View
      style={{
        padding: 25,
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 30,
        }}
      >
        Profile
      </Text>

      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          marginVertical: 25,
        }}
      >
        <Image
          source={require('../../assets/images/smiley.png')}
          style={{
            width: 80,
            height: 80,
          }}
        />

        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 24,
            marginTop: 6,
            fontWeight: 'bold',
          }}
        >
          {user?.displayName || 'User'}
        </Text>

        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 16,
            color: Colors.GRAY,
          }}
        >
          {user?.email || 'email@example.com'}
        </Text>
      </View>

      <FlatList
        data={Menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)}
            style={{
              marginVertical: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Ionicons
              name={item.icon}
              size={30}
              color={Colors.PRIMARY}
              style={{
                padding: 10,
                backgroundColor: Colors.LIGHT_PRIMARY,
                borderRadius: 10,
              }}
            />

            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 20,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
