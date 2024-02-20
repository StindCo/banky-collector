import * as React from "react";
import {
  View,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Icon } from "@rneui/themed";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightIcon,
  ArrowsRightLeftIcon,
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "../../utils/hooks/useAuth";

function SettingsScreen() {
  const os = Platform.OS;
  const navigation = useNavigation();

  const user = useSelector((state) => state.auth.user);

  const { signOut } = useAuth();

  return (
    <View className={`flex w-full h-full ${os ? "mt-16" : ""}`}>
      <View className="flex-row justify-between items-center pb-3 px-5">
        <View className={`w-1/3  `}></View>
        <View className="w-1/3">
          <Text className="text-base font-[Poppins] text-center text-black">
            Paramètres
          </Text>
        </View>
        <View className="w-1/3"></View>
      </View>
      <ScrollView>
        <View className="flex items-center mt-5 px-5 space-y-4">
          <View className="w-full">
            <View className="flex-row justify-start w-full bg-white border border-gray-200 rounded-lg py-4 px-3 space-x-3">
              <View
                className={`rounded-full ${
                  os !== "ios" && "border border-primary"
                } `}
              >
                <Image
                  source={require("../../../assets/favicon.png")}
                  className={`w-16 h-16 rounded-full ${
                    os === "ios" && "border border-primary"
                  }`}
                />
              </View>
              <View className="justify-around">
                <Text className="text-lg font-[PoppinsBold] font-semibold">
                  {user.displayName}
                </Text>
                <Text className="text-sm font-[Poppins] text-gray-600">
                  {user?.phoneNumber ?? user.email}
                </Text>
              </View>
            </View>
          </View>
          {/*<View className="w-full space-y-2">
                        <TouchableOpacity
                            className="flex-row justify-between items-center w-full bg-white border border-gray-200 rounded-lg py-3 px-3"
                            onPress={() => navigation.navigate('Notification')}>
                            <View className="flex-row justify-between items-center space-x-3">
                                <View className={`bg-gray-50 justify-center items-center w-12 h-12 rounded-full`}>
                                    <BellIcon color="#000064" size="32"/>
                                </View>
                                <View className="justify-between space-y-1">
                                    <Text className="text-sm font-semibold">Notifications</Text>
                                    <Text className="text-sm text-gray-600">Consultez vos notifications</Text>
                                </View>
                            </View>
                            <View className="right-0">
                                <ChevronRightIcon color="#000064" size="22"/>
                            </View>
                        </TouchableOpacity>
                    </View>*/}
          <View className="w-full space-y-1">
            <View>
              <Text className="text-lg text-gray-800 font-medium font-[Poppins]">
                Sécurité
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("ChangePassword")}
              className="flex-row justify-between items-center  w-full bg-white border border-gray-200 rounded-lg py-5"
            >
              <View className="flex-row justify-between items-center space-x-3">
                <View
                  className={`bg-gray-50 justify-center items-center w-12 h-12 rounded-full`}
                >
                  <ShieldCheckIcon color="#000064" size="32" />
                </View>
                <View className="justify-between space-y-1">
                  <Text className="text-sm font-semibold font-[Poppins]">
                    Sécurité
                  </Text>
                  <Text className="text-sm font-[Poppins] text-gray-600 w-[200px]">
                    Changer de mot de passe
                  </Text>
                </View>
              </View>
              <View className="right-4">
                <ChevronRightIcon color="#000064" size="22" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="w-full space-y-1">
            <View>
              <Text className="text-lg text-gray-800 font-medium font-[Poppins]">
                Support
              </Text>
            </View>
            <TouchableOpacity className="flex-row justify-between items-center w-full  bg-white border border-gray-200 rounded-lg py-5 px-3">
              <View className="flex-row justify-between items-center space-x-3">
                <View
                  className={`bg-gray-50 justify-center items-center w-12 h-12 rounded-full`}
                >
                  <ChatBubbleLeftRightIcon color="#000064" size="32" />
                </View>
                <View className="justify-between space-y-1">
                  <Text className="text-sm font-semibold">Contactez-nous</Text>
                  <Text className="text-sm font-[Poppins] text-gray-600 w-[200px]">
                    Envoyez un courriel, appelez-nous ou retrouvez-nous sur les
                    médias sociaux
                  </Text>
                </View>
              </View>
              <View className="right-2">
                <ChevronRightIcon color="#000064" size="22" />
              </View>
            </TouchableOpacity>
          </View>

          <View className="w-full space-y-1">
            <TouchableOpacity
              onPress={() => signOut()}
              className="flex-row justify-between items-center w-full  bg-white border border-red-300 rounded-lg py-3 px-3"
            >
              <View className="flex-row justify-between items-center space-x-3">
                <View className={``}>
                  <ArrowLeftEndOnRectangleIcon color="#ff0000" size="30" />
                </View>
                <View className="justify-between space-y-1">
                  <Text className="text-sm font-[Poppins] font-semibold text-red-500">
                    Déconnexion
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default SettingsScreen;
