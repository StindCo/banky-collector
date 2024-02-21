import * as React from "react";
import {
  View,
  TextInput,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  ArrowsRightLeftIcon,
  MagnifyingGlassCircleIcon,
  NewspaperIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import Loader from "../../components/loading/Loader";
import CardList from "../../components/Card/CardList";
import { useSelector } from "react-redux";
import { apiGetAccountsOfUser } from "../../services/AccountServices";

function SyncScreen() {
  const os = Platform.OS;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [filterText, setFilterText] = useState(null);
  const [isAccountLoading, setIsAccountLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const [accounts, setAccounts] = React.useState([]);

  const getAccounts = async (holderId) => {
    setIsAccountLoading(false);
    const { data } = await apiGetAccountsOfUser(holderId ?? "");
    setAccounts(data);
    setIsAccountLoading(true);
  };

  React.useEffect(() => {
    getAccounts(user.customer.id);
  }, [user]);

  return (
    <>
      {!loading ? (
        <View
          className={`flex w-full mt-14 h-full ${os === "ios" ? "mt-16" : ""}`}
        >
          <View className="flex-row justify-between items-center pb-3 px-5">
            <View className="w-1/4"></View>

            <View className="w-2/4">
              <Text className="text-base text-center font-[Poppins] text-black">
                Synchronisation
              </Text>
            </View>
            <View className="w-1/4 "></View>
          </View>
        </View>
      ) : (
        <Loader loading={loading} />
      )}
    </>
  );
}

export default SyncScreen;
