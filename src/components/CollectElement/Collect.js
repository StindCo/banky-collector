import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import formatDate from "../../utils/DateProcessing";
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  BanknotesIcon,
} from "react-native-heroicons/outline";

const moment = require("moment");

export default function Collect({ collect, bgStyle }) {
  return (
    <View
      className={`flex-row mt-3 justify-between shadow-lg items-start p-2 py-5 rounded-lg  ${bgStyle}`}
    >
      <View className="flex pl-2 items-center justify-center">
        <View>
          <BanknotesIcon size={25} color={"#166534"} />
        </View>
      </View>
      <View className="space-y-1 text-left w-2/5">
        <Text className="font-[PoppinsBold] text-sm text-gray-800 text-left">
          {collect.recipient}
        </Text>
        <Text className="text-xs font-[Poppins] text-gray-600">
          {collect.created_at}
        </Text>
      </View>

      <Text className="pr-1 text-xs font-[Poppins]">
        {collect.amount} {collect.currency}
      </Text>
    </View>
  );
}
