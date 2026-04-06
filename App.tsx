import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from './src/navigation/RootNavigator';
import { persistor, store } from './src/store';
import { ToastProvider } from './src/hooks/useToast';
import { colors } from './src/utils/theme';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <StatusBar style="light" backgroundColor={colors.background} />
          <RootNavigator />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
}
