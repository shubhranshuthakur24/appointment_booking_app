import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing } from '../../utils/theme';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { logout } from '../../controllers/authController';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi {user?.fullName ?? 'there'}</Text>
      <Text style={styles.subtitle}>Manage your appointments</Text>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>My Appointments</Text>
        <Text style={styles.cardText}>View and manage your upcoming visits.</Text>
        <Button title="Open" onPress={() => navigation.navigate('Appointments' as never)} />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Book New Appointment</Text>
        <Text style={styles.cardText}>Choose a department and a doctor.</Text>
        <Button title="Book" onPress={() => navigation.navigate('BookAppointment' as never)} />
      </Card>

      <Button title="Logout" onPress={() => dispatch(logout())} variant="secondary" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  card: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  cardText: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
});

export default DashboardScreen;
