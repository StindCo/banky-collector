import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import Collect from "./Collect";

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
        </View>
      ) : (
        <ActivityIndicator size="small" color="#0000ff" />
      )}
    </>
  );
}
