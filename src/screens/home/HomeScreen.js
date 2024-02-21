import * as React from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { BottomSheet, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/core";
import {
  ArrowsRightLeftIcon,
  CreditCardIcon,
} from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import { apiGetAccountsOfUser } from "../../services/AccountServices";
import CardList from "../../components/Card/CardList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CollectForm from "../../components/CollectElement/CollectForm";

export const getSelectedOperationTextByTag = (tag) => {
  if (tag == "saving") return "Epargne";
  else if (tag == "saving_card") return "Buakisa carte";
  else if (tag == "loan") return "Crédit";
};

function HomeScreen() {
  const os = Platform.OS;
  const navigation = useNavigation();

  const [isModalShow, setIsModalShow] = React.useState(false);
  const user = useSelector((state) => state.auth.user);
  const [accounts, setAccounts] = React.useState([]);
  const [isAccountLoading, setIsAccountLoading] = React.useState(false);

  const [selectedOperation, setSelectedOperation] = React.useState("");

  const getAccounts = async (holderId) => {
    setIsAccountLoading(false);

    const { data } = await apiGetAccountsOfUser(holderId);

    setAccounts(data);
    setIsAccountLoading(true);
  };

  const launchNewOperation = (operationTag) => {
    setSelectedOperation(operationTag);
    setIsModalShow(true);
  };

  React.useEffect(() => {
    getAccounts(user.customer?.id);
  });

  return (
    <>
      <View
        className={`flex w-full bg-indigo-950   h-full ${os ? "pt-14" : ""}`}
      >
        <View className="flex-row justify-between items-center pb-3 px-5">
          <View
            className={`rounded-full ${
              os !== "ios" && "border border-primary"
            } `}
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
        <View className=" px-5 py-5 mb-6 space-y-1 ">
          <View className="flex space-y-2">
            <Text className="text-sm text-white font-[Poppins]">Bonjour, </Text>
            <Text className="text-lg text-white truncate font-[PoppinsBold] text-wrap font-medium">
              {user.displayName}
            </Text>
          </View>
        </View>
        <ScrollView className="bg-white rounded-t-[20px]">
          <View className="mt-8 px-6 space-y-8 mb-8">
            <Text className=" font-[Poppins]">Que voulez-vous collecter ?</Text>
          </View>

          <View className=" flex-row justify-between space-x-2 px-6 mb-8">
            <TouchableOpacity
              onPress={() => launchNewOperation("saving")}
              className="h-28 w-40 border-2  border-gray-200 justify-center space-y-2 items-center rounded-lg shadow-lg bg-slate-50"
            >
              <MaterialCommunityIcons
                name={"wallet-outline"}
                size={40}
                color="#2563eb"
              />
              <Text className="text-blue-600 font-[Poppins] text-center font-medium">
                Epargne
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => launchNewOperation("loan")}
              className="h-28 w-40 justify-center border-2 border-gray-200 space-y-2 items-center rounded-lg shadow-lg bg-slate-50"
            >
              <CreditCardIcon color="#16a34a" size={40} />
              <Text className="text-green-600 font-[Poppins] text-center font-medium">
                Crédit
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mt-12 gap-2 px-6">
            <TouchableOpacity
              onPress={() => launchNewOperation("saving_card")}
              className="h-28 w-40 border-2 border-gray-200 justify-center space-y-2 items-center rounded-lg  shadow-lg bg-slate-50"
            >
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

        <BottomSheet
          modalProps={{}}
          containerStyle={{ backgroundColor: "transparent" }}
          backdropStyle={{ backgroundColor: "rgba(52, 52, 52, 0.2)" }}
          onBackdropPress={() => setIsModalShow(false)}
          isVisible={isModalShow}
        >
          <View className="bg-white rounded-t-[25px] p-3 min-h-auto">
            <View className="py-2 border-b border-gray-200 pb-3">
              <Text className="text-base font-[Poppins] text-center font-semibold">
                Nouvelle collecte: {"  "}
                <Text className="font-[PoppinsBold]">
                  {getSelectedOperationTextByTag(selectedOperation)}
                </Text>
              </Text>
            </View>
            <CollectForm typeOperation={selectedOperation} />
          </View>
        </BottomSheet>
      </View>
    </>
  );
}

export default HomeScreen;
