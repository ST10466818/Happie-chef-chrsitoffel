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
       id: '3',
       name: 'Butternut & Spinach Lasagna',
       course: 'Mains',
       price: 160,
       description: 'Layers of roasted butternut, spinach, ricotta, and herbed tomato sauce.',
       pairing: 'Glen Carlou Merlot (glass)' },
    
    {
       id: '4',
       name: 'Cape Malay Curry',
       course: 'Mains',
       price: 180,
       description: 'A fragrant, mild chicken curry served with basmati rice, sambals, and roti.',
       pairing: 'Waterford Rose-Mary (glass)' },
    
    { 
       id: '5',
       name: 'Peppermint Dom Pedro',
       course: 'Desserts',
       price: 90,
       description: 'A creamy cocktail blended with peppermint liquor and Amarula.',
       pairing: 'A festive finish to your meal.' },
    
    { 
       id: '6',
       name: 'Milk Tart Cheesecake',
       course: 'Desserts',
       price: 90,
       description: 'A fusion of creamy cheesecake and traditional South African milk tart, dusted with cinnamon.',
       pairing: 'Hot coffee or rooibos tea' },
      ]);
  }