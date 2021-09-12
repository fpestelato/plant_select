import React from 'react';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import AuthRoutes from './tab.routes';
import { PlantSave } from '../pages/PlantSave';
import { createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen name='Welcome' component={Welcome} />
        <Stack.Screen name='UserIdentification' component={UserIdentification} />
        <Stack.Screen name='Confirmation' component={Confirmation} />
        <Stack.Screen name='PlantSelect' component={AuthRoutes} />
        <Stack.Screen name='PlantSave' component={PlantSave} />
        <Stack.Screen name='MyPlants' component={AuthRoutes} />
    </Stack.Navigator>
);

export default AppRoutes;
