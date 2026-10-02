import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getLuxStatus, formatDateTime } from '../utils/luxUtils';

export default function MeasurementCard({ measurement, onPress }) {
    const luxInfo = getLuxStatus(measurement.lux);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.left}>
                <View style={[styles.statusDot, { backgroundColor: luxInfo.color }]} />
                <View>
                    <Text style={styles.lux}>{Math.round(measurement.lux)} lux</Text>
                    <Text style={styles.status}>{luxInfo.status}</Text>
                </View>
            </View>
            <View style={styles.right}>
                <Text style={styles.date}>{formatDateTime(measurement.date)}</Text>
                <Text style={styles.location}>{measurement.location || 'Local não definido'}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    lux: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
    },
    status: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
        marginTop: 2,
    },
    right: {
        alignItems: 'flex-end',
    },
    date: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
    },
    location: {
        fontSize: 11,
        color: '#94A3B8',
        marginTop: 2,
    },
});
