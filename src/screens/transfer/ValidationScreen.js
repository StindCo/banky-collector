import * as React from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  CurrencyDollarIcon,
  WalletIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import generateTemplate from "../../utils/ExportTemplatesForTransfert";

function ValidationScreen({ route, navigation }) {
  const os = Platform.OS;
  const [isPrinting, setIsPrinting] = React.useState(false);

  const params = route.params;

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    setIsPrinting(true);
    const html = await generateTemplate(
      params.accountFromObject,
      params.accountToObject,
      params.accountToObject.accountNumber,
      params.data
    );

    const { uri } = await Print.printToFileAsync({
      html,
      base64: true,
      width: 612,
    });
    console.log("File has been saved to:", uri);

    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    setIsPrinting(false);
  };

  React.useEffect(() => {}, []);

  return (
    <KeyboardAvoidingView
      behavior={os === "ios" ? "padding" : "height"}
      className={`flex-1 mt-12 w-full h-full ${os === "ios" ? "mt-14" : ""}`}
    >
      {params.type == "ok" && (
        <View className="flex  mt-8">
          <View className="mx-5 space-y-5  py-5 px-5  my-2">
            {/* <CurrencyDollarIcon color={"#eee"} size={100} /> */}

            <View className="mx-auto mt-5">
              <CheckCircleIcon size={130} color={"green"} />
            </View>

            <View>
              <Text className="text-lg text-center font-[Poppins]">
                Vous avez envoyé
              </Text>
              <Text className="text-3xl mt-2 text-center font-[PoppinsBold]">
                {params.data.amount} {params.accountFromObject.currency}
              </Text>
              <Text className="text-lg mt-2 text-center font-[Poppins]">
                Au compte
              </Text>
              <Text className="text-xl underline mt-2 text-center font-[PoppinsBold]">
                {params.accountToObject.accountNumber}
              </Text>
              <Text className="text-lg mt-2 text-center font-[Poppins]">
                de
              </Text>
              <Text className="text-xl  mt-2 text-center font-[PoppinsBold]">
                {params.accountToObject.name}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => printToFile()}
            className="my-8 mb-5 mx-auto  text-center rounded-lg p-3 px-5 bg-blue-600"
          >
            <Text className="text-center  font-[Poppins] text-white">
              {isPrinting ? (
                "Impression en cours ..."
              ) : (
                "Imprimer la preuve de transfert"
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className=" mx-auto mt-2  text-center rounded-lg p-2 px-12 bg-orange-600"
          >
            <Text className="text-center font-[Poppins] text-white">
              Quitter
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {params.type == "error" && (
        <View className="flex  mt-8">
          <View className="mx-5 space-y-5  py-5 px-5  my-2">
            {/* <CurrencyDollarIcon color={"#eee"} size={100} /> */}

            <View className="mx-auto mt-5">
              <XCircleIcon size={130} color={"red"} />
            </View>

            <View>
              <Text className="text-lg text-center font-[Poppins]">
                Une erreur est survenue
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="my-8 mb-5 mx-5 text-center rounded-lg p-4 bg-blue-600"
          >
            <Text className="text-center text-lg font-[Poppins] text-white">
              Réessayer le transfert
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className=" mx-auto mt-2  text-center rounded-lg p-3 px-12 bg-orange-600"
          >
            <Text className="text-center text-lg font-[Poppins] text-white">
              Quitter
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

export default ValidationScreen;
