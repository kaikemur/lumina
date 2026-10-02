import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MeasurementProvider } from './src/context/MeasurementContext';
import SplashScreen from './src/screens/SplashScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import MeasurementScreen from './src/screens/MeasurementScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import DetailScreen from './src/screens/DetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SensorUnavailableScreen from './src/screens/SensorUnavailableScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <MeasurementProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Splash" component={SplashScreen} />
                    <Stack.Screen name="Dashboard" component={DashboardScreen} />
                    <Stack.Screen name="Histórico" component={HistoryScreen} />
                    <Stack.Screen name="Configurações" component={SettingsScreen} />
                    <Stack.Screen
                        name="Measurement"
                        component={MeasurementScreen}
                        options={{
                            presentation: 'modal',
                            animation: 'slide_from_bottom',
                        }}
                    />
                    <Stack.Screen name="Detail" component={DetailScreen} />
                    <Stack.Screen name="SensorUnavailable" component={SensorUnavailableScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </MeasurementProvider>
    );
}
