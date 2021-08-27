import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

export default function App() {
  return (
    <Container>
      <Text>Você é viado né?</Text>
      <StatusBar style="auto" />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`