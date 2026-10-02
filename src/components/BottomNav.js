import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNav({ navigation, activeScreen }) {
    const tabs = [
        {
            name: 'Dashboard',
            icon: 'home',
            activeIcon: 'home',
            label: 'Início',
        },
        {
            name: 'Histórico',
            icon: 'time-outline',
            activeIcon: 'time',
            label: 'Histórico',
        },
        {
            name: 'Configurações',
            icon: 'settings-outline',
            activeIcon: 'settings',
            label: 'Configurações',
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                {tabs.map((tab) => {
                    const isActive = activeScreen === tab.name;
                    return (
                        <TouchableOpacity
                            key={tab.name}
                            style={styles.tab}
                            onPress={() => {
                                if (activeScreen !== tab.name) {
                                    navigation.navigate('Main', {
                                        screen: tab.name,
                                    });
                                }
                            }}
                            activeOpacity={0.7}>
                            <Ionicons
                                name={isActive ? tab.activeIcon : tab.icon}
                                size={24}
                                color={isActive ? '#2563EB' : '#94A3B8'}
                            />
                            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                                {tab.label}
                            </Text>
                            {isActive && <View style={styles.activeIndicator} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        paddingBottom: 20,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 8,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        position: 'relative',
    },
    tabLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#94A3B8',
        marginTop: 4,
    },
    tabLabelActive: {
        color: '#2563EB',
    },
    activeIndicator: {
        position: 'absolute',
        top: 0,
        width: 40,
        height: 3,
        backgroundColor: '#2563EB',
        borderRadius: 2,
    },
});
