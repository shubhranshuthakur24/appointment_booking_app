import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../../utils/theme';
import Button from './Button';

interface Props {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ visible, title, message, onConfirm, onCancel }: Props) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <Button title="No" onPress={onCancel} variant="secondary" style={styles.button} />
            <Button title="Yes" onPress={onConfirm} variant="danger" style={styles.button} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radius.lg,
    width: '85%',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  message: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});

export default React.memo(ConfirmModal);
