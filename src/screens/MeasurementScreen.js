import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LightSensor } from 'expo-sensors'; // <-- IMPORTAÇÃO CORRIGIDA
import { Ionicons } from '@expo/vector-icons';
import LuxGauge from '../components/LuxGauge';
import { useMeasurements } from '../context/MeasurementContext';
import { getLuxStatus, getRecommendation } from '../utils/luxUtils';

export default function MeasurementScreen({ navigation }) {
    const { currentLux, setCurrentLux, saveMeasurement } = useMeasurements();
    const [subscription, setSubscription] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [maxLux, setMaxLux] = useState(0);
    const [minLux, setMinLux] = useState(9999);

    useEffect(() => {
        startSensor();
        const timer = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
            if (subscription) subscription.remove();
        };
    }, []);

    const startSensor = () => {
        const sub = LightSensor.addListener((data) => {
            // <-- MÉTODO CORRIGIDO
            const lux = data.illuminance || 0;
            setCurrentLux(lux);
            if (lux > maxLux) setMaxLux(lux);
            if (lux < minLux && lux > 0) setMinLux(lux);
        });
        setSubscription(sub);
        LightSensor.setUpdateInterval(500);
    };

    const stopAndSave = () => {
        if (subscription) subscription.remove();

        const luxInfo = getLuxStatus(currentLux);
        const measurement = {
            id: Date.now().toString(),
            lux: currentLux,
            date: new Date().toISOString(),
            location: 'Escritório Principal',
            status: luxInfo.status,
            maxLux,
            minLux: minLux === 9999 ? 0 : minLux,
            duration: elapsedTime,
        };

        saveMeasurement(measurement);
        Alert.alert('Medição Concluída', `${Math.round(currentLux)} lux registrado!`, [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const luxInfo = getLuxStatus(currentLux);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => {
                        if (subscription) subscription.remove();
                        navigation.goBack();
                    }}>
                    <Ionicons name="close" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Medição em Andamento</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.timerCard}>
                    <Text style={styles.timerLabel}>Tempo de Medição</Text>
                    <Text style={styles.timerValue}>{formatTime(elapsedTime)}</Text>
                </View>

                <View style={styles.gaugeCard}>
                    <LuxGauge lux={currentLux} size={240} />
                    <View style={[styles.statusBadge, { backgroundColor: luxInfo.bgColor }]}>
                        <View style={[styles.statusDot, { backgroundColor: luxInfo.color }]} />
                        <Text style={[styles.statusText, { color: luxInfo.color }]}>
                            {luxInfo.status}
                        </Text>
                    </View>
                    <Text style={styles.recommendation}>{getRecommendation(currentLux)}</Text>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Mín</Text>
                        <Text style={styles.statValue}>
                            {Math.round(minLux === 9999 ? 0 : minLux)}
                        </Text>
                        <Text style={styles.statUnit}>lux</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Máx</Text>
                        <Text style={styles.statValue}>{Math.round(maxLux)}</Text>
                        <Text style={styles.statUnit}>lux</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.saveBtn} onPress={stopAndSave} activeOpacity={0.8}>
                    <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#FFFFFF"
                        style={{ marginRight: 8 }}
                    />
                    <Text style={styles.saveBtnText}>Salvar Medição</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
    content: { flex: 1, padding: 20 },
    timerCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    timerLabel: { fontSize: 13, color: '#94A3B8', fontWeight: '500', marginBottom: 8 },
    timerValue: { fontSize: 36, fontWeight: '700', color: '#2563EB', fontFamily: 'monospace' },
    gaugeCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 12,
        gap: 6,
    },
    statusDot: { width: 8, height: 8, borderRadius: 4 },
    statusText: { fontSize: 13, fontWeight: '600' },
    recommendation: {
        fontSize: 13,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 18,
    },
    statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
    statBox: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    statLabel: { fontSize: 12, color: '#94A3B8', fontWeight: '500', marginBottom: 8 },
    statValue: { fontSize: 28, fontWeight: '700', color: '#1E293B' },
    statUnit: { fontSize: 12, color: '#64748B', marginTop: 4 },
    saveBtn: {
        backgroundColor: '#10B981',
        padding: 16,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
