import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsOverview from "../../views/Products/ProductsOverview";
import ProductBuy from "../../views/Products/ProductBuy";
import ProductSale from "../../views/Products/ProductSale";

export default function ProductsRoot() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductsOverview" component={ProductsOverview} />
      <Stack.Screen name="ProductBuy" component={ProductBuy} />
      <Stack.Screen name="ProductSale" component={ProductSale} />
    </Stack.Navigator>
  );
}
