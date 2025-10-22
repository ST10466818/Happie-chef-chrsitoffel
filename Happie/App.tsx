import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
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
      // Reset form
      setNewItem({ name: '', description: '', course: 'Starter', price: '', pairing: '' });
      Alert.alert('Success!', 'Menu item added successfully!');
    } else {
      Alert.alert('Error', 'Please fill in name and price');
    }
  };

  // Function to remove a menu item
  const removeMenuItem = (id: number): void => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    Alert.alert('Deleted', 'Menu item removed successfully');
  };

  // Function to calculate average price by course
  const calculateAverageByCourse = (course: string): string => {
    const courseItems = menuItems.filter(item => item.course === course);
    if (courseItems.length === 0) return '0.00';
    const total = courseItems.reduce((sum, item) => sum + item.price, 0);
    return (total / courseItems.length).toFixed(2);
  };

  // Filter menu items by course
  const [filterCourse, setFilterCourse] = useState<'All' | 'Starter' | 'Mains' | 'Desserts'>('All');
  const getFilteredItems = (): MenuItem[] => {
    if (filterCourse === 'All') return menuItems;
    return menuItems.filter(item => item.course === filterCourse);
  };

  // Wait for fonts to load
  if (!fontsLoaded) {
    return null;
  }

  // HOME SCREEN
  if (currentScreen === 'home') {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { fontFamily: 'Anton_400Regular' }]}>HAPPIE</Text>
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
            <Text style={styles.averageText}>Mains: R{calculateAverageByCourse('Mains')}</Text>
            <Text style={styles.averageText}>Desserts: R{calculateAverageByCourse('Desserts')}</Text>
          </View>

          {/* Total Menu Items */}
          <View style={styles.totalSection}>
            <Text style={styles.totalItems}>
              Total Menu Items: {menuItems.length}
            </Text>
          </View>

          {/* Display Menu Items */}
          {menuItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No menu items yet!</Text>
              <Text style={styles.emptySubtext}>Use "Add to Menu" to create your first dish</Text>
            </View>
          ) : (
            <View style={styles.menuPreview}>
              <Text style={styles.menuPreviewTitle}>Our Menu</Text>
              {(['Starter', 'Mains', 'Desserts'] as const).map((course) => {
                const courseItems = menuItems.filter(item => item.course === course);
                if (courseItems.length === 0) return null;
                
                return (
                  <View key={course}>
                    <Text style={styles.courseTitle}>{course}</Text>
                    {courseItems.map((item) => (
                      <View key={item.id} style={styles.menuItemPreview}>
                        <View style={styles.menuItemHeader}>
                          <Text style={styles.menuItemName}>{item.name}</Text>
                          <Text style={styles.menuItemPrice}>R{item.price}</Text>
                        </View>
                        <Text style={styles.menuItemDescription} numberOfLines={2}>
                          {item.description}
                        </Text>
                      </View>
                    ))}
                  </View>
                );
              })}
            </View>
          )}
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
            <Text style={[styles.title, { fontFamily: 'Anton_400Regular' }]}>HAPPIE</Text>
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
              onChangeText={(text: string) => setNewItem({...newItem, name: text})}
            />

            <Text style={styles.label}>Course</Text>
            <View style={styles.pickerContainer}>
              <TouchableOpacity 
                style={[styles.courseButton, newItem.course === 'Starter' && styles.courseButtonActive]}
                onPress={() => setNewItem({...newItem, course: 'Starter'})}
              >
                <Text style={newItem.course === 'Starter' ? styles.courseSelected : styles.courseText}>
                  Starter
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.courseButton, newItem.course === 'Mains' && styles.courseButtonActive]}
                onPress={() => setNewItem({...newItem, course: 'Mains'})}
              >
                <Text style={newItem.course === 'Mains' ? styles.courseSelected : styles.courseText}>
                  Mains
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.courseButton, newItem.course === 'Desserts' && styles.courseButtonActive]}
                onPress={() => setNewItem({...newItem, course: 'Desserts'})}
              >
                <Text style={newItem.course === 'Desserts' ? styles.courseSelected : styles.courseText}>
                  Desserts
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
              onChangeText={(text: string) => setNewItem({...newItem, description: text})}
            />

            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="R"
              keyboardType="numeric"
              value={newItem.price}
              onChangeText={(text: string) => setNewItem({...newItem, price: text})}
            />

            <TouchableOpacity 
              style={styles.saveButton}
              onPress={addMenuItem}
            >
              <Text style={styles.saveButtonText}>💾 Save your Happie</Text>
            </TouchableOpacity>

            {/* Show existing menu items with delete option */}
            <View style={styles.menuListContainer}>
              <Text style={styles.menuListTitle}>Current Menu Items ({menuItems.length})</Text>
              <Text style={styles.menuListSubtitle}>Tap ❌ to remove an item</Text>
              
              {menuItems.length === 0 ? (
                <Text style={styles.emptyMessage}>No menu items yet. Add your first dish above!</Text>
              ) : (
                menuItems.map((item) => (
                  <View key={item.id} style={styles.menuListItem}>
                    <View style={styles.menuItemInfo}>
                      <Text style={styles.menuItemNameList}>{item.name}</Text>
                      <Text style={styles.menuItemCourse}>{item.course} - R{item.price}</Text>
                    </View>
                    <TouchableOpacity 
                      onPress={() => removeMenuItem(item.id)}
                      style={styles.deleteButton}
                    >
                      <Text style={styles.deleteButtonText}>❌</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
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
            <Text style={[styles.title, { fontFamily: 'Anton_400Regular' }]}>HAPPIE</Text>
          
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
                style={[styles.filterButton, filterCourse === 'Mains' && styles.filterButtonActive]}
                onPress={() => setFilterCourse('Mains')}
              >
                <Text style={styles.filterButtonText}>Mains</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filterCourse === 'Desserts' && styles.filterButtonActive]}
                onPress={() => setFilterCourse('Desserts')}
              >
                <Text style={styles.filterButtonText}>Desserts</Text>
              </TouchableOpacity>
            </View>

            {/* Display filtered menu items */}
            {menuItems.length === 0 ? (
              <Text style={styles.emptyMessage}>No menu items available yet. Add some items first!</Text>
            ) : (
              (['Starter', 'Mains', 'Desserts'] as const).map((course) => {
                const courseItems = getFilteredItems().filter(item => item.course === course);
                if (courseItems.length === 0 && filterCourse !== 'All') return null;
                if (courseItems.length === 0) return (
                  <View key={course}>
                    <Text style={styles.courseTitle}>{course}</Text>
                    <Text style={styles.emptyMessage}>No {course.toLowerCase()} available.</Text>
                  </View>
                );
                
                return (
                  <View key={course}>
                    <Text style={styles.courseTitle}>{course}</Text>
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
              })
            )}
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
    marginBottom: 20,
  },
  averageSection: {
    backgroundColor: '#F7FAFC',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
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
  totalSection: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  totalItems: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
  menuPreview: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuPreviewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  menuItemPreview: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
    backgroundColor: '#FFF',
  },
  courseButtonActive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
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
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#E0E0E0',
  },
  menuListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  menuListSubtitle: {
    fontSize: 12,
    color: '#666',
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
  menuItemNameList: {
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
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    marginVertical: 20,
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
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
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