import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LuxGauge from '../components/LuxGauge';
import { getLuxStatus, formatDateTime, getRecommendation } from '../utils/luxUtils';

export default function DetailScreen({ route, navigation }) {
    const { measurement } = route.params;
    const luxInfo = getLuxStatus(measurement.lux);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhes da Medição</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.gaugeCard}>
                    <Text style={styles.gaugeLabel}>Luminosidade Registrada</Text>
                    <LuxGauge lux={measurement.lux} size={200} />
                    <View style={[styles.statusBadge, { backgroundColor: luxInfo.bgColor }]}>
                        <View style={[styles.statusDot, { backgroundColor: luxInfo.color }]} />
                        <Text style={[styles.statusText, { color: luxInfo.color }]}>
                            {luxInfo.status}
                        </Text>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Informações da Medição</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Data e Hora</Text>
                            <Text style={styles.infoValue}>{formatDateTime(measurement.date)}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Local</Text>
                            <Text style={styles.infoValue}>
                                {measurement.location || 'Não definido'}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Status</Text>
                            <View
                                style={[styles.statusInline, { backgroundColor: luxInfo.bgColor }]}>
                                <Text style={[styles.statusInlineText, { color: luxInfo.color }]}>
                                    {luxInfo.status}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {measurement.maxLux && (
                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Máximo</Text>
                                <Text style={styles.infoValue}>
                                    {Math.round(measurement.maxLux)} lux
                                </Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Mínimo</Text>
                                <Text style={styles.infoValue}>
                                    {Math.round(measurement.minLux || 0)} lux
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                <View style={styles.recommendationCard}>
                    <Ionicons name="bulb" size={24} color="#F59E0B" />
                    <Text style={styles.recommendationTitle}>Recomendação</Text>
                    <Text style={styles.recommendationText}>
                        {getRecommendation(measurement.lux)}
                    </Text>
                </View>

                <TouchableOpacity style={styles.exportBtn} activeOpacity={0.8}>
                    <Ionicons
                        name="download-outline"
                        size={20}
                        color="#FFFFFF"
                        style={{ marginRight: 8 }}
                    />
                    <Text style={styles.exportBtnText}>Exportar Relatório</Text>
                </TouchableOpacity>
            </ScrollView>
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
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
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
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    infoItem: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 14,
        color: '#1E293B',
        fontWeight: '600',
    },
    statusInline: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginTop: 4,
    },
    statusInlineText: {
        fontSize: 12,
        fontWeight: '600',
    },
    recommendationCard: {
        backgroundColor: '#FEF3C7',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    recommendationTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#92400E',
        marginTop: 8,
        marginBottom: 4,
    },
    recommendationText: {
        fontSize: 13,
        color: '#92400E',
        textAlign: 'center',
        lineHeight: 18,
    },
    exportBtn: {
        backgroundColor: '#2563EB',
        padding: 16,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    exportBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
