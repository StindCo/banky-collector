import { View, Text } from "react-native";
import React from "react";
import { ExclamationCircleIcon } from "react-native-heroicons/outline";

export default function ToastError({ message = null }) {
  return (
    <View className="p-3 px-5 mt-7 rounded-xl flex flex-row items-center space-x-2 bg-rose-500">
      <ExclamationCircleIcon color={"#fff"} />
      <Text className="font-[Poppins] text-white">{message}</Text>
    </View>
  );
}
