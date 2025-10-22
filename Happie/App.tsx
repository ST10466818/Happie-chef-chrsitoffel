import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';

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

  // duplicate removeMenuItem removed — single implementation above retained

// Function to calculate average price by course
  const calculateAverageByCourse = (course: string) => {
    const courseItems = menuItems.filter(item => item.course === course);
    if (courseItems.length === 0) return '0.00';
    const total = courseItems.reduce((sum, item) => sum + item.price, 0);
    return (total / courseItems.length).toFixed(2);
  };

// Function to remove a menu item
const removeMenuItem = (id: number) => {
  setMenuItems(menuItems.filter(item => item.id !== id));
};

// Filter menu items by course
  const [filterCourse, setFilterCourse] = useState('All');
  const getFilteredItems = () => {
    if (filterCourse === 'All') return menuItems;
    return menuItems.filter(item => item.course === filterCourse);
  };

  // continue to screen-based rendering
// HOME SCREEN
  if (currentScreen === 'home') {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>HAPPIE</Text>
            <Text style={styles.subtitle}>BY CHEF CHRISTOFFEL</Text>
            <Text style={styles.chefEmoji}>👨‍🍳</Text>
          </View>

          {/* Food Images */}
          <View style={styles.imageContainer}>
            <View style={styles.imageRow}>
              <View style={[styles.imageBox, { backgroundColor: '#4A5568' }]} />
              <View style={[styles.imageBox, { backgroundColor: '#ECC94B' }]} />
              <View style={[styles.imageBox, { backgroundColor: '#4299E1' }]} />
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Vat 'n Happie</Text>
          </TouchableOpacity>

          {/* Hours */}
          <Text style={styles.hours}>
            MEALS AVAILABLE BETWEEN 09:00AM TILL 10:00 PM
          </Text>

          {/* Average Prices Section */}
          <View style={styles.averageSection}>
            <Text style={styles.sectionTitle}>Average Prices by Course</Text>
            <Text style={styles.averageText}>Starters: R{calculateAverageByCourse('Starter')}</Text>
            <Text style={styles.averageText}>Mains: R{calculateAverageByCourse('Main')}</Text>
            <Text style={styles.averageText}>Desserts: R{calculateAverageByCourse('Dessert')}</Text>
          </View>

          {/* Total Menu Items */}
          <Text style={styles.totalItems}>
            Total Menu Items: {menuItems.length}
          </Text>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => setCurrentScreen('addMenu')}
          >
            <Text style={styles.navIcon}>➕</Text>
            <Text style={styles.navText}>Add to Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => setCurrentScreen('filter')}
          >
            <Text style={styles.navIcon}>🔍</Text>
            <Text style={styles.navText}>Filter menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ADD MENU SCREEN
  if (currentScreen === 'addMenu') {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>HAPPIE</Text>
            <Text style={styles.chefEmoji}>👨‍🍳</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Add Menu Item</Text>
            <Text style={styles.formSubtitle}>Insert Information here</Text>

            <Text style={styles.label}>Name of Dish</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newItem.name}
              onChangeText={(text) => setNewItem({...newItem, name: text})}
            />

            <Text style={styles.label}>Course</Text>
            <View style={styles.pickerContainer}>
              <TouchableOpacity 
                style={styles.courseButton}
                onPress={() => setNewItem({...newItem, course: 'Starter'})}
              >
                <Text style={newItem.course === 'Starter' ? styles.courseSelected : styles.courseText}>
                  Starter
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.courseButton}
                onPress={() => setNewItem({...newItem, course: 'Main'})}
              >
                <Text style={newItem.course === 'Main' ? styles.courseSelected : styles.courseText}>
                  Main
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.courseButton}
                onPress={() => setNewItem({...newItem, course: 'Dessert'})}
              >
                <Text style={newItem.course === 'Dessert' ? styles.courseSelected : styles.courseText}>
                  Dessert
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description of meals"
              multiline
              numberOfLines={4}
              value={newItem.description}
              onChangeText={(text) => setNewItem({...newItem, description: text})}
            />

            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="R"
              keyboardType="numeric"
              value={newItem.price}
              onChangeText={(text) => setNewItem({...newItem, price: text})}
            />

            <TouchableOpacity 
              style={styles.saveButton}
              onPress={addMenuItem}
            >
              <Text style={styles.saveButtonText}>💾 Save your Happie</Text>
            </TouchableOpacity>

            {/* Show existing menu items with delete option */}
            <View style={styles.menuListContainer}>
              <Text style={styles.menuListTitle}>Current Menu Items</Text>
              {menuItems.map((item) => (
                <View key={item.id} style={styles.menuListItem}>
                  <View style={styles.menuItemInfo}>
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <Text style={styles.menuItemCourse}>{item.course} - R{item.price}</Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => removeMenuItem(item.id)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>❌</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => setCurrentScreen('home')}
          >
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navIcon}>➕</Text>
            <Text style={styles.navText}>Add to Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => setCurrentScreen('filter')}
          >
            <Text style={styles.navIcon}>🔍</Text>
            <Text style={styles.navText}>Filter menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // FILTER MENU SCREEN
  if (currentScreen === 'filter') {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>HAPPIE</Text>
            <Text style={styles.chefEmoji}>👨‍🍳</Text>
          </View>

          <View style={styles.menuContainer}>
            <Text style={styles.menuInstruction}>Select (1) Meal from each course</Text>
            <Text style={styles.menuTitle}>Menu</Text>

            {/* Filter Buttons */}
            <View style={styles.filterButtons}>
              <TouchableOpacity 
                style={[styles.filterButton, filterCourse === 'All' && styles.filterButtonActive]}
                onPress={() => setFilterCourse('All')}
              >
                <Text style={styles.filterButtonText}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterCourse === 'Starter' && styles.filterButtonActive]}
                onPress={() => setFilterCourse('Starter')}
              >
                <Text style={styles.filterButtonText}>Starters</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterCourse === 'Main' && styles.filterButtonActive]}
                onPress={() => setFilterCourse('Main')}
              >
                <Text style={styles.filterButtonText}>Mains</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterCourse === 'Dessert' && styles.filterButtonActive]}
                onPress={() => setFilterCourse('Dessert')}
              >
                <Text style={styles.filterButtonText}>Desserts</Text>
              </TouchableOpacity>
            </View>

            {/* Display filtered menu items */}
            {['Starter', 'Main', 'Dessert'].map((course) => {
              const courseItems = getFilteredItems().filter(item => item.course === course);
              if (courseItems.length === 0 && filterCourse !== 'All') return null;
              
              return (
                <View key={course}>
                  <Text style={styles.courseTitle}>{course}s</Text>
                  <Text style={styles.courseDescription}>description.</Text>
                  
                  {courseItems.map((item) => (
                    <View key={item.id} style={styles.menuItem}>
                      <View style={styles.menuItemHeader}>
                        <Text style={styles.menuItemName}>{item.name}</Text>
                        <Text style={styles.menuItemPrice}>R{item.price}</Text>
                      </View>
                      <Text style={styles.menuItemDescription}>{item.description}</Text>
                    </View>
                  ))}
                </View>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => setCurrentScreen('home')}
          >
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => setCurrentScreen('addMenu')}
          >
            <Text style={styles.navIcon}>➕</Text>
            <Text style={styles.navText}>Add to Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navIcon}>🔍</Text>
            <Text style={styles.navText}>Filter menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 5,
  },
  chefEmoji: {
    fontSize: 40,
    marginTop: 10,
  },
  imageContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    overflow: 'hidden',
    height: 150,
  },
  imageBox: {
    flex: 1,
    marginHorizontal: 2,
  },
  button: {
    backgroundColor: '#E5E5E5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  hours: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  averageSection: {
    backgroundColor: '#F7FAFC',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  averageText: {
    fontSize: 16,
    marginVertical: 5,
  },
  totalItems: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    paddingVertical: 10,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  navText: {
    fontSize: 10,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  formSubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 12,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  courseButton: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    alignItems: 'center',
  },
  courseText: {
    fontSize: 14,
  },
  courseSelected: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  saveButton: {
    backgroundColor: '#2C2C2C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  menuListContainer: {
    marginTop: 30,
  },
  menuListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  menuListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    marginBottom: 10,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuItemCourse: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 20,
  },
  menuContainer: {
    padding: 20,
  },
  menuInstruction: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  filterButtonActive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  filterButtonText: {
    fontSize: 14,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 12,
    color: '#999',
    marginBottom: 15,
  },
  menuItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItemDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
});
