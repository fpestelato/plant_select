import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import { PlantSelect } from '../pages/PlantSelect';
import { MaterialIcons } from '@expo/vector-icons';
import { MyPlants } from '../pages/MyPlants';
import { Platform } from 'react-native';

const AppTab = createBottomTabNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <AppTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.heading,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 80,
        }
      }}
    >
      <AppTab.Screen
        name='Nova Planta'
        component={PlantSelect}
        options={{
          tabBarIcon:(({size, color})=> (
            <MaterialIcons
              name='add-circle-outline'
              size={size}
              color={color}
            />
          ))
        }}
      />

      <AppTab.Screen
        name='Minhas Plantas'
        component={MyPlants}
        options={{
          tabBarIcon:(({size, color})=> (
            <MaterialIcons
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          ))
        }}
      />
    </AppTab.Navigator>
  )
}

export default AuthRoutes;