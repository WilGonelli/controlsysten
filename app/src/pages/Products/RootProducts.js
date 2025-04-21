import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsOverview from "./ProductsOverview";
import ProductBuy from "./ProductBuy";
import ProductSale from "./ProductSale";

export default function RootProducts() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductsOverview" component={ProductsOverview} />
      <Stack.Screen name="ProductBuy" component={ProductBuy} />
      <Stack.Screen name="ProductSale" component={ProductSale} />
    </Stack.Navigator>
  );
}
