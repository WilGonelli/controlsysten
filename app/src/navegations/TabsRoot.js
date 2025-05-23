import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../theme/colors";
import ClientDrawerRoot from "./ClientsRoot/ClientDrawerRoot";
import ProductDrawerRoot from "./ProductsRoot/ProductDrawerRoot";

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
          tabBarHideOnKeyboard: true,
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
          component={ProductDrawerRoot}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
