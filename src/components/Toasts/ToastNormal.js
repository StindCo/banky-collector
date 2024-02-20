import { View, Text } from "react-native";
import React from "react";
import { InformationCircleIcon } from "react-native-heroicons/outline";

export default function ToastNormal({ message = null }) {
  return (
    <View className="p-3 px-5 mt-7 rounded-xl flex flex-row items-center space-x-2 bg-white">
      <InformationCircleIcon color={"#000"} />
      <Text className="font-[Poppins] text-black">{message}</Text>
    </View>
  );
}
