export type MenuItem = {
    id: string;
    DishName: string;
    Course: string;
    Description: string;
    Price: number;
  };
  
  export type RootStackParamList = {
    Home: { updatedMenuItems: MenuItem[] };
    Addmenu: { menuItems: MenuItem[] };
    FilterMenu: undefined;
  };