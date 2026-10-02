import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SensorUnavailableScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <View style={styles.iconBg}>
                    <Ionicons name="alert-circle" size={60} color="#EF4444" />
                </View>
            </View>

            <Text style={styles.title}>Sensor de Luz Indisponível</Text>

            <Text style={styles.subtitle}>
                Este dispositivo não possui sensor de luminosidade ou o acesso foi negado.
            </Text>

            <View style={styles.infoCard}>
                <Ionicons name="information-circle" size={20} color="#2563EB" />
                <Text style={styles.infoText}>
                    O sensor de luz ambiente é necessário para realizar medições de luminosidade.
                    Verifique as permissões do app nas configurações do dispositivo.
                </Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Main')}
                activeOpacity={0.8}>
                <Text style={styles.buttonText}>Voltar ao Início</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => {
                    // Abrir configurações do dispositivo
                    // Linking.openSettings();
                }}
                activeOpacity={0.8}>
                <Text style={styles.secondaryButtonText}>Abrir Configurações</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    iconContainer: {
        marginBottom: 30,
    },
    iconBg: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FEE2E2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1E293B',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 30,
    },
    infoCard: {
        backgroundColor: '#EFF6FF',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        gap: 12,
        marginBottom: 40,
        width: '100%',
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        color: '#1E40AF',
        lineHeight: 18,
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
});
