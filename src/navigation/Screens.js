import * as React from "react";
import { HomeScreen, LoginScreen, NotificationScreen } from "../index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Cog6ToothIcon,
  HomeIcon,
  WalletIcon,
} from "react-native-heroicons/solid";
import { Platform, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { apiGetAccountProfiles } from "../services/operationsProfile";
import { loadAccountProfiles } from "../store/Account/accountSlice";
import ChangePasswordScreen from "../screens/settings/ChangePasswordScreen";
import {
  DocumentChartBarIcon,
  PlusIcon,
  QrCodeIcon,
} from "react-native-heroicons/outline";
import ReportScreen from "../screens/report/ReportScreen";
import SyncScreen from "../screens/Sync/SyncScreen";
import ReviewScreen from "../screens/newCollect/ReviewScreen";
import ValidationScreen from "../screens/newCollect/ValidationScreen";
import CollectForm from "../components/CollectElement/CollectForm";

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
            if (route.name === "Sync") return <QrCodeIcon color={color} />;
          },
          tabBarActiveTintColor: "#000064",
          tabBarShowLabel: false,
        })}
      >
        <BottomTab.Screen
          name="Sync"
          component={SyncScreen}
          options={{ tabBarLabel: "Synchronisation" }}
        />
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View
                className={`absolute border bottom-3 border-white shadow-lg p-4 rounded-full ${
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
          <Stack.Screen name="Review" component={ReviewScreen} />
          <Stack.Screen name="Validation" component={ValidationScreen} />
          <Stack.Screen
            name="CollectForm"
            component={CollectForm}
            options={{
              headerShown: false,
            }}
          />
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
