import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InfoCard({ label, value, icon, color }) {
    return (
        <View style={styles.container}>
            <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                <Text style={[styles.icon, { color: color }]}>{icon}</Text>
            </View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    icon: {
        fontSize: 18,
        fontWeight: '600',
    },
    label: {
        fontSize: 11,
        color: '#94A3B8',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.3,
        marginBottom: 4,
    },
    value: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
    },
});
