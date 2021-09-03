import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Welcome: undefined;
    UserIdentification: undefined;
    Confirmation: undefined;
};

export type WelcomeScreenNativeProp = NativeStackNavigationProp<
    RootStackParamList,
    'Welcome'
>

export type UserIdentificationScreenNativeProp = NativeStackNavigationProp<
    RootStackParamList,
    'UserIdentification'
>

export type ConfirmationScreenNativeProp = NativeStackNavigationProp<
    RootStackParamList,
    'Confirmation'
>