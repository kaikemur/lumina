import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function LuxGauge({ lux, size = 200, strokeWidth = 12 }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const maxLux = 2000;
    const progress = Math.min((lux / maxLux) * 100, 100);
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    let strokeColor = '#10B981';
    if (lux < 100) strokeColor = '#EF4444';
    else if (lux < 300) strokeColor = '#F59E0B';
    else if (lux > 1000) strokeColor = '#EF4444';

    return (
        <View style={styles.container}>
            <Svg width={size} height={size} style={styles.svg}>
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#F1F5F9"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={styles.progressCircle}
                />
            </Svg>
            <View style={styles.centerText}>
                <Text style={styles.luxValue}>{Math.round(lux)}</Text>
                <Text style={styles.luxUnit}>lux</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    svg: {
        transform: [{ rotate: '-90deg' }],
    },
    progressCircle: {
        transition: 'stroke-dashoffset 1s ease',
    },
    centerText: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    luxValue: {
        fontSize: 48,
        fontWeight: '800',
        color: '#1E293B',
        lineHeight: 50,
    },
    luxUnit: {
        fontSize: 16,
        fontWeight: '600',
        color: '#64748B',
    },
});
