import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator, 
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { EnvironmentButton } from '../components/EnvironmentButton';

import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { ScreenParamListProps } from '../../types';
import { PlantProps } from '../libs/storage';

interface EnvironmentsProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [enviroments, setEnviroments] = useState<EnvironmentsProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSeleceted] = useState('all');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  
  const navigation = useNavigation<ScreenParamListProps>();

  function handleEnvironmentSelected(enviroment: string) {
    setEnviromentSeleceted(enviroment);

    if (enviroment == 'all')
      return setFilteredPlants(plants);

    const filtered = plants.filter(plant =>
      plant.environments.includes(enviroment)
    )

    setFilteredPlants(filtered);
  }

  async function fetchEnvironment() {
    const { data } = await api
      .get('plants_environments?_sort=title&order=asc');

    setEnviroments([
      {
        key: 'all',
        title: 'Todos',
      },
      ...data
    ]);
  }

  async function fetchPlants() {
    const { data } = await api
      .get(`plants?_sort=name&order=asc&_page=${page}&_limit=8`);

    if (!data)
      return setLoading(true);

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false)
  }

  function handleFetchMore(distance: number) {
    if (distance < 1)
      return;

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1)
    fetchPlants();
  }

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate('PlantSave', { plant });
  }

  useEffect(() => {
    fetchEnvironment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, [])

  if (loading)
    return <Load />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>
          Em qual ambiente
        </Text>
        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnvironmentButton
              key={item.key}
              title={item.title}
              active={item.key === enviromentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReachedThreshold={0.05}
          onEndReached={({ distanceFromEnd }) => { handleFetchMore(distanceFromEnd) }}
          ListFooterComponent={
            loadingMore 
            ? <ActivityIndicator color={colors.green} />
            : <></>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    marginVertical: 32,
    marginTop: 16,
    paddingLeft: 30,
    paddingRight: 30,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  contentContainerStyle: {
  }
});