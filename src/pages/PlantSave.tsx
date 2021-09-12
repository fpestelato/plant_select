import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import { useRoute } from '@react-navigation/core';
import { format, isBefore } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { ScreenParamListProps } from '../../types';
import { PlantProps, savePlant } from '../libs/storage';

import { Button } from '../components/Button';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  plant: PlantProps
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const route = useRoute()
  const { plant } = route.params as Params;

  const navigation = useNavigation<ScreenParamListProps>();

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro ⏰️');
    }

    if (dateTime)
      setSelectedDateTime(dateTime);
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState);
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado',
        buttonTitle: 'Muito Obrigado ;D',
        icon: 'hug',
        nextScreen: 'MyPlants',
      });
    } catch (error) {
      Alert.alert('Não foi possível salvar 😢️');
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri
            uri={plant.photo}
            width={150}
            height={150}
          />

          <Text style={styles.plantName}>
            {plant.name}
          </Text>
          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>
        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image
              source={waterdrop}
              style={styles.tipImage}
            />
            <Text style={styles.tipText}>
              {plant.water_tips}
            </Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode={'time'}
              display="spinner"
              onChange={handleChangeTime}
            />
          )}

          {
            Platform.OS === 'android' && (
              <TouchableOpacity
                style={styles.dateTimePickerButton}
                onPress={handleOpenDateTimePickerForAndroid}
              >
                <Text style={styles.dateTimePickerText}>
                  {`Mudar Horario ${format(selectedDateTime, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
            )
          }

          <Button
            title='Cadastrar planta'
            onPress={handleSave}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 50
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify',
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,

  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  }
});