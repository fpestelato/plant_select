import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

import { Button } from '../components/Button';

import { ConfirmationScreenProps, ScreenParamListProps } from '../../types';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const emojis = {
    hug: '🤗️',
    smile: '😄️',
}

export function Confirmation() {
    const navigation = useNavigation<ScreenParamListProps>();
    const routes = useRoute();

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params as ConfirmationScreenProps;

    function handleSubmit() {
        navigation.navigate(nextScreen);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>

                <View style={styles.footer}>
                    <Button title={buttonTitle} onPress={handleSubmit} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30,
    },
    emoji: {
        fontSize: 78,
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        color: colors.heading,
        textAlign: 'center',
        lineHeight: 38,
        marginTop: 15,
    },
    subtitle: {
        fontSize: 17,
        fontFamily: fonts.text,
        textAlign: 'center',
        color: colors.heading,
        paddingVertical: 10,
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20,
    },
});
