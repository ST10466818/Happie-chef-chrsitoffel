import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput,Image} from 'react-native';

// Main App Component

export default function App() {
  // tracks which screen to show
  const [currentScreen, setCurrentScreen] = useState('home');
  
  // stores menu items
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Brie & Thyme Koevertjies',
      description: 'creamy brie phyllo parcels glazed with honey and thyme, served with biltong shavings and walnuts\nPaired with: Klein Zalze Chardonnay (glass) or Castle Lager (500ml)',
      course: 'Starter',
      price: 95
    },
    {
      id: 2,
      name: 'Boerenkaas & Corn Samoosas (4 pcs)',
      description: 'Golden, crispy pastry pockets filled with creamy boerenkaas and sweet corn, served with a tangy tomato relish for dipping.\nPaired with: Durbanville Hills Sauvignon Blanc (glass) or Jack Black Pale Ale (340ml)',
      course: 'Starter',
      price: 85
    }
  ]);