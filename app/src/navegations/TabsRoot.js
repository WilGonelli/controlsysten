import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ClientsRoot from "./ClientsRoot/ClientsRoot";
import ProductsRoot from "./ProductsRoot/ProductsRoot";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../theme/colors";
import ClientDrawerRoot from "./ClientsRoot/ClientDrawerRoot";

export default function TabsRoot() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primaryColor[100],
          tabBarInactiveTintColor: Colors.secundaryColor[100],
          tabBarStyle: {
            backgroundColor: "#2b2b2b",
          },
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="users" size={24} color={color} />
            ),
          }}
          name="Clientes"
          component={ClientDrawerRoot}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="store" size={24} color={color} />
            ),
          }}
          name="Produtos"
          component={ProductsRoot}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
