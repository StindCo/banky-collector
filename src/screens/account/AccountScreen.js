import * as React from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Card from "../../components/Card/Card";
import { apiGetEntriesOfAnAcount, apiGetEntriesOfAnAcountWhihoutFilter } from "../../services/EntriesService";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsRightLeftIcon,
  ChevronLeftIcon,
  NewspaperIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { BottomSheet } from "@rneui/themed";

import Loader from "../../components/loading/Loader";
import TransactionList from "../../components/Transactions/TransactionList";
import { useSelector } from "react-redux";
import { apiGetTransactionsOfAnAcount } from "../../services/transactionsService";
import AccountStatement from "../../components/AccountStatement/AccountStatement";
import EntryList from "../../components/AccountStatement/EntryList";

function AccountScreen({ route }) {
  const os = Platform.OS;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const [isAccountStatementShow, setIsAccountStatementShow] = useState(false);

  const [latestTransactions, setLastestTransactions] = useState([]);

  const { account } = route.params;
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setLoading(false);
    const load = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(load);
  }, []);

  const getTransactions = async (holderId) => {
    const { data } = await apiGetEntriesOfAnAcountWhihoutFilter(holderId ?? "");

    setTransactions(data);
    setLastestTransactions(data.slice(0, 5));
    setIsTransactionLoading(true);
  };

  useEffect(() => {
    getTransactions(account.id);
  }, []);

  return (
    <>
      {!loading ? (
        <View
          className={`flex w-full mt-14 h-full ${os === "ios" ? "mt-16" : ""}`}
        >
          <View className="flex-row justify-between items-center pb-3 px-5">
            <View className="w-1/3">
              <TouchableOpacity
                className="mr-2"
                onPress={() => navigation.goBack()}
              >
                <ChevronLeftIcon color="#000064" size="22" />
              </TouchableOpacity>
            </View>
            <View className="w-1/3">
              <Text className="text-base text-center text-black">
                Mon compte
              </Text>
            </View>
            <View className="w-1/3"></View>
          </View>
          <View className="space-y-4 px-5 ">
            <Card
              className="shadow-lg"
              name={account.name}
              balance={account.balance}
              currency={account.currency}
              profileId={account.profileId}
              accountNumber={account.accountNumber}
            />
            <View className="flex flex-row gap-1">
              <TouchableOpacity
                className="flex-col w-1/2 justify-center items-center space-y-2 bg-white px-3 py-4 rounded-lg border border-gray-200"
                onPress={() => navigation.navigate("Transfer")}
              >
                <ArrowsRightLeftIcon color="#000000" size={18} />
                <Text className="text-black font-[Poppins] text-center font-medium">
                  Effectuer un transfert
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsAccountStatementShow(true)}
                className="flex-col w-1/2 justify-center  items-center space-y-2 bg-white  px-3 py-4 rounded-lg border border-gray-200"
              >
                <NewspaperIcon color="#000000" size={18} />
                <Text className="text-black font-[Poppins] text-center font-medium">
                  Voir le relevé
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <View className="space-y-4 px-6 mt-5">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-lg font-[Poppins] font-semibold">
                  Dernières transactions
                </Text>
              </View>
              <EntryList
                isTransactionLoading={isTransactionLoading}
                bgStyle="bg-zinc-50"
                transactions={latestTransactions}
              />
              <View className="py-14"></View>
            </View>
          </ScrollView>
          <BottomSheet
            modalProps={{}}
            containerStyle={{ backgroundColor: "transparent" }}
            backdropStyle={{ backgroundColor: "rgba(52, 52, 52, 0.2)" }}
            onBackdropPress={() => setIsAccountStatementShow(false)}
            isVisible={isAccountStatementShow}
          >
            <View className="bg-white rounded-tl-2xl rounded-tr-2xl p-3 px-3 min-h-[420px]">
              <AccountStatement account={account} />
            </View>
          </BottomSheet>
        </View>
      ) : (
        <Loader loading={loading} />
      )}
    </>
  );
}

export default AccountScreen;
