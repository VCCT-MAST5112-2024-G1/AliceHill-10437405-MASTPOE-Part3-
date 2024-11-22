import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, FlatList, ScrollView, SafeAreaView, Button } from 'react-native';
import { RouteProp} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParams';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation, route }: { navigation: HomeScreenNavigationProp, route: HomeScreenRouteProp }) => {
  const [menuItems, setMenuItems] = useState<{ id: string; Course: string; DishName: string; Description: string; Price: number }[]>([
    { id: '1', Course: 'Starter', DishName: 'Grilled Halloumi with Sweet Chili Sauce', Description: 'Lightly grilled halloumi cheese served with a tangy sweet chili dip.', Price: 65 },
    { id: '2', Course: 'Main', DishName: 'Grilled Kingklip with Lemon Butter', Description: 'Fresh kingklip fillet grilled to perfection, drizzled with lemon butter sauce, and served with steamed broccoli and wild rice.', Price: 160 },
    { id: '3', Course: 'Dessert', DishName: 'Chocolate Fondant with Vanilla Ice Cream', Description: 'Rich, molten-centered chocolate fondant served warm with a scoop of vanilla bean ice cream.', Price: 75 },
    { id: '4', Course: 'Starter', DishName: 'Roasted Tomato Soup with Basil Pesto', Description: 'Slow-roasted tomato soup topped with fresh basil pesto and served with warm bread.', Price: 55 },
    { id: '5', Course: 'Main', DishName: 'Beef Fillet with Red Wine Jus', Description: 'Tender beef fillet served with creamy mashed potatoes, roasted vegetables, and a red wine reduction.', Price: 190 },
    { id: '6', Course: 'Dessert', DishName: 'Lemon Tart with Raspberry Coulis', Description: 'Tangy lemon tart served with fresh raspberries and a sweet coulis drizzle.', Price: 70 },
    { id: '7', Course: 'Starter', DishName: 'Crispy Zucchini Fritters with Tzatziki', Description: 'Crispy fried zucchini fritters served with a cooling yogurt-based tzatziki sauce.', Price: 60 },
    { id: '8', Course: 'Main', DishName: 'Grilled Chicken with Herb Butter', Description: 'Juicy grilled chicken breast topped with a rich herb-infused butter, served with roasted potatoes', Price: 145 },
    { id: '9', Course: 'Dessert', DishName: 'Tiramisu', Description: 'A classic Italian dessert made with layers of coffee-soaked ladyfingers, mascarpone cheese, and cocoa powder.', Price: 85 },
    { id: '10', Course: 'Starter', DishName: 'Smoked Salmon and Avocado Salad', Description: 'Fresh smoked salmon paired with creamy avocado, mixed greens, and a lemon vinaigrette.', Price: 80 },
    { id: '11', Course: 'Main', DishName: 'Vegetarian Lasagna', Description: 'Layers of pasta, creamy béchamel sauce, and a medley of seasonal vegetables baked to perfection.', Price: 130 },
    { id: '12', Course: 'Dessert', DishName: 'Panna Cotta with Berry Compote', Description: 'Smooth and creamy vanilla panna cotta topped with a tangy berry compote', Price: 90 },
  ]);


  const calculateAveragePrices = (menus: { Course: string; Price: number }[]) => {
    const courseTotals: { [key: string]: { total: number; count: number } } = {};
    menus.forEach(({ Course, Price }) => {
      if (!courseTotals[Course]) {
        courseTotals[Course] = { total: 0, count: 0 };
      }
      courseTotals[Course].total += Price;
      courseTotals[Course].count += 1;
    });

    const averagePrices: { [key: string]: number } = {};
    for (const course in courseTotals) {
      averagePrices[course] = courseTotals[course].total / courseTotals[course].count;
    }
    return averagePrices;
  };

  useEffect(() => {
    if (route.params?.updatedMenuItems) {
      setMenuItems(route.params.updatedMenuItems); // Update the menu items
    }
  }, [route.params?.updatedMenuItems]);
  

  const averagePrices = useMemo(() => {
    const prices = calculateAveragePrices(menuItems);
    console.log('Calculated Average Prices:', prices); 
    return prices;
  }, [menuItems]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/img.jpg')}
        resizeMode="cover"
        style={styles.imageBackground}>
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <Text style={styles.Title}>Welcome</Text>
          <Text style={styles.averagePricesTitle}>Price Average</Text>

          {Object.entries(averagePrices).map(([course, avgPrice]) => (
            <Text key={course} style={styles.averagePriceText}>
              {course}: R{avgPrice.toFixed(2)}
            </Text>
          ))}
        </View>

        <ScrollView style={styles.menuList}>
          {menuItems.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <Text style={styles.dishName}>{item.DishName}</Text>
              <Text style={styles.course}>{item.Course}</Text>
              <Text>{item.Description}</Text>
              <Text>{`R${item.Price.toFixed(2)}`}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <Button
            title="Add New Dish"
            onPress={() => navigation.navigate('Addmenu', { menuItems })}
            color="#007BFF"
          />
          <TouchableOpacity
            style={[styles.navigationButton, styles.filterButton]}
            onPress={() => navigation.navigate('FilterMenu')}>
            <Text style={styles.buttonText}>Filter Menu</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  Title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 40,
    color: '#fff',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuList: {
    paddingTop: '23%',
    paddingBottom: '40%',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: 70
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,

  },
  averagePricesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  averagePriceText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    alignItems: 'center',
    marginBottom: 20,
  },
  navigationButton: {
    backgroundColor: '#FF7043',
    paddingVertical: 15,
    width: '80%',
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
  },
  filterButton: {
    backgroundColor: '#5C6BC0',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  courseSection: {
    marginBottom: 20,
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center'
  },
}); 
export default HomeScreen;