import { View, Text } from "react-native";
import React from "react";
import Transaction from "./Transaction";
import { ActivityIndicator } from "react-native";

export default function TransactionList({
  transactions = [],
  isTransactionLoading = false,
}) {
  return (
    <>
      {isTransactionLoading ? (
        <View className="space-y-3">
          {transactions.map((value, index) => (
            <Transaction transaction={value} key={index} />
          ))}
        </View>
      ) : (
        <ActivityIndicator size="small" color="#0000ff" />
      )}
    </>
  );
}
