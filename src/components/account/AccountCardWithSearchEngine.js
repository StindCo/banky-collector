import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckIcon } from "react-native-heroicons/solid";

function AccountCardWithSearchEngine({
  account,
  accountSelected,
  setAccountSelected,
}) {
  return (
    <TouchableOpacity
      className="flex-row justify-start items-center space-x-4 w-full border-t border-gray-200 py-4"
      onPress={() => setAccountSelected(account)}
    >
      <View
        className={`justify-center items-center w-7 h-7 rounded-full ${
          accountSelected.id === account.id ? "bg-primary" : "bg-gray-200"
        }`}
      >
        {accountSelected.id === account.id && (
          <CheckIcon color="#fff" size={18} font="bold" />
        )}
      </View>
      <View className="space-y-2">
        <Text className="text-base font-medium uppercase">{account.name}</Text>
        <Text>{account.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default AccountCardWithSearchEngine;
