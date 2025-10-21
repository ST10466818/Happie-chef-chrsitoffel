import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  // tracks which screen to show
  const [currentScreen, setCurrentScreen] = useState('home');

  // stores menu items
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Brie & Thyme Koevertjies (4 pcs)',
      course: 'Starter',
      price: 95,
      description: 'creamy brie phyllo parcels glazed with honey and thyme, served with biltong shavings and walnuts.',
      pairing: 'Klein Zalze Chardonnay (glass) or Castle Lager (500ml)',
    },
    {
      id: 2,
      name: 'Boerenkaas & Corn Samoosas (4 pcs)',
      course: 'Starter',
      price: 85,
      description: 'Golden, crispy pastry pockets filled with creamy boerenkaas and sweet corn, served with a tangy tomato relish for dipping.',    
      pairing: 'Durbanville Hills Sauvignon Blanc (glass) or Jack Black Pale Ale (340ml)',
    },
    {
      id: 3,
      name: 'Butternut & Spinach Lasagna',
      course: 'Mains',
      price: 160,
      description: 'Layers of roasted butternut, spinach, ricotta, and herbed tomato sauce.',
      pairing: 'Glen Carlou Merlot (glass)'
    },
    {
      id: 4,
      name: 'Cape Malay Curry',
      course: 'Mains',
      price: 180,
      description: 'A fragrant, mild chicken curry served with basmati rice, sambals, and roti.',
      pairing: 'Waterford Rose-Mary (glass)'
    },
    { 
      id: 5,
      name: 'Peppermint Dom Pedro',
      course: 'Desserts',
      price: 90,
      description: 'A creamy cocktail blended with peppermint liquor and Amarula.',
      pairing: 'A festive finish to your meal.'
    },
    { 
      id: 6,
      name: 'Milk Tart Cheesecake',
      course: 'Desserts',
      price: 90,
      description: 'A fusion of creamy cheesecake and traditional South African milk tart, dusted with cinnamon.',
      pairing: 'Hot coffee or rooibos tea'
    },
  ]);

  // Add Menu form
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    course: 'Starter',
    price: '',
    pairing: ''
  });

  // Function to add a new menu item
  const addMenuItem = () => {
    if (newItem.name && newItem.price) {
      const item = {
        id: menuItems.length + 1,
        name: newItem.name,
        description: newItem.description,
        course: newItem.course,
        price: parseFloat(newItem.price),
        pairing: newItem.pairing
      };
      setMenuItems([...menuItems, item]);
      // Reset form
      setNewItem({ name: '', description: '', course: 'Starter', price: '', pairing: '' });
      alert('Menu item added successfully!');
    } else {
      alert('Please fill in name and price');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>Current screen: {currentScreen}</Text>
      <Text>Menu items: {menuItems.length}</Text>
      <StatusBar style="auto" />
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
