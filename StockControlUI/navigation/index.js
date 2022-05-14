import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FontAwesomeIcon from '../helpers/icons/FontawesomeIcons';
import ProductsScreen from '../screens/products/index';
import ProductCategoryScreen from '../screens/productCategories/index';
import CreateProductCategory from '../screens/productCategories/create';
import ProductCategoryDetails from '../screens/productCategories/details';
import EdityProductCategory from '../screens/productCategories/edit';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const productsTitle = 'Produtos';
const productCategoriesTitle = 'Categoria de produtos';

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
            <Stack.Screen name="CreateProductCategory" component={CreateProductCategory} options={{ title: productCategoriesTitle }} />
            <Stack.Screen name="ProductCategoryDetails" component={ProductCategoryDetails} options={{ title: productCategoriesTitle }} />
            <Stack.Screen name="EdityProductCategory" component={EdityProductCategory} options={{ title: productCategoriesTitle }} />
        </Stack.Navigator>
    )
}

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName='Products'>
            <BottomTab.Screen
                name='Products'
                component={ProductsScreen}
                options={{
                    title: productsTitle,
                    tabBarIcon: () => <FontAwesomeIcon name="inbox"></FontAwesomeIcon>
                }}>
            </BottomTab.Screen>

            <BottomTab.Screen
                name='ProductsCategories'
                component={ProductCategoryScreen}
                options={{
                    title: productCategoriesTitle,
                    tabBarIcon: () => <FontAwesomeIcon name="sitemap"></FontAwesomeIcon>
                }}>
            </BottomTab.Screen>
        </BottomTab.Navigator>

    )
}