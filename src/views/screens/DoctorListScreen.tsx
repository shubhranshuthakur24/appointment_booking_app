import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../../utils/theme';
import { DEPARTMENTS } from '../../utils/constants';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { loadDoctors } from '../../controllers/doctorController';

const DoctorListScreen = () => {
  const dispatch = useAppDispatch();
  const { list: doctors, loading } = useAppSelector((state) => state.doctors);
  const [department, setDepartment] = useState<string>('ENT');

  useEffect(() => {
    if (!doctors.length) dispatch(loadDoctors());
  }, [dispatch, doctors.length]);

  const filtered = useMemo(
    () => doctors.filter((doc) => doc.department === department),
    [doctors, department]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctors</Text>
      <FlatList
        horizontal
        data={DEPARTMENTS}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
        renderItem={({ item }) => (
          <Button
            title={item}
            onPress={() => setDepartment(item)}
            variant={department === item ? 'primary' : 'secondary'}
            style={styles.pill}
          />
        )}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={filtered.length ? undefined : styles.emptyContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{loading ? 'Loading...' : 'No doctors found.'}</Text>
        }
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.meta}>Department: {item.department}</Text>
            <Text style={styles.meta}>Available: {item.availability.join(', ')}</Text>
          </Card>
        )}
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
  row: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  pill: {
    minWidth: 90,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  meta: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
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

export default DoctorListScreen;
