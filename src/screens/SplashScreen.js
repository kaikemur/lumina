import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen({ navigation }) {
    const fadeAnim = new Animated.Value(0);
    const scaleAnim = new Animated.Value(0.8);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.logoContainer,
                    { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                ]}>
                <View style={styles.logo}>
                    <Ionicons name="sunny" size={50} color="#2563EB" />
                </View>
            </Animated.View>

            <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>LuminaWork</Animated.Text>

            <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
                Monitore a iluminação do seu{'\n'}ambiente de trabalho
            </Animated.Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.replace('Main')}
                activeOpacity={0.8}>
                <Text style={styles.buttonText}>Iniciar Medição</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.replace('Main')}
                activeOpacity={0.8}>
                <Text style={styles.secondaryButtonText}>Ver Histórico</Text>
            </TouchableOpacity>

            <Text style={styles.footer}>Versão 1.0.0</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F9FF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    logoContainer: {
        marginBottom: 30,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#BAE6FD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
    },
    button: {
        width: '100%',
        padding: 16,
        backgroundColor: '#2563EB',
        borderRadius: 14,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        width: '100%',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#2563EB',
    },
    secondaryButtonText: {
        color: '#2563EB',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        fontSize: 13,
        color: '#94A3B8',
    },
});
