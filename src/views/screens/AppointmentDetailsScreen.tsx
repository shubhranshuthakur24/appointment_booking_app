import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { cancelAppointmentById } from '../../controllers/appointmentController';
import { colors, spacing } from '../../utils/theme';
import Card from '../components/Card';
import Button from '../components/Button';
import ConfirmModal from '../components/ConfirmModal';

const AppointmentDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'AppointmentDetails'>>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const appointment = useAppSelector((state) =>
    state.appointments.items.find((item) => item.id === route.params.appointmentId)
  );

  const statusColor = useMemo(
    () => (appointment?.status === 'Cancelled' ? colors.danger : colors.accent),
    [appointment?.status]
  );

  if (!appointment) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Appointment not found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Details</Text>
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>{appointment.doctorName}</Text>
        <Text style={styles.meta}>Department: {appointment.department}</Text>
        <Text style={styles.meta}>Date: {appointment.date}</Text>
        <Text style={styles.meta}>Time: {appointment.time}</Text>
        <Text style={[styles.meta, { color: statusColor }]}>Status: {appointment.status}</Text>
      </Card>
      <Button title="Manage" onPress={() => navigation.goBack()} style={styles.button} />
      <Button
        title="Cancel Appointment"
        onPress={() => setShowModal(true)}
        variant="danger"
        disabled={appointment.status === 'Cancelled'}
      />
      <ConfirmModal
        visible={showModal}
        title="Cancel Appointment"
        message="Are you sure you want to cancel this appointment?"
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          dispatch(cancelAppointmentById(appointment.id));
          setShowModal(false);
        }}
      />
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
    fontSize: 24,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  card: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  meta: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  button: {
    marginBottom: spacing.sm,
  },
});

export default AppointmentDetailsScreen;
