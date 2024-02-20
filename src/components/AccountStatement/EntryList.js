import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import Entry from "./Entry";

export default function EntryList({
  transactions = [],
  isTransactionLoading = false,
  bgStyle = null
}) {
  return (
    <>
      {isTransactionLoading ? (
        <View className="space-y-3">
          {transactions.map((value, index) => (
            <Entry bgStyle={bgStyle} entry={value} key={index} />
          ))}
        </View>
      ) : (
        <ActivityIndicator size="small" color="#0000ff" />
      )}
    </>
  );
}
