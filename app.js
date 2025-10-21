
import { Home, Plus, Filter, ChevronDown, ChevronUp, Salad } from 'lucide-react';

// === IMPORTANT NOTE FOR REACT NATIVE SUBMISSION ===
// This file uses simple web elements (div, p, button, input) as placeholders
// to ensure it runs in this web preview environment.
// 
// For a real React Native project (like Expo), please DELETE the first three
// placeholder lines below and UNCOMMENT the standard React Native import:
// import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, FlatList, Dimensions } from 'react-native';
// You will also use StyleSheet.create for styling instead of Tailwind classes.
// ======================================

// --- Component Mapping for Web Preview (DELETE these lines in RN project) ---
const View = (props) => <div {...props} />;
const Text = (props) => <p {...props} />;
const TouchableOpacity = (props) => <button {...props} />;
const ScrollView = (props) => <div {...props} />;
const TextInput = (props) => <input {...props} />;
// --- End of Placeholder Mappings ---

// --- Mock Data ---

const initialMenuItems = [
  { id: '1', name: 'Brie & Thyme Koevertjies', course: 'Starters', price: 95, description: 'Creamy brie phyllo parcels glazed with honey and thyme, served with biltong shavings and walnuts.', pairing: 'Klein Zalze Chardonnay (glass) or Castle Lager (500ml)' },
  { id: '2', name: 'Boerenkaas & Corn Samoosas (4 pcs)', course: 'Starters', price: 85, description: 'Golden, crispy pastry pockets filled with creamy boerenkaas and sweet corn, served with a tangy tomato relish for dipping.', pairing: 'Durbanville Hills Sauvignon Blanc (glass) or Jack Black Pale Ale (340ml)' },
  
  // *** UPDATED ITEM: Butternut & Spinach Lasagna ***
  { id: '3', name: 'Butternut & Spinach Lasagna', course: 'Mains', price: 160, description: 'Layers of roasted butternut, spinach, ricotta, and herbed tomato sauce.', pairing: 'Glen Carlou Merlot (glass)' },
  
  { id: '4', name: 'Cape Malay Curry', course: 'Mains', price: 180, description: 'A fragrant, mild chicken curry served with basmati rice, sambals, and roti.', pairing: 'Waterford Rose-Mary (glass)' },
  
  // *** UPDATED ITEM: Peppermint Dom Pedro ***
  { id: '5', name: 'Peppermint Dom Pedro', course: 'Desserts', price: 90, description: 'A creamy cocktail blended with peppermint liquor and Amarula.', pairing: 'A festive finish to your meal.' },
  
  { id: '6', name: 'Milk Tart Cheesecake', course: 'Desserts', price: 90, description: 'A fusion of creamy cheesecake and traditional South African milk tart, dusted with cinnamon.', pairing: 'Hot coffee or rooibos tea' },
];

// --- Shared Constants and Components ---

const PRIMARY_COLOR = 'text-[#FF6B6B]'; 
const PRIMARY_BG = 'bg-[#FF6B6B]';
const SECONDARY_COLOR = 'text-[#444]'; 
const LIGHT_GREY_BG = 'bg-[#F0F0F0]';

// Header component
const Header = ({ title }) => (
  <View className="py-4 border-b border-[#DDD] flex flex-col items-center mb-4">
    <Text className={`text-3xl font-black ${PRIMARY_COLOR} tracking-widest`}>HAPPIE</Text>
    <Text className={`text-sm ${SECONDARY_COLOR} mt-0.5 font-semibold`}>{title}</Text>
  </View>
);

// Bottom Navigation Bar
const BottomNavBar = ({ currentScreen, setScreen }) => {
  const NavItem = ({ screen, label, Icon }) => {
    const isActive = currentScreen === screen;
    const colorClass = isActive ? PRIMARY_COLOR : 'text-gray-500';
    return (
      <TouchableOpacity
        className="flex flex-col items-center p-2 flex-1 focus:outline-none"
        onClick={() => setScreen(screen)}
      >
        <Icon className={`${colorClass} w-6 h-6`} />
        <Text className={`text-xs mt-1 font-semibold ${colorClass}`}>{label}</Text>
      </TouchableOpacity>
    );
  };

  // In RN, this would be a simple View styled with flex
  return (
    <View className="flex flex-row justify-around items-center pt-2 border-t border-[#DDD] bg-white shadow-lg sticky bottom-0 z-10">
      <NavItem screen="Home" label="Home" Icon={Home} />
      <NavItem screen="Add" label="+ Add to Menu" Icon={Plus} />
      <NavItem screen="Filter" label="Filter menu" Icon={Filter} />
    </View>
  );
};

