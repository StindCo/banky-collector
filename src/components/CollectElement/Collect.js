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
      <View className="w-3/5 flex-row space-x-4 items-center">
        <View className="flex w-18 pl-2 items-center justify-center">
          <View>
            <BanknotesIcon size={25} color={"#166534"} />
          </View>
        </View>
        <View className="space-y-1 text-left w-4/5">
          <Text className="font-[PoppinsBold] text-sm text-gray-800 text-left">
            {collect.recipient}
          </Text>
          <Text className="text-xs font-[Poppins] text-gray-600">
            {moment(collect.created_at).format("DD-MM-YYYY HH:mm")}
          </Text>
        </View>
      </View>

      <Text className="pr-1 w-1/4 text-xs font-[PoppinsBold]">
        {collect.amount} {collect.currency}
      </Text>
    </View>
  );
}
