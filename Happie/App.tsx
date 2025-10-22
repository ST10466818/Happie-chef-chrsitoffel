import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

type CourseType = 'Starter' | 'Mains' | 'Desserts';

type MenuItem = {
  id: number;
  name: string;
  description: string;
  course: CourseType;
  price: number;
  pairing?: string;
};

type ScreenType = 'home' | 'add' | 'menu';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    description: '',
    course: 'Starter',
    price: 0,
    pairing: '',
  });

  const addMenuItem = () => {
    if (!newItem.name || newItem.price <= 0) {
      Alert.alert('Error', 'Please fill in name and price');
      return;
    }
    const item: MenuItem = { id: Date.now(), ...newItem };
    setMenuItems([...menuItems, item]);
    setNewItem({ name: '', description: '', course: 'Starter', price: 0, pairing: '' });
    Alert.alert('Success', 'Menu item added successfully!');
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const renderHome = () => (
    <View style={[styles.screen, darkMode && styles.darkScreen]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>Welcome Chef!</Text>
      <Text style={[styles.subtitle, darkMode && styles.darkText]}>Add your menu items to get started</Text>
      <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('add')}>
        <Text style={styles.buttonText}>Add Menu Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => setDarkMode(!darkMode)}>
        <Text style={styles.buttonText}>{darkMode ? 'Light Mode' : 'Dark Mode'}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAddMenu = () => (
    <ScrollView contentContainerStyle={[styles.screen, darkMode && styles.darkScreen]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>Add Menu Item</Text>

      <Text style={[styles.label, darkMode && styles.darkText]}>Dish Name</Text>
      <TextInput
        style={[styles.input, darkMode && styles.darkInput]}
        value={newItem.name}
        onChangeText={text => setNewItem({ ...newItem, name: text })}
        placeholder="Dish name"
        placeholderTextColor={darkMode ? '#ccc' : '#999'}
      />

      <Text style={[styles.label, darkMode && styles.darkText]}>Course</Text>
      <View style={styles.dropdown}>
        {(['Starter', 'Mains', 'Desserts'] as CourseType[]).map(course => (
          <TouchableOpacity
            key={course}
            style={[
              styles.dropdownItem,
              darkMode && styles.darkDropdownItem,
              newItem.course === course && styles.dropdownItemSelected,
            ]}
            onPress={() => setNewItem({ ...newItem, course })}
          >
            <Text style={darkMode ? { color: '#fff' } : {}}>{course}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.label, darkMode && styles.darkText]}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }, darkMode && styles.darkInput]}
        value={newItem.description}
        onChangeText={text => setNewItem({ ...newItem, description: text })}
        placeholder="Description"
        multiline
        placeholderTextColor={darkMode ? '#ccc' : '#999'}
      />

      <Text style={[styles.label, darkMode && styles.darkText]}>Price</Text>
      <TextInput
        style={[styles.input, darkMode && styles.darkInput]}
        value={newItem.price.toString()}
        onChangeText={text => setNewItem({ ...newItem, price: parseFloat(text) || 0 })}
        placeholder="Price"
        keyboardType="numeric"
        placeholderTextColor={darkMode ? '#ccc' : '#999'}
      />

      <Text style={[styles.label, darkMode && styles.darkText]}>Pairing (Optional)</Text>
      <TextInput
        style={[styles.input, darkMode && styles.darkInput]}
        value={newItem.pairing}
        onChangeText={text => setNewItem({ ...newItem, pairing: text })}
        placeholder="Suggested pairing"
        placeholderTextColor={darkMode ? '#ccc' : '#999'}
      />

      <TouchableOpacity style={styles.button} onPress={addMenuItem}>
        <Text style={styles.buttonText}>Save Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderMenu = () => {
    const courses: CourseType[] = ['Starter', 'Mains', 'Desserts'];
    return (
      <ScrollView contentContainerStyle={[styles.screen, darkMode && styles.darkScreen]}>
        <Text style={[styles.title, darkMode && styles.darkText]}>Menu</Text>
        {courses.map(course => (
          <View key={course} style={styles.courseSection}>
            <Text style={[styles.courseTitle, darkMode && styles.darkText]}>{course}</Text>
            {menuItems.filter(item => item.course === course).length === 0 && (
              <Text style={{ fontStyle: 'italic', color: darkMode ? '#ccc' : 'gray' }}>No items yet</Text>
            )}
            {menuItems.filter(item => item.course === course).map(item => (
              <View key={item.id} style={[styles.menuItem, darkMode && styles.darkMenuItem]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#000' }}>
                    {item.name} - R{item.price.toFixed(2)}
                  </Text>
                  <TouchableOpacity onPress={() => deleteMenuItem(item.id)}>
                    <Feather name="trash-2" size={20} color="red" />
                  </TouchableOpacity>
                </View>
                {item.description ? <Text style={{ color: darkMode ? '#ccc' : '#000' }}>{item.description}</Text> : null}
                {item.pairing ? <Text style={{ fontStyle: 'italic', color: darkMode ? '#ccc' : 'gray' }}>Paired with: {item.pairing}</Text> : null}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    );
  };

  let content;
  switch (currentScreen) {
    case 'home': content = renderHome(); break;
    case 'add': content = renderAddMenu(); break;
    case 'menu': content = renderMenu(); break;
  }

  return (
    <View style={styles.container}>
      {content}
      <View style={[styles.navBar, darkMode && styles.darkNavBar]}>
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  screen: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  darkScreen: { backgroundColor: '#222' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#000' },
  subtitle: { textAlign: 'center', marginBottom: 20, color: '#000' },
  darkText: { color: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15, color: '#000' },
  darkInput: { borderColor: '#555', color: '#fff', backgroundColor: '#333' },
  label: { marginBottom: 5, fontWeight: '600', color: '#000' },
  button: { backgroundColor: '#3d944e', padding: 15, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderColor: '#ccc', paddingVertical: 10, backgroundColor: '#fff' },
  darkNavBar: { backgroundColor: '#111', borderColor: '#333' },
  navItem: { alignItems: 'center' },
  navLabel: { fontSize: 12, color: 'gray', marginTop: 3 },
  courseSection: { marginBottom: 20 },
  courseTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 5, color: '#000' },
  menuItem: { backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8, marginBottom: 10 },
  darkMenuItem: { backgroundColor: '#333' },

  //  Dropdown styles
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  dropdownItem: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginRight: 5, alignItems: 'center' },
  darkDropdownItem: { borderColor: '#555', backgroundColor: '#333' },
  dropdownItemSelected: { backgroundColor: '#3d944e33', borderColor: '#3d944e' },
});
