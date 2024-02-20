import * as React from "react";
import {
  AccountScreen,
  AccountsScreen,
  HomeScreen,
  LoginScreen,
  NotificationScreen,
  OtpScreen,
  SettingsScreen,
  TransferScreen,
} from "../index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Cog6ToothIcon,
  HomeIcon,
  WalletIcon,
} from "react-native-heroicons/solid";
import { Platform, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ReviewScreen from "../screens/transfer/ReviewScreen";
import ValidationScreen from "../screens/transfer/ValidationScreen";
import { apiGetAccountProfiles } from "../services/operationsProfile";
import { loadAccountProfiles } from "../store/Account/accountSlice";
import ChangePasswordScreen from "../screens/settings/ChangePasswordScreen";
import {
  DocumentChartBarIcon,
  PlusIcon,
  QrCodeIcon,
} from "react-native-heroicons/outline";
import ReportScreen from "../screens/report/ReportScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function Screens() {
  const session = useSelector((state) => state.auth.session);
  const os = Platform.OS;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (session.signedIn) {
      apiGetAccountProfiles().then(({ data }) => {
        dispatch(loadAccountProfiles(data));
      });
    }
  }, [session]);
  const Application = () => {
    return (
      <BottomTab.Navigator
        initialRouteName={"Home"}
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            if (route.name === "Home") return <PlusIcon color={color} />;
            if (route.name === "Report")
              return <DocumentChartBarIcon size={28} color={color} />;
            if (route.name === "Accounts") return <QrCodeIcon color={color} />;
          },
          tabBarActiveTintColor: "#000064",
          tabBarShowLabel: false,
        })}
      >
        <BottomTab.Screen
          name="Accounts"
          component={AccountsScreen}
          options={{ tabBarLabel: "Portefeuilles" }}
        />
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View
                className={`absolute border bottom-2 border-white shadow-lg p-5 rounded-full ${
                  !focused ? "bg-white" : "bg-indigo-950 border-gray-200"
                }`}
              >
                <PlusIcon size={29} color={!focused ? color : "#fff"} />
              </View>
            ),
          }}
        />
        <BottomTab.Screen
          name="Report"
          component={ReportScreen}
          options={{ tabBarLabel: "Rapports" }}
        />
      </BottomTab.Navigator>
    );
  };
  return (
    <Stack.Navigator
      initialRouteName="Application"
      screenOptions={{ headerShown: false }}
    >
      {session.signedIn ? (
        <>
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Transfer" component={TransferScreen} />
          <Stack.Screen name="Review" component={ReviewScreen} />
          <Stack.Screen name="Validation" component={ValidationScreen} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="Application" component={Application} />
          {/* <Stack.Screen name="Otp" component={OtpScreen} /> */}
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default Screens;
