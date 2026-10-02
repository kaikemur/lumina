import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useLightSensor } from 'expo-sensors';
import { Ionicons } from '@expo/vector-icons';
import LuxGauge from '../components/LuxGauge';
import InfoCard from '../components/InfoCard';
import BottomNav from '../components/BottomNav';
import { useMeasurements } from '../context/MeasurementContext';
import { getLuxStatus, getRecommendation } from '../utils/luxUtils';

export default function DashboardScreen({ navigation }) {
    const { isAvailable } = useLightSensor;
    const { currentLux, setCurrentLux, saveMeasurement } = useMeasurements();
    const [isMeasuring, setIsMeasuring] = useState(false);
    const [subscription, setSubscription] = useState(null);

    const luxInfo = getLuxStatus(currentLux);

    useEffect(() => {
        checkSensor();
        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, []);

    const checkSensor = async () => {
        const available = await isAvailable();
        if (!available) {
            navigation.navigate('SensorUnavailable');
        }
    };

    const startMeasurement = () => {
        if (subscription) {
            subscription.remove();
        }

        const sub = useLightSensor.addListener((data) => {
            setCurrentLux(data.illuminance || 0);
        });

        setSubscription(sub);
        useLightSensor.setUpdateInterval(500);
        setIsMeasuring(true);
    };

    const stopMeasurement = () => {
        if (subscription) {
            subscription.remove();
            setSubscription(null);
        }
        setIsMeasuring(false);

        if (currentLux > 0) {
            const measurement = {
                id: Date.now().toString(),
                lux: currentLux,
                date: new Date().toISOString(),
                location: 'Escritório Principal',
                status: luxInfo.status,
            };
            saveMeasurement(measurement);
            Alert.alert('Medição Salva', `${Math.round(currentLux)} lux registrado com sucesso!`);
        }
    };

    const avgLux = currentLux > 0 ? currentLux : 0;
    const maxLux = currentLux > 0 ? currentLux * 1.2 : 0;
    const minLux = currentLux > 0 ? currentLux * 0.8 : 0;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerLabel}>LUMINA WORK</Text>
                    <Text style={styles.headerTitle}>Dashboard</Text>
                </View>
                <TouchableOpacity style={styles.notificationBtn}>
                    <Ionicons name="notifications-outline" size={24} color="#64748B" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.gaugeCard}>
                    <Text style={styles.gaugeLabel}>Luminosidade Atual</Text>
                    <LuxGauge lux={currentLux} size={220} />
                    <View style={[styles.statusBadge, { backgroundColor: luxInfo.bgColor }]}>
                        <View style={[styles.statusDot, { backgroundColor: luxInfo.color }]} />
                        <Text style={[styles.statusText, { color: luxInfo.color }]}>
                            {luxInfo.status}
                        </Text>
                    </View>
                    <Text style={styles.recommendation}>{getRecommendation(currentLux)}</Text>
                </View>

                <View style={styles.infoCards}>
                    <InfoCard
                        label="Média"
                        value={`${Math.round(avgLux)} lux`}
                        icon="📊"
                        color="#2563EB"
                    />
                    <InfoCard
                        label="Máximo"
                        value={`${Math.round(maxLux)} lux`}
                        icon="📈"
                        color="#10B981"
                    />
                    <InfoCard
                        label="Mínimo"
                        value={`${Math.round(minLux)} lux`}
                        icon="📉"
                        color="#F59E0B"
                    />
                    <InfoCard label="Medições" value="12" icon="📋" color="#8B5CF6" />
                </View>

                <TouchableOpacity
                    style={[styles.measureBtn, isMeasuring && styles.stopBtn]}
                    onPress={isMeasuring ? stopMeasurement : startMeasurement}
                    activeOpacity={0.8}>
                    <Ionicons
                        name={isMeasuring ? 'stop-circle' : 'play-circle'}
                        size={24}
                        color="#FFFFFF"
                        style={{ marginRight: 8 }}
                    />
                    <Text style={styles.measureBtnText}>
                        {isMeasuring ? 'Parar Medição' : 'Iniciar Medição'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <BottomNav navigation={navigation} activeScreen="Dashboard" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
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
    headerLabel: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
        letterSpacing: 0.5,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1E293B',
        marginTop: 4,
    },
    notificationBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        padding: 20,
    },
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
    gaugeLabel: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
        marginBottom: 20,
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
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 13,
        fontWeight: '600',
    },
    recommendation: {
        fontSize: 13,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 18,
    },
    infoCards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 20,
    },
    measureBtn: {
        backgroundColor: '#2563EB',
        padding: 16,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    stopBtn: {
        backgroundColor: '#EF4444',
    },
    measureBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
