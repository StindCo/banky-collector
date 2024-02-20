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

function AccountsScreen() {
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
            <View className="w-1/4">
              <View
                className={`w-9 h-9 rounded-full border border-indigo-950 `}
              >
                <Image
                  source={require("../../../assets/favicon.png")}
                  className={`w-9 h-9 rounded-full`}
                />
              </View>
            </View>

            <View className="w-2/4">
              <Text className="text-base text-center font-[Poppins] text-black">
                Mes comptes
              </Text>
            </View>
            <View className="w-1/4 ">
              <TouchableOpacity
                className="flex items-end justify-end"
                onPress={() => setShowSearchBar(!showSearchBar)}
              >
                <MagnifyingGlassCircleIcon color="#000064" size="38" />
              </TouchableOpacity>
            </View>
          </View>

          {showSearchBar && (
            <View className="px-5 mt-5">
              <TextInput
                onChangeText={setFilterText}
                value={filterText}
                placeholder="Rechercher un compte"
                className="h-[45px] border pb-1.5 text-base rounded-lg px-3 border-gray-300 text-gray-800"
              />
            </View>
          )}
          <ScrollView className="space-y-4 px-5 mt-5">
            <View>
              <CardList
                isAccountLoad={isAccountLoading}
                accounts={accounts}
                filterText={filterText}
              />
            </View>

            <View className="py-14"></View>
          </ScrollView>
        </View>
      ) : (
        <Loader loading={loading} />
      )}
    </>
  );
}

export default AccountsScreen;
