import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing } from '../../utils/theme';
import Card from '../components/Card';
import Button from '../components/Button';
import ConfirmModal from '../components/ConfirmModal';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { cancelAppointmentById } from '../../controllers/appointmentController';

const AppointmentListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const appointments = useAppSelector((state) => state.appointments.items);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = useMemo(
    () => appointments.find((item) => item.id === selectedId) ?? null,
    [appointments, selectedId]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={appointments.length ? undefined : styles.emptyContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No appointments yet.</Text>}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text style={styles.title}>{item.doctorName}</Text>
            <Text style={styles.meta}>{item.department}</Text>
            <Text style={styles.meta}>{item.date} at {item.time}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
            <View style={styles.actions}>
              <Button
                title="Manage"
                onPress={() => navigation.navigate('AppointmentDetails' as never, {
                  appointmentId: item.id,
                } as never)}
                style={styles.actionButton}
              />
              <Button
                title="Cancel"
                onPress={() => setSelectedId(item.id)}
                variant="danger"
                style={styles.actionButton}
                disabled={item.status === 'Cancelled'}
              />
            </View>
          </Card>
        )}
      />
      <ConfirmModal
        visible={Boolean(selectedId)}
        title="Cancel Appointment"
        message={`Cancel appointment with ${selected?.doctorName ?? 'doctor'}?`}
        onCancel={() => setSelectedId(null)}
        onConfirm={() => {
          if (selectedId) dispatch(cancelAppointmentById(selectedId));
          setSelectedId(null);
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
  card: {
    marginBottom: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  meta: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  status: {
    color: colors.accent,
    marginBottom: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
  },
});

export default AppointmentListScreen;
