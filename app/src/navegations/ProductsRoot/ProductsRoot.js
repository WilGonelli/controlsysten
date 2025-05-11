import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsOverview from "../../views/Products/ProductsOverview";
import ProductUpdateTransaction from "../../views/Products/ProductUpdateTransaction";

export default function ProductsRoot({ productsRender }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverview}
        initialParams={{ productsRender }}
      />
      <Stack.Screen
        name="ProductsUpdate"
        component={ProductUpdateTransaction}
      />
    </Stack.Navigator>
  );
}
