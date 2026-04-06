import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { colors, spacing } from '../../utils/theme';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { signup } from '../../controllers/authController';
import { isValidName, isValidPhone } from '../../utils/validators';
import { useToast } from '../../hooks/useToast';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const toast = useToast();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const onSignup = () => {
    const isNameOk = isValidName(fullName);
    const isPhoneOk = isValidPhone(phone);
    setNameError(isNameOk ? null : 'Enter your full name.');
    setPhoneError(isPhoneOk ? null : 'Enter a valid 10-digit phone number.');

    if (!isNameOk || !isPhoneOk) {
      toast.show('Please fix the form errors');
      return;
    }

    dispatch(signup(fullName, phone));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Let’s get you started</Text>
      <Input
        label="Full Name"
        value={fullName}
        onChangeText={setFullName}
        placeholder="Your name"
        error={nameError}
        style={styles.input}
      />
      <Input
        label="Phone Number"
        value={phone}
        onChangeText={setPhone}
        placeholder="10-digit number"
        keyboardType="phone-pad"
        error={phoneError}
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Signup" onPress={onSignup} disabled={loading} />
      {loading ? <ActivityIndicator color={colors.accent} style={styles.loader} /> : null}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  input: {
    marginBottom: spacing.md,
  },
  error: {
    color: colors.danger,
    marginBottom: spacing.sm,
  },
  loader: {
    marginTop: spacing.md,
  },
  link: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  linkText: {
    color: colors.accent,
  },
});

export default SignupScreen;
