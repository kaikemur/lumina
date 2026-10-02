import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

export default function SettingsScreen({ navigation }) {
    const [notifications, setNotifications] = useState(true);
    const [autoSave, setAutoSave] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [unit, setUnit] = useState('lux');

    const handleReset = () => {
        Alert.alert(
            'Redefinir Configurações',
            'Tem certeza que deseja redefinir todas as configurações?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Redefinir',
                    style: 'destructive',
                    onPress: () => {
                        setNotifications(true);
                        setAutoSave(true);
                        setDarkMode(false);
                        setUnit('lux');
                    },
                },
            ],
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerLabel}>LUMINA WORK</Text>
                    <Text style={styles.headerTitle}>Configurações</Text>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Geral</Text>

                    <View style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="notifications" size={20} color="#2563EB" />
                            <View>
                                <Text style={styles.settingTitle}>Notificações</Text>
                                <Text style={styles.settingSubtitle}>
                                    Alertas sobre níveis de luminosidade
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={notifications}
                            onValueChange={setNotifications}
                            trackColor={{ false: '#E2E8F0', true: '#BAE6FD' }}
                            thumbColor={notifications ? '#2563EB' : '#94A3B8'}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="save" size={20} color="#10B981" />
                            <View>
                                <Text style={styles.settingTitle}>Salvamento Automático</Text>
                                <Text style={styles.settingSubtitle}>
                                    Salvar medições automaticamente
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={autoSave}
                            onValueChange={setAutoSave}
                            trackColor={{ false: '#E2E8F0', true: '#BAE6FD' }}
                            thumbColor={autoSave ? '#2563EB' : '#94A3B8'}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="moon" size={20} color="#8B5CF6" />
                            <View>
                                <Text style={styles.settingTitle}>Modo Escuro</Text>
                                <Text style={styles.settingSubtitle}>
                                    Interface com tema escuro
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={darkMode}
                            onValueChange={setDarkMode}
                            trackColor={{ false: '#E2E8F0', true: '#BAE6FD' }}
                            thumbColor={darkMode ? '#2563EB' : '#94A3B8'}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Unidade de Medida</Text>

                    <View style={styles.unitOptions}>
                        <TouchableOpacity
                            style={[styles.unitBtn, unit === 'lux' && styles.unitBtnActive]}
                            onPress={() => setUnit('lux')}>
                            <Text
                                style={[styles.unitText, unit === 'lux' && styles.unitTextActive]}>
                                Lux
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.unitBtn, unit === 'fc' && styles.unitBtnActive]}
                            onPress={() => setUnit('fc')}>
                            <Text style={[styles.unitText, unit === 'fc' && styles.unitTextActive]}>
                                Foot-candle
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sobre</Text>

                    <View style={styles.aboutCard}>
                        <View style={styles.aboutRow}>
                            <Text style={styles.aboutLabel}>Versão</Text>
                            <Text style={styles.aboutValue}>1.0.0</Text>
                        </View>
                        <View style={styles.aboutRow}>
                            <Text style={styles.aboutLabel}>Sensor</Text>
                            <Text style={styles.aboutValue}>Light Sensor</Text>
                        </View>
                        <View style={styles.aboutRow}>
                            <Text style={styles.aboutLabel}>Desenvolvido por</Text>
                            <Text style={styles.aboutValue}>LuminaWork Team</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.resetBtn} onPress={handleReset} activeOpacity={0.8}>
                    <Text style={styles.resetBtnText}>Redefinir Configurações</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
                    <Text style={styles.logoutBtnText}>Sair da Conta</Text>
                </TouchableOpacity>
            </ScrollView>

            <BottomNav navigation={navigation} activeScreen="Configurações" />
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
    content: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 13,
        color: '#94A3B8',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
    },
    settingItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    settingTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1E293B',
    },
    settingSubtitle: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 2,
    },
    unitOptions: {
        flexDirection: 'row',
        gap: 12,
    },
    unitBtn: {
        flex: 1,
        padding: 14,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E2E8F0',
    },
    unitBtnActive: {
        borderColor: '#2563EB',
        backgroundColor: '#EFF6FF',
    },
    unitText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
    },
    unitTextActive: {
        color: '#2563EB',
    },
    aboutCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    aboutRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    aboutLabel: {
        fontSize: 14,
        color: '#64748B',
    },
    aboutValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
    },
    resetBtn: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 14,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F59E0B',
        marginBottom: 12,
    },
    resetBtnText: {
        color: '#F59E0B',
        fontSize: 16,
        fontWeight: '600',
    },
    logoutBtn: {
        backgroundColor: '#EF4444',
        padding: 16,
        borderRadius: 14,
        alignItems: 'center',
        marginBottom: 40,
    },
    logoutBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
