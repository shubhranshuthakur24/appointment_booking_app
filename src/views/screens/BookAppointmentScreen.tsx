import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';
import { colors, spacing } from '../../utils/theme';
import { DEPARTMENTS } from '../../utils/constants';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { loadDoctors } from '../../controllers/doctorController';
import { bookAppointment } from '../../controllers/appointmentController';
import Button from '../components/Button';
import Card from '../components/Card';
import { isValidDate } from '../../utils/validators';
import { useToast } from '../../hooks/useToast';
import { formatTime } from '../../utils/helpers';

const BookAppointmentScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { list: doctors, loading: doctorLoading } = useAppSelector((state) => state.doctors);
  const { loading: bookingLoading, error } = useAppSelector((state) => state.appointments);
  const user = useAppSelector((state) => state.auth.user);

  const [department, setDepartment] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateError, setDateError] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);

  useEffect(() => {
    if (!doctors.length) dispatch(loadDoctors());
  }, [dispatch, doctors.length]);

  const availableDoctors = useMemo(
    () => doctors.filter((doc) => doc.department === department),
    [doctors, department]
  );

  const onBook = async () => {
    const dateOk = Boolean(selectedDate && isValidDate(selectedDate));
    const timeOk = Boolean(time);
    setDateError(dateOk ? null : 'Use YYYY-MM-DD');
    setTimeError(timeOk ? null : 'Pick a time');

    if (!department || !doctorId || !dateOk || !timeOk || !user || !selectedDate || !time) {
      toast.show('Please complete all fields');
      return;
    }

    const doctor = doctors.find((doc) => doc.id === doctorId);
    if (!doctor) return;

    await dispatch(
      bookAppointment({
        userId: user.id,
        department,
        doctorId: doctor.id,
        doctorName: doctor.name,
        date: selectedDate,
        time: formatTime(time),
      })
    );

    if (!error) {
      toast.show('Appointment booked');
      navigation.navigate('Tabs' as never, { screen: 'Appointments' } as never);
    }
  };

  const timeLabel = time ? formatTime(time) : 'Select time';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>

      <Text style={styles.sectionTitle}>1. Select Department</Text>
      <FlatList
        horizontal
        data={DEPARTMENTS}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
        renderItem={({ item }) => (
          <Button
            title={item}
            onPress={() => {
              setDepartment(item);
              setDoctorId(null);
            }}
            variant={department === item ? 'primary' : 'secondary'}
            style={styles.pill}
          />
        )}
      />

      <Text style={styles.sectionTitle}>2. Choose Doctor</Text>
      {doctorLoading ? (
        <ActivityIndicator color={colors.accent} />
      ) : (
        <FlatList
          data={availableDoctors}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Select a department to see doctors</Text>
          }
          renderItem={({ item }) => (
            <Card style={styles.doctorCard}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.meta}>{item.availability.join(', ')}</Text>
              <Button
                title={doctorId === item.id ? 'Selected' : 'Select'}
                onPress={() => setDoctorId(item.id)}
                variant={doctorId === item.id ? 'primary' : 'secondary'}
              />
            </Card>
          )}
        />
      )}

      <Text style={styles.sectionTitle}>3. Pick Date & Time</Text>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          setDateError(null);
        }}
        markedDates={
          selectedDate
            ? {
                [selectedDate]: { selected: true, selectedColor: colors.accent },
              }
            : undefined
        }
        theme={{
          calendarBackground: colors.card,
          dayTextColor: colors.textPrimary,
          monthTextColor: colors.textPrimary,
          textDisabledColor: colors.textSecondary,
          arrowColor: colors.accent,
          todayTextColor: colors.accent,
        }}
        style={styles.calendar}
      />
      {dateError ? <Text style={styles.error}>{dateError}</Text> : null}

      <Card style={styles.timeCard}>
        <Text style={styles.meta}>Time</Text>
        <Text style={styles.timeValue}>{timeLabel}</Text>
        <Button title="Pick Time" onPress={() => setShowTimePicker(true)} />
        {timeError ? <Text style={styles.error}>{timeError}</Text> : null}
      </Card>

      {showTimePicker ? (
        <DateTimePicker
          mode="time"
          value={time ?? new Date()}
          onChange={(_, selected) => {
            setShowTimePicker(false);
            if (selected) {
              setTime(selected);
              setTimeError(null);
            }
          }}
        />
      ) : null}

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Confirm Booking" onPress={onBook} disabled={bookingLoading} />
      {bookingLoading ? <ActivityIndicator color={colors.accent} style={styles.loader} /> : null}
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
  sectionTitle: {
    color: colors.textSecondary,
    marginVertical: spacing.sm,
  },
  row: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  pill: {
    minWidth: 90,
  },
  doctorCard: {
    width: 180,
    marginRight: spacing.sm,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  meta: {
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  calendar: {
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  timeCard: {
    marginBottom: spacing.md,
  },
  timeValue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  error: {
    color: colors.danger,
    marginBottom: spacing.sm,
  },
  loader: {
    marginTop: spacing.md,
  },
  emptyText: {
    color: colors.textSecondary,
  },
});

export default BookAppointmentScreen;
