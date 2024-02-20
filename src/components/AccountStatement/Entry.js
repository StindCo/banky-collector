import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import formatDate from "../../utils/DateProcessing";
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
} from "react-native-heroicons/outline";

const moment = require("moment");

export default function Entry({ entry, bgStyle }) {
  return (
    <View
      className={`flex-row mt-3 justify-between shadow-lg items-center p-2 py-5 rounded-lg  ${bgStyle}`}
    >
      <View className="w-1/5">
        <Text>Voilà</Text>
        {/* {entry.type == "C" && (
          <View className="bg-green-200 mx-auto rounded-lg p-2">
            <ArrowDownLeftIcon size={15} color="#047857" />
          </View>
        )}

        {entry.type == "D" && (
          <View className="bg-red-100  mx-auto rounded-lg p-2">
            <ArrowUpRightIcon size={15} color="#991b1b" />
          </View>
        )} */}
      </View>
      <View className="space-y-1 text-center w-2/5">
        <Text className="font-[Poppins] text-center">
          {/* {moment(entry?.date).format("DD-MM-YYYY HH:MM")} */}
        </Text>
      </View>

      <Text>Jskl sjks k</Text>
    </View>
  );
}
