import * as React from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { CheckCircleIcon, XCircleIcon } from "react-native-heroicons/outline";
import generateTemplate from "../../utils/ExportTicketDePerception";
import { useSelector } from "react-redux";

function ValidationScreen({ route, navigation }) {
  const os = Platform.OS;
  const [isPrinting, setIsPrinting] = React.useState(false);

  const user = useSelector((state) => state.auth.user);

  const params = route.params;

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    setIsPrinting(true);
    try {
      const html = await generateTemplate(params.data, user);
      const { uri } = await Print.printAsync({
        html,
        base64: true,
        width: 612,
      });
      await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
      setIsPrinting(false);
    } catch (error) {
      console.log(error);
    }
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
                Collecte effectuée
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => printToFile()}
            className="my-8 mb-5 mx-auto  text-center rounded-lg p-3 px-5 bg-blue-600"
          >
            <Text className="text-center  font-[Poppins] text-white">
              {isPrinting ? "Impression en cours ..." : "Imprimer le ticket"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Application", {
                refreshTimeStamp: new Date().toISOString(),
              })
            }
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
