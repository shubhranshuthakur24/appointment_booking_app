import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../../utils/theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  style?: ViewStyle;
}

const Button = ({ title, onPress, variant = 'primary', disabled, style }: Props) => {
  const backgroundColor =
    variant === 'danger' ? colors.danger : variant === 'secondary' ? colors.card : colors.accent;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, opacity: disabled ? 0.6 : pressed ? 0.85 : 1 },
        style,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  text: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default React.memo(Button);
