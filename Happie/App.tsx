import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

// Course Types
type CourseType = 'Starter' | 'Mains' | 'Desserts';

type MenuItem = {
  id: number;
  name: string;
  description: string;
  course: CourseType;
  price: number;
  pairing?: string;
};

// Bottom Navigation Screens
type ScreenType = 'home' | 'add' | 'menu';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  // Add Menu Form
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    course: 'Starter' as CourseType,
    price: '',
    pairing: ''
  });

  // Add Menu Item
  const addMenuItem = () => {
    if (!newItem.name || !newItem.price) {
      Alert.alert('Error', 'Please fill in name and price');
      return;
    }
    const item: MenuItem = {
      id: Date.now(),
      name: newItem.name,
      description: newItem.description,
      course: newItem.course,
      price: parseFloat(newItem.price),
      pairing: newItem.pairing
    };
    setMenuItems([...menuItems, item]);
    setNewItem({ name: '', description: '', course: 'Starter', price: '', pairing: '' });
    Alert.alert('Success', 'Menu item added successfully!');
  };

  // Delete Menu Item
  const deleteMenuItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  // Different Screens
  const renderHome = () => (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome Chef!</Text>
      <Text style={{ textAlign: 'center', marginTop: 10 }}>Add your menu items to get started</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCurrentScreen('add')}
      >
        <Text style={styles.buttonText}>Add Menu Item</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAddMenu = () => (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Add Menu Item</Text>
      
      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={styles.input}
        value={newItem.name}
        onChangeText={text => setNewItem({ ...newItem, name: text })}
        placeholder="Dish name"
      />

      <Text style={styles.label}>Course</Text>
      <View style={styles.dropdown}>
        {(['Starter', 'Mains', 'Desserts'] as CourseType[]).map(course => (
          <TouchableOpacity
            key={course}
            style={[styles.dropdownItem, newItem.course === course && styles.dropdownItemSelected]}
            onPress={() => setNewItem({ ...newItem, course })}
          >
            <Text>{course}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={newItem.description}
        onChangeText={text => setNewItem({ ...newItem, description: text })}
        placeholder="Description"
        multiline
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={newItem.price}
        onChangeText={text => setNewItem({ ...newItem, price: text })}
        placeholder="Price"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Pairing (Optional)</Text>
      <TextInput
        style={styles.input}
        value={newItem.pairing}
        onChangeText={text => setNewItem({ ...newItem, pairing: text })}
        placeholder="Suggested pairing"
      />

      <TouchableOpacity style={styles.button} onPress={addMenuItem}>
        <Text style={styles.buttonText}>Save Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderMenu = () => {
    const courses: CourseType[] = ['Starter', 'Mains', 'Desserts'];
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 20 }}>
        <Text style={styles.title}>Menu</Text>
        {courses.map(course => (
          <View key={course} style={styles.courseSection}>
            <Text style={styles.courseTitle}>{course}</Text>
            {menuItems.filter(item => item.course === course).length === 0 && (
              <Text style={{ fontStyle: 'italic', color: 'gray' }}>No items yet</Text>
            )}
            {menuItems.filter(item => item.course === course).map(item => (
              <View key={item.id} style={styles.menuItem}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.name} - R{item.price.toFixed(2)}</Text>
                  <TouchableOpacity onPress={() => deleteMenuItem(item.id)}>
                    <Feather name="trash-2" size={20} color="red" />
                  </TouchableOpacity>
                </View>
                {item.description ? <Text>{item.description}</Text> : null}
                {item.pairing ? <Text style={{ fontStyle: 'italic', color: 'gray' }}>Paired with: {item.pairing}</Text> : null}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    );
  };

  // Render current screen
  let content;
  switch (currentScreen) {
    case 'home': content = renderHome(); break;
    case 'add': content = renderAddMenu(); break;
    case 'menu': content = renderMenu(); break;
  }
//Go back
  return (
    <View style={styles.container}>
      {content}
      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.navItem}>
          <Ionicons name="home-outline" size={22} color={currentScreen === 'home' ? '#3d944e' : 'gray'} />
          <Text style={[styles.navLabel, currentScreen === 'home' && { color: '#3d944e' }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentScreen('add')} style={styles.navItem}>
          <Feather name="plus-circle" size={22} color={currentScreen === 'add' ? '#3d944e' : 'gray'} />
          <Text style={[styles.navLabel, currentScreen === 'add' && { color: '#3d944e' }]}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentScreen('menu')} style={styles.navItem}>
          <Ionicons name="menu-outline" size={22} color={currentScreen === 'menu' ? '#3d944e' : 'gray'} />
          <Text style={[styles.navLabel, currentScreen === 'menu' && { color: '#3d944e' }]}>Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  screen: { 
  flex: 1,                // changed from flexGrow
  padding: 20,
  justifyContent: 'flex-start' // ensures items start from top
},
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15 },
  label: { marginBottom: 5, fontWeight: '600' },
  button: { backgroundColor: '#3d944e', padding: 15, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderColor: '#ccc', paddingVertical: 10 },
  navItem: { alignItems: 'center' },
  navLabel: { fontSize: 12, color: 'gray', marginTop: 3 },
  courseSection: { marginBottom: 20 },
  courseTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 5 },
  menuItem: { backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8, marginBottom: 10 },

  // course dropdown situation
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dropdownItem: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 5,
    alignItems: 'center',
  },
  dropdownItemSelected: {
    backgroundColor: '#3d944e33',
    borderColor: '#3d944e',
  },
});
const isDarkMode = true; // or from state

const backgroundColor = isDarkMode ? '#1e1e1e' : '#fff';
const textColor = isDarkMode ? '#fff' : '#000';

<View style={{ flex: 1, backgroundColor }}>
  <Text style={{ color: textColor }}>Hello</Text>
</View>

