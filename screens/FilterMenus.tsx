import React, {  useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, Image, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function FilterMenuScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState<string>('');


  const [menuItems] = useState([
    { Course: 'Starter', DishName: 'Grilled Halloumi with Sweet Chili Sauce', Description: 'Lightly grilled halloumi cheese served with a tangy sweet chili dip.', Price: 65 },
    { Course: 'Main', DishName: 'Grilled Kingklip with Lemon Butter', Description: 'Fresh kingklip fillet grilled to perfection, drizzled with lemon butter sauce, and served with steamed broccoli and wild rice.', Price: 160 },
    { Course: 'Dessert', DishName: 'Chocolate Fondant with Vanilla Ice Cream', Description: 'Rich, molten-centered chocolate fondant served warm with a scoop of vanilla bean ice cream.', Price: 75 },
    { Course: 'Starter', DishName: 'Roasted Tomato Soup with Basil Pesto', Description: 'Slow-roasted tomato soup topped with fresh basil pesto and served with warm bread.', Price: 55 },
    { Course: 'Main', DishName: 'Beef Fillet with Red Wine Jus', Description: 'Tender beef fillet served with creamy mashed potatoes, roasted vegetables, and a red wine reduction.', Price: 190 },
    { Course: 'Dessert', DishName: 'Lemon Tart with Raspberry Coulis', Description: 'Tangy lemon tart served with fresh raspberries and a sweet coulis drizzle.', Price: 70 },
    { Course: 'Starter', DishName: 'Crispy Zucchini Fritters with Tzatziki', Description: 'Crispy fried zucchini fritters served with a cooling yogurt-based tzatziki sauce.', Price: 60 },
    { Course: 'Main', DishName: 'Grilled Chicken with Herb Butter', Description: 'Juicy grilled chicken breast topped with a rich herb-infused butter, served with roasted potatoes', Price: 145 },
    { Course: 'Dessert', DishName: 'Tiramisu', Description: 'A classic Italian dessert made with layers of coffee-soaked ladyfingers, mascarpone cheese, and cocoa powder.', Price: 85 },
    { Course: 'Starter', DishName: 'Smoked Salmon and Avocado Salad', Description: 'Fresh smoked salmon paired with creamy avocado, mixed greens, and a lemon vinaigrette.', Price: 80 },
    { Course: 'Main', DishName: 'Vegetarian Lasagna', Description: 'Layers of pasta, creamy béchamel sauce, and a medley of seasonal vegetables baked to perfection.', Price: 130 },
    { Course: 'Dessert', DishName: 'Panna Cotta with Berry Compote', Description: 'Smooth and creamy vanilla panna cotta topped with a tangy berry compote', Price: 90 },
  ]);

  const filteredItems = menuItems.filter((item: { Course: string; DishName: string; }) =>
    (selectedValue === '' || item.Course === selectedValue) &&
    item.DishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearFilter = () => {
    setSelectedValue('');
    setSearchTerm('');
  };

  return (
    <ImageBackground
      source={require('../assets/backgroundimg.jpg')}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <View style={styles.container}>
      

        <Picker
          selectedValue={selectedValue}
          onValueChange={setSelectedValue}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Starters" value="Starter" />
          <Picker.Item label="Mains" value="Main" />
          <Picker.Item label="Desserts" value="Dessert" />
        </Picker>

        

   
          <Button title="Clear Filter" onPress={clearFilter} />
          <FlatList
  data={filteredItems}
  renderItem={({ item }) => (
    <View style={styles.menuItem}>
      <Text style={styles.dishName}>{item.DishName}</Text>
      <Text style={styles.dishPrice}>R{item.Price}</Text>
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}  // Use index as a fallback key
/>
      
      {selectedValue === '' || selectedValue === 'Starter' ? (
        <View style={styles.categoryContainer}>
          <Image source={require('../assets/starterIMG.jpg')} style={styles.categoryImage} />
          <Text style={styles.categoryTitle}>Starters</Text>
        </View>
      ) : null}

      {selectedValue === '' || selectedValue === 'Main' ? (
        <View style={styles.categoryContainer}>
          <Image source={require('../assets/MainImg.jpg')} style={styles.categoryImage} />
          <Text style={styles.categoryTitle}>Main</Text>
        </View>
      ) : null}

      {selectedValue === '' || selectedValue === 'Dessert' ? (
        <View style={styles.categoryContainer}>
          <Image source={require('../assets/DessertImg.jpg')} style={styles.categoryImage} />
          <Text style={styles.categoryTitle}>Desserts</Text>
        </View>
      ) : null}
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  menuImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  menuDetails: {
    justifyContent: 'center',
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dishPrice: {
    fontSize: 14,
    color: '#888',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  noSelectionText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});
