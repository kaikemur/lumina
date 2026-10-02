import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MeasurementCard from '../components/MeasurementCard';
import BottomNav from '../components/BottomNav';
import { useMeasurements } from '../context/MeasurementContext';

export default function HistoryScreen({ navigation }) {
    const { measurements, deleteMeasurement, clearMeasurements } = useMeasurements();

    const handleDelete = (id) => {
        Alert.alert('Excluir Medição', 'Tem certeza que deseja excluir esta medição?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', style: 'destructive', onPress: () => deleteMeasurement(id) },
        ]);
    };

    const handleClearAll = () => {
        Alert.alert('Limpar Histórico', 'Tem certeza que deseja excluir todas as medições?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Limpar Tudo',
                style: 'destructive',
                onPress: clearMeasurements,
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerLabel}>LUMINA WORK</Text>
                    <Text style={styles.headerTitle}>Histórico de Medições</Text>
                </View>
                {measurements.length > 0 && (
                    <TouchableOpacity onPress={handleClearAll} style={styles.clearBtn}>
                        <Ionicons name="trash-outline" size={20} color="#EF4444" />
                    </TouchableOpacity>
                )}
            </View>

            {measurements.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons name="document-text-outline" size={64} color="#CBD5E1" />
                    <Text style={styles.emptyTitle}>Nenhuma medição</Text>
                    <Text style={styles.emptySubtitle}>
                        Inicie uma medição para ver o histórico aqui
                    </Text>
                    <TouchableOpacity
                        style={styles.emptyBtn}
                        onPress={() => navigation.navigate('Main', { screen: 'Dashboard' })}>
                        <Text style={styles.emptyBtnText}>Ir para Dashboard</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={measurements}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onLongPress={() => handleDelete(item.id)}
                            activeOpacity={0.7}>
                            <MeasurementCard
                                measurement={item}
                                onPress={() => navigation.navigate('Detail', { measurement: item })}
                            />
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            )}

            <BottomNav navigation={navigation} activeScreen="Histórico" />
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
    clearBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#FEE2E2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        padding: 20,
        paddingBottom: 100,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1E293B',
        marginTop: 20,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#94A3B8',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 30,
    },
    emptyBtn: {
        backgroundColor: '#2563EB',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    emptyBtnText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
});
