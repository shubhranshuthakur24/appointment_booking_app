import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { colors, spacing } from '../../utils/theme';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { login } from '../../controllers/authController';
import { isValidPhone } from '../../utils/validators';
import { useToast } from '../../hooks/useToast';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const toast = useToast();
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const onLogin = () => {
    if (!isValidPhone(phone)) {
      setPhoneError('Enter a valid 10-digit phone number.');
      toast.show('Please enter a valid phone number');
      return;
    }
    setPhoneError(null);
    dispatch(login(phone));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login using your phone number</Text>
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
      <Button title="Login" onPress={onLogin} disabled={loading} />
      {loading ? <ActivityIndicator color={colors.accent} style={styles.loader} /> : null}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.link}>
        <Text style={styles.linkText}>New here? Create an account</Text>
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

export default LoginScreen;
