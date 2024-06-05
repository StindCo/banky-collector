import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import Collect from "./Collect";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CollectList({
  collects = [],

  isTransactionLoading = false,
  bgStyle = null,
}) {
  return (
    <>
      {isTransactionLoading ? (
        <View className="space-y-3">
          {collects.map((value, index) => (
            <Collect bgStyle={bgStyle} collect={value} key={index} />
          ))}

          {collects.length === 0 && (
            <View className="flex-col space-y-5 my-3 items-center justify-center">
              <View className="p-6 bg-zinc-200 rounded-full">
                <MaterialCommunityIcons
                  name={"archive-alert-outline"}
                  size={70}
                  color="#f59e0b"
                />
              </View>

              <Text className="text-xs font-[Poppins]">
                Aucune collecte effectuée
              </Text>
            </View>
          )}
        </View>
      ) : (
        <ActivityIndicator size="small" color="#0000ff" />
      )}
    </>
  );
}
