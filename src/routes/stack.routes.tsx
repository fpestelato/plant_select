import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';

type RootStackParamList = {
    Welcome: undefined;
    UserIdentification: undefined;
    Confirmation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen name='Welcome' component={Welcome} />

        <Stack.Screen
            name='UserIdentification'
            component={UserIdentification}
        />

        <Stack.Screen name='Confirmation' component={Confirmation} />
    </Stack.Navigator>
);

export default AppRoutes;
