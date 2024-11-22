Addmenu.tsx Changes: 
Added a "Dish Name" input field for entering the name of the dish.
Added a "Course" input field for specifying whether the dish is a Starter, Main, or Dessert.
Added a "Description" input field for entering a description of the dish.
Added a "Price" input field for entering the price of the dish.
Implemented an "Add Dish" button that adds the dish to the menu if all fields are filled and the price is valid.
Added a useEffect hook to initialize the menu items from route.params if they are passed.
Created a handleAddMenuItem function to add a new dish to the menu list.
Added a handleRemoveMenuItem function to remove a dish from the menu.
Added a Save Menu button to save the updated menu and navigate back to the Home screen with the updated list.
Implemented a ScrollView to display the list of added menu items dynamically.
Added a menuItems state to hold the list of menu items and updated it with new items.
Changed the navigation logic to pass the updated menu items to the Home screen when saving.

Home.tsx Changes: 
Navigation Props: The HomeScreen component now directly receives navigation and route props instead of using the useNavigation and useRoute hooks. This is an alternative approach for navigation handling.
Additional Menu Item: A new dish "Crispy Zucchini Fritters with Tzatziki" has been added to the starter course, which is not present in the original code.
Added a new button for "Add Dish" in the footer section for navigating to the AddMenu screen.
Replaced Image with ImageBackground for the top banner, providing better flexibility for overlay effects.
Refined state management for menu items by using a more dynamic menuItems state with a simplified structure (id, course, dish name, description, price).
Modified the way menu items are displayed in the FlatList, now passing dynamic data for DishName, Description, and Price.
Introduced ScrollView for better scrolling experience when the menu list is long.
Updated the filter modal behavior with a more optimized approach for handling course filters, including dynamic updates to selected filters.
Added SafeAreaView for better UI compatibility across different screen sizes and devices.
Refactored the HomeScreen component to use destructuring for props (navigation and route).
Replaced some inline styles with more reusable styles and ensured consistency in the design, like adding rounded borders to buttons and improving button text alignment.
Modified state initialization for menu items, providing a default list with structured data rather than hardcoded arrays directly in the render function.
Implemented better handling for course selection and reset logic, ensuring that when a filter is applied, the list is updated dynamically.

Implemented a new screen "FilterMenu.tsx" 
Added a TextInput for filtering menu items by dish name.
 Implemented a Picker dropdown to filter menu items by course (Starters, Mains, Desserts).
 Introduced a "Clear Filter" button to reset selected category and search term. 
 Enhanced filtering logic to combine category selection and search functionality.
 Replaced static menu rendering with a FlatList for dynamic data handling.
 Added category images and titles for starters, mains, and desserts when no filter is applied.
 Wrapped the screen in an ImageBackground for a more visually appealing design.
 ncluded specific images for each category (starterIMG.jpg, MainImg.jpg, DessertImg.jpg). 
 Used index as a fallback key in FlatList rendering. 
 Refined styles for menu items, category containers, and dish names for consistency.
 Applied shadow and elevation properties to improve UI aesthetics.
 Set a default Picker.Item for category guidance.
 Dynamically displayed dish prices under names for better user experience.
 
