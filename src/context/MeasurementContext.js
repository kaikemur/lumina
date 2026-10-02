import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MeasurementContext = createContext();

export function MeasurementProvider({ children }) {
    const [measurements, setMeasurements] = useState([]);
    const [currentLux, setCurrentLux] = useState(0);
    const [isMeasuring, setIsMeasuring] = useState(false);

    useEffect(() => {
        loadMeasurements();
    }, []);

    const loadMeasurements = async () => {
        try {
            const stored = await AsyncStorage.getItem('measurements');
            if (stored) {
                setMeasurements(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Erro ao carregar medições:', error);
        }
    };

    const saveMeasurement = async (measurement) => {
        const newMeasurements = [measurement, ...measurements];
        setMeasurements(newMeasurements);
        try {
            await AsyncStorage.setItem('measurements', JSON.stringify(newMeasurements));
        } catch (error) {
            console.error('Erro ao salvar medição:', error);
        }
    };

    const deleteMeasurement = async (id) => {
        const newMeasurements = measurements.filter((m) => m.id !== id);
        setMeasurements(newMeasurements);
        try {
            await AsyncStorage.setItem('measurements', JSON.stringify(newMeasurements));
        } catch (error) {
            console.error('Erro ao deletar medição:', error);
        }
    };

    const clearMeasurements = async () => {
        setMeasurements([]);
        try {
            await AsyncStorage.removeItem('measurements');
        } catch (error) {
            console.error('Erro ao limpar medições:', error);
        }
    };

    return (
        <MeasurementContext.Provider
            value={{
                measurements,
                currentLux,
                setCurrentLux,
                isMeasuring,
                setIsMeasuring,
                saveMeasurement,
                deleteMeasurement,
                clearMeasurements,
            }}>
            {children}
        </MeasurementContext.Provider>
    );
}

export function useMeasurements() {
    return useContext(MeasurementContext);
}
