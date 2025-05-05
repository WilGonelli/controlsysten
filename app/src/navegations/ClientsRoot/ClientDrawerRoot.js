import { createDrawerNavigator } from "@react-navigation/drawer";
import ClientsRoot from "./ClientsRoot";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Colors from "../../theme/colors";

const Drawer = createDrawerNavigator();

export default function ClientDrawerRoot() {
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
            <FontAwesome5 name="users" size={32} color={color} />
          ),
        }}
        name="Clientes recentes"
      >
        {() => <ClientsRoot clientsRender="recentes" />}
      </Drawer.Screen>
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="user-lock" size={32} color={color} />
          ),
        }}
        name="Clientes arquivados"
      >
        {() => <ClientsRoot clientsRender="arquivados" />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
