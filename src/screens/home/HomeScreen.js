import * as React from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/core";
import {
  ArrowsRightLeftIcon,
  CreditCardIcon,
} from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import { apiGetAccountsOfUser } from "../../services/AccountServices";
import CardList from "../../components/Card/CardList";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function HomeScreen() {
  const os = Platform.OS;
  const navigation = useNavigation();

  const user = useSelector((state) => state.auth.user);
  const [accounts, setAccounts] = React.useState([]);
  const [isAccountLoading, setIsAccountLoading] = React.useState(false);

  const getAccounts = async (holderId) => {
    setIsAccountLoading(false);

    const { data } = await apiGetAccountsOfUser(holderId);

    setAccounts(data);
    setIsAccountLoading(true);
  };

  React.useEffect(() => {
    getAccounts(user.customer?.id);
  });

  return (
    <View className={`flex w-full bg-indigo-950   h-full ${os ? "pt-14" : ""}`}>
      <View className="flex-row justify-between items-center pb-3 px-5">
        <View
          className={`rounded-full ${os !== "ios" && "border border-primary"} `}
        >
          <Image
            source={require("../../../assets/img/logo/logo-dark-streamline.png")}
            className={`w-9 h-9 rounded-full ${
              os === "ios" && "border border-primary"
            }`}
          />
        </View>
        <View>
          {/* <Text className="text-base font-[Poppins] text-white">Accueil</Text> */}
        </View>
        <View>
          <TouchableOpacity
            className="mr-2"
            onPress={() => navigation.navigate("Notification")}
          >
            <Icon name="bell" color={"white"} type="feather" />
          </TouchableOpacity>
        </View>
      </View>
      <View className=" px-5 py-5 mb-10 space-y-1 ">
        <View className="flex space-y-2">
          <Text className="text-sm text-white font-[Poppins]">Bonjour, </Text>
          <Text className="text-lg text-white truncate font-[PoppinsBold] text-wrap font-medium">
            {user.displayName}
          </Text>
        </View>
      </View>
      <ScrollView className="bg-white rounded-t-[20px]">
        <View className="mt-8 px-6 space-y-8 mb-8">
          <Text className="text-lg font-[Poppins]">
            Que voulez-vous collecter ?
          </Text>
        </View>

        <View className=" flex-row justify-between space-x-2 px-6 mb-8">
          <TouchableOpacity className="h-36 w-40 border-2  border-gray-200 justify-center space-y-2 items-center rounded-lg shadow-lg bg-slate-50">
            <MaterialCommunityIcons
              name={"wallet-outline"}
              size={40}
              color="#2563eb"
            />
            <Text className="text-blue-600 font-[Poppins] text-center font-medium">
              Epargne
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="h-36 w-40 justify-center border-2 border-gray-200 space-y-2 items-center rounded-lg shadow-lg bg-slate-50">
            <CreditCardIcon color="#16a34a" size={40} />
            <Text className="text-green-600 font-[Poppins] text-center font-medium">
              Crédit
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-12 gap-2 px-6">
          <TouchableOpacity className="h-36 w-40 border-2 border-gray-200 justify-center space-y-2 items-center rounded-lg  shadow-lg bg-slate-50">
            <MaterialCommunityIcons
              name={"piggy-bank-outline"}
              size={40}
              color="#ea580c"
            />
            <Text className="text-orange-600 font-[Poppins] text-center font-medium">
              Buakisa carte
            </Text>
          </TouchableOpacity>
        </View>

        <View className="py-14"></View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
