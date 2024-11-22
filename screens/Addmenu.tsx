import React, { useState, useEffect } from 'react';
import { TextInput, Button, View, ScrollView, Text, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RouteProp } from '@react-navigation/native'; 
import { MenuItem, RootStackParamList } from './RootStackParams';

type AddMenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Addmenu'>;
type AddMenuScreenRouteProp = RouteProp<RootStackParamList, 'Addmenu'>;

const AddMenuScreen = ({ navigation, route }: { navigation: AddMenuScreenNavigationProp, route: AddMenuScreenRouteProp }) => {
  const [dishName, setDishName] = useState('');
  const [course, setCourse] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(route.params?.menuItems || []);

  useEffect(() => {
    if (route.params?.menuItems) {
      setMenuItems(route.params.menuItems); 
    }
  }, [route.params?.menuItems]);

  const handleAddMenuItem = () => {
    if (!dishName || !course || !description || !price) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Error', 'Please enter a valid price.');
      return;
    }

    const newItem: MenuItem = {
      id: new Date().toString(), 
      DishName: dishName,
      Course: course,
      Description: description,
      Price: parsedPrice,
    };

    setMenuItems((prevItems: MenuItem[]) => [...prevItems, newItem]); 

    setDishName('');
    setCourse('');
    setDescription('');
    setPrice('');
  };

  const handleRemoveMenuItem = (id: string) => {
    setMenuItems((prevItems: MenuItem[]) => prevItems.filter((item) => item.id !== id)); 
  };

  const handleSaveMenuItems = () => {
    navigation.navigate('Home', { updatedMenuItems: menuItems });
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        value={dishName}
        onChangeText={setDishName}
        placeholder="Dish Name"
        style={styles.input}
      />
      <TextInput
        value={course}
        onChangeText={setCourse}
        placeholder="Course (Starter, Main, Dessert)"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        style={styles.input}
      />
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Price"
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add Dish" onPress={handleAddMenuItem} color="#007BFF" />

      <ScrollView style={styles.menuList}>
        {menuItems.map((item) => (
          <View key={item.id} style={styles.menuItem}>
            <Text style={styles.dishName}>{item.DishName}</Text>
            <Text style={styles.course}>{item.Course}</Text>
            <Text>{item.Description}</Text>
            <Text>{`$${item.Price.toFixed(2)}`}</Text>
            <Button title="Remove" onPress={() => handleRemoveMenuItem(item.id)} color="#FF6347" />
          </View>
        ))}
      </ScrollView>

      <Button title="Save Menu" onPress={handleSaveMenuItems} color="#28A745" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  menuList: {
    marginTop: 20,
    marginBottom: 20,
  },
  menuItem: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  course: {
    color: '#007BFF',
    fontStyle: 'italic',
    marginBottom: 5,
  },
});

export default AddMenuScreen;
