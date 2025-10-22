import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { useFonts, Anton_400Regular } from '@expo-google-fonts/anton';

// Define types
type MenuItem = {
  id: number;
  name: string;
  description: string;
  course: 'Starter' | 'Mains' | 'Desserts';
  price: number;
  pairing?: string;
};

type NewMenuItem = {
  name: string;
  description: string;
  course: 'Starter' | 'Mains' | 'Desserts';
  price: string;
  pairing: string;
};

type ScreenType = 'home' | 'addMenu' | 'filter';

export default function App() {
  // Load the Anton font
  let [fontsLoaded] = useFonts({
    Anton_400Regular,
  });

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // tracks which screen to show
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');

  // stores menu items - STARTING EMPTY so chef can add items
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Add Menu form
  const [newItem, setNewItem] = useState<NewMenuItem>({
    name: '',
    description: '',
    course: 'Starter',
    price: '',
    pairing: ''
  });

  // Function to add a new menu item
    const addMenuItem = (): void => {
      if (newItem.name && newItem.price) {
        const item: MenuItem = {
          id: menuItems.length + 1,
          name: newItem.name,
          description: newItem.description,
          course: newItem.course,
          price: parseFloat(newItem.price),
          pairing: newItem.pairing
        };
        setMenuItems([...menuItems, item]);
        setNewItem({ name: '', description: '', course: 'Starter', price: '', pairing: '' });
        Alert.alert('Success!', 'Menu item added successfully!');
      } else {
        Alert.alert('Error', 'Please fill in name and price');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text>Your app content here</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });