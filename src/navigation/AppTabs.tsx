import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../views/screens/DashboardScreen';
import AppointmentListScreen from '../views/screens/AppointmentListScreen';
import DoctorListScreen from '../views/screens/DoctorListScreen';
import { colors } from '../utils/theme';

export type AppTabParamList = {
  Dashboard: undefined;
  Appointments: undefined;
  Doctors: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Appointments" component={AppointmentListScreen} />
      <Tab.Screen name="Doctors" component={DoctorListScreen} />
    </Tab.Navigator>
  );
};

export default AppTabs;