// --- Screen Components ---

const HomeScreen = ({ navigateToAdd }) => {
  const carouselItems = [
    { title: 'The Daily Special', text: 'Fresh Hake with lemon butter sauce.' },
    { title: 'Chef\'s Recommendation', text: 'Roasted Duck Breast with cherry reduction.' },
    { title: 'Vegetarian Delight', text: 'Butternut Squash and Feta Tart.' },
  ];
  
  return (
    <View className="h-full flex flex-col">
      <Header title="BY CHEF CHRISTOFFEL" />
      <Text className={`text-xs text-center ${SECONDARY_COLOR} mb-5 font-medium`}>
        MEALS AVAILABLE BETWEEN 09:00AM TILL 10:00 PM
      </Text>

      {/* Uses ScrollView to mimic a horizontal FlatList carousel structure */}
      <View className="relative mb-8">
        <ScrollView 
          // In RN, you would add: horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}
          className="flex flex-row overflow-x-scroll snap-x snap-mandatory space-x-5 px-5 pb-4 hide-scrollbar"
        >
          {carouselItems.map((item, index) => (
            <View
              key={index}
              // In RN, width would be calculated based on Dimensions.get('window').width
              className="flex-shrink-0 w-[85vw] max-w-sm h-72 bg-white rounded-xl shadow-xl snap-center overflow-hidden"
              style={{ minWidth: '85vw', maxWidth: '350px' }} 
            >
              <View className="h-3/5 bg-gray-200 flex items-center justify-center rounded-t-xl">
                <Salad className="w-12 h-12 text-gray-400" />
              </View>
              <View className="p-4 h-2/5 flex flex-col justify-center">
                <Text className={`text-xl font-bold ${SECONDARY_COLOR} mb-1.5`}>{item.title}</Text>
                <Text className="text-sm text-gray-600">{item.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="p-2 pt-5">
        <TouchableOpacity
          className={`w-full ${PRIMARY_BG} py-3.5 rounded-xl text-lg font-bold uppercase tracking-wider shadow-lg shadow-red-300/50 hover:opacity-90 transition-opacity`}
          onClick={navigateToAdd}
        >
          <Text className="text-center text-white">Vat 'n Happie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AddMenuItemScreen = ({ onSave }) => {
  const [dishName, setDishName] = useState('');
  const [course, setCourse] = useState('Main');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    if (dishName && course && description && price) {
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        console.error('Price must be a valid positive number.');
        return;
      }

      onSave({ dishName, course, description, price: parsedPrice });
      setDishName('');
      setCourse('Main');
      setDescription('');
      setPrice('');
    } else {
      console.error('Please fill all fields.');
    }
  };

  return (
    <View className="h-full flex flex-col overflow-auto">
      <Header title="Add Menu Item" />
      <Text className="text-lg font-semibold text-center text-gray-700 mb-6">Insert Information here</Text>

      {/* Uses ScrollView for form content, which is typical in RN forms */}
      <ScrollView className={`${LIGHT_GREY_BG} p-4 rounded-xl mb-6 flex-grow overflow-y-scroll`}>
        <View className="space-y-4">
          
          {/* Dish Name */}
          <View>
            <Text className={`text-sm ${SECONDARY_COLOR} font-semibold mb-1 block`}>Name of Dish</Text>
            <TextInput
              className={`w-full bg-white p-3 rounded-lg border border-gray-300 focus:ring-2 ${PRIMARY_COLOR} focus:border-red-400 text-base`}
              placeholder="Name"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
            />
          </View>

          {/* Course */}
          <View>
            <Text className={`text-sm ${SECONDARY_COLOR} font-semibold mb-1 block`}>Course</Text>
            <TextInput
              className={`w-full bg-white p-3 rounded-lg border border-gray-300 focus:ring-2 ${PRIMARY_COLOR} focus:border-red-400 text-base`}
              placeholder="Starter, Main, Dessert"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </View>

          {/* Description - uses textarea for web preview, but would be a multiline TextInput in RN */}
          <View>
            <Text className={`text-sm ${SECONDARY_COLOR} font-semibold mb-1 block`}>Description</Text>
            <textarea
              className={`w-full bg-white p-3 rounded-lg border border-gray-300 focus:ring-2 ${PRIMARY_COLOR} focus:border-red-400 text-base resize-none`}
              placeholder="Description of meals"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </View>

          {/* Price */}
          <View>
            <Text className={`text-sm ${SECONDARY_COLOR} font-semibold mb-1 block`}>Price</Text>
            <View className="flex flex-row items-center">
              <Text className={`text-xl font-bold ${PRIMARY_COLOR} mr-2`}>R</Text>
              <TextInput
                className={`flex-1 bg-white p-3 rounded-lg border border-gray-300 focus:ring-2 ${PRIMARY_COLOR} focus:border-red-400 text-base`}
                placeholder="Price"
                type="number"
                inputMode="decimal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View className="p-2 pb-4">
        <TouchableOpacity
          className="w-full bg-[#444] py-3.5 rounded-xl text-lg font-bold hover:bg-gray-600 transition-colors shadow-md"
          onClick={handleSave}
        >
          <Text className="text-center text-white">Save your Happie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FilterMenuScreen = ({ menuItems }) => {
  const [expandedCourse, setExpandedCourse] = useState('Starters');

  const toggleCourse = (course) => {
    setExpandedCourse(expandedCourse === course ? null : course);
  };

  // Group meals by course for display
  const groupedMeals = useMemo(() => {
    return menuItems.reduce((acc, item) => {
      acc[item.course] = acc[item.course] || [];
      acc[item.course].push(item);
      return acc;
    }, {});
  }, [menuItems]);

  const courses = ['Starters', 'Mains', 'Desserts'];

  const MealItem = ({ item }) => (
    <View className="p-4 border-b border-gray-100 bg-white">
      <View className="flex flex-row justify-between items-start mb-1">
        <Text className={`text-base font-bold ${SECONDARY_COLOR} mr-4 break-words`}>{item.name}</Text>
        <Text className={`text-base font-bold ${PRIMARY_COLOR} flex-shrink-0`}>R{item.price}</Text>
      </View>
      <Text className="text-sm text-gray-600 mb-2 leading-snug">{item.description}</Text>
      {item.pairing && (
        <Text className="text-xs text-gray-500 italic">
          **Paired with:** {item.pairing}
        </Text>
      )}
    </View>
  );

  return (
    <View className="h-full flex flex-col">
      <Header title="Menu" />
      <Text className="text-sm text-center text-gray-600 mb-4 font-medium">
        Select (1) Meal from each course
      </Text>

      {/* Uses ScrollView to mimic a vertical FlatList/list */}
      <ScrollView className="flex-1 overflow-y-auto space-y-2 pb-4">
        {courses.map((course) => {
          const isExpanded = expandedCourse === course;
          const meals = groupedMeals[course] || [];
          const Icon = isExpanded ? ChevronUp : ChevronDown;

          return (
            <View key={course} className={`${LIGHT_GREY_BG} rounded-xl overflow-hidden shadow-sm`}>
              <TouchableOpacity
                className="flex flex-row justify-between items-center w-full p-4 bg-white hover:bg-gray-50 transition-colors"
                onClick={() => toggleCourse(course)}
              >
                <Text className={`text-xl font-extrabold ${PRIMARY_COLOR}`}>{course}</Text>
                <Icon className="w-5 h-5 text-gray-600" />
              </TouchableOpacity>

              {isExpanded && (
                <View className="meal-list-container border-t border-gray-200">
                  {meals.length > 0 ? (
                    meals.map(item => <MealItem key={item.id} item={item} />)
                  ) : (
                    <Text className="p-4 text-center text-gray-500 bg-white">No {course} available yet.</Text>
                  )}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

// --- Main App Component ---

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  const handleSaveDish = (newDishData) => {
    const newDish = {
      id: Date.now().toString(),
      name: newDishData.dishName,
      course: newDishData.course,
      description: newDishData.description,
      price: newDishData.price,
      pairing: 'Suggested pairing: TBA', 
    };
    setMenuItems([...menuItems, newDish]);
    setCurrentScreen('Filter'); 
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen navigateToAdd={() => setCurrentScreen('Add')} />;
      case 'Add':
        return <AddMenuItemScreen onSave={handleSaveDish} />;
      case 'Filter':
        return <FilterMenuScreen menuItems={menuItems} />;
      default:
        return <HomeScreen navigateToAdd={() => setCurrentScreen('Add')} />;
    }
  };

  return (
    // Main container setup for a mobile-like view
    <View className="min-h-screen bg-gray-100 flex justify-center p-0 sm:p-4">
      <View className="w-full max-w-md bg-white shadow-2xl flex flex-col h-[100vh] sm:h-[95vh] rounded-none sm:rounded-xl overflow-hidden">
        <View className="flex-1 overflow-hidden p-4 pb-0">
          {renderScreen()}
        </View>
        <BottomNavBar currentScreen={currentScreen} setScreen={setCurrentScreen} />
      </View>
      <style>{`
        /* Custom scrollbar hiding for the carousel */
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </View>
  );
};

export default App;
