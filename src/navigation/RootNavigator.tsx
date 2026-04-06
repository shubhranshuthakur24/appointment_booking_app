import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import BookAppointmentScreen from '../views/screens/BookAppointmentScreen';
import AppointmentDetailsScreen from '../views/screens/AppointmentDetailsScreen';
import { useAppSelector } from '../hooks/useAppSelector';
import { colors } from '../utils/theme';

export type RootStackParamList = {
  Auth: undefined;
  Tabs: undefined;
  BookAppointment: undefined;
  AppointmentDetails: { appointmentId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.background,
          card: colors.card,
          text: colors.textPrimary,
          border: colors.border,
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="Tabs" component={AppTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
        <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
        <Stack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
