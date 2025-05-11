import { createDrawerNavigator } from "@react-navigation/drawer";
import ProductsRoot from "./ProductsRoot";
import { FontAwesome6, Ionicons, Entypo } from "@expo/vector-icons";
import Colors from "../../theme/colors";

const Drawer = createDrawerNavigator();

export default function ProductDrawerRoot() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.primaryColor[100],
        drawerInactiveBackgroundColor: Colors.gray,
        drawerLabelStyle: {
          color: Colors.white,
          fontSize: 22,
        },
        drawerStyle: {
          backgroundColor: Colors.backgroundDefault,
        },
        drawerItemStyle: {
          marginVertical: 18,
        },
      }}
    >
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="beer" size={32} color={color} />
          ),
        }}
        name="Cervejas"
      >
        {() => <ProductsRoot productsRender="cervejas" />}
      </Drawer.Screen>
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome6 name="bottle-water" size={32} color={color} />
          ),
        }}
        name="Refrigerantes"
      >
        {() => <ProductsRoot productsRender="refrigerantes" />}
      </Drawer.Screen>
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Entypo name="archive" size={32} color={color} />
          ),
        }}
        name="Outros"
      >
        {() => <ProductsRoot productsRender="outros" />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
