import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';

import ProductsScreen from '../screens/products/index';
import ProductCategoriesScreen from '../screens/productCategories/index';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator></RootNavigator>
        </NavigationContainer>
    )
}

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator initialRouteName='Products'>
            <BottomTab.Screen
                name='Products'
                component={ProductsScreen}
                options={{
                    title: "Produtos",
                    tabBarIcon: () => <TabBarIcon name="stack-exchange"></TabBarIcon>
                }}>
            </BottomTab.Screen>

            <BottomTab.Screen
                name='ProductsCategories'
                component={ProductCategoriesScreen}
                options={{
                    title: "Categoria de produtos",
                    tabBarIcon: () => <TabBarIcon name="stack-exchange"></TabBarIcon>
                }}>
            </BottomTab.Screen>
        </BottomTab.Navigator>

    )
}

function TabBarIcon(props) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props}></FontAwesome>
}