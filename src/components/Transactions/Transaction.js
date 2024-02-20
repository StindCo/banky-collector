import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import formatDate from "../../utils/DateProcessing";
import {
  ArrowDownLeftIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ArrowUpRightIcon,
  ArrowsRightLeftIcon,
} from "react-native-heroicons/outline";

export default function Transaction({ transaction }) {
  return (
    <View className="flex-row mt-3 justify-between items-center border-b pb-2 border-gray-300">
      <View>
        {transaction.operationCode == "DPST" && (
          <View className="bg-green-200 rounded-lg p-2">
            <ArrowUpRightIcon size={20} color="#047857" />
          </View>
        )}

        {transaction.operationCode == "WTHDW" && (
          <View className="bg-red-100 rounded-lg p-2">
            <ArrowDownLeftIcon size={20} color="#991b1b" />
          </View>
        )}

        {transaction.operationCode == "TRSFR" && (
          <View className="bg-indigo-100 rounded-lg p-2">
            <ArrowsRightLeftIcon size={20} color="#312e81" />
          </View>
        )}
      </View>
      <View className="space-y-1">
        <Text className="font-[Poppins]">{transaction.description}</Text>
        <Text className="font-[Poppins]">{formatDate(transaction.date)}</Text>
      </View>

      <Text
        className={`text-md font-[PoppinsBold] ${
          transaction.operationCode == "DPST"
            ? "text-green-500"
            : transaction.operationCode == "WTHDW"
            ? "text-red-700"
            : ""
        } `}
      >
        {transaction.transactionAmount} {transaction.currency}
      </Text>
    </View>
  );
}
