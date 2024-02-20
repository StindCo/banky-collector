import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PersistGate } from "redux-persist/integration/react";
import { StatusBar } from "expo-status-bar";
import store, { persistor } from "./src/store";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider } from "react-redux";
import Screens from "./src/navigation/Screens";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import ToastNormal from "./src/components/Toasts/ToastNormal";
import ToastWarning from "./src/components/Toasts/ToastWarning";
import ToastError from "./src/components/Toasts/ToastError";

const Stack = createNativeStackNavigator();

const CUSTOM_TOASTS = {
  cmb_normal: (toast) => <ToastNormal message={toast?.message} />,
  cmb_warning: (toast) => <ToastWarning message={toast?.message} />,
  cmb_error: (toast) => <ToastError message={toast?.message} />,
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins: require("./assets/fonts/PoppinsRegular.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer onLayout={onLayoutRootView}>
          <ToastProvider placement="top" renderType={CUSTOM_TOASTS}>
            <StatusBar style="auto" />
            <Screens />
          </ToastProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
