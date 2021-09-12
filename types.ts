import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PlantProps } from './src/libs/storage';

type AppScreens = 'UserIdentification' | 'Welcome' | 'Confirmation' | 'PlantSelect' | 'PlantSave' | 'MyPlants'

export interface ConfirmationScreenProps {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: AppScreens;
}

export type RootStackParamList = {
  UserIdentification: undefined;
  Welcome: undefined;
  Confirmation: ConfirmationScreenProps;
  PlantSelect: undefined;
  PlantSave: {
    plant: PlantProps
  };
  MyPlants: undefined;
};

export type ScreenParamListProps = NativeStackNavigationProp<RootStackParamList>