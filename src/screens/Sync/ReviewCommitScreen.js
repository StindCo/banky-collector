import * as React from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import {
  ChevronLeftIcon,
} from "react-native-heroicons/outline";
import { useState } from "react";
import {
  apiSyncData,
  clearCollect,
  getAllCollects,
} from "../../services/CollectorService";
import Card from "../../components/Card/Card";

function ReviewCommitScreen({ route, navigation }) {
  const os = Platform.OS;

  const { url } = route.params;

  const [cumulCDF, setCumulCDF] = useState(0);
  const [cumulUSD, setCumulUSD] = useState(0);

  const [finalSolde, setFinalSolde] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [collects, setCollects] = useState([]);

  const syncData = async () => {
    if (!isSubmitting) {
      try {
        setIsSubmitting(true);

        let items = collects.map((value) => {
          return {
            currency: value.currency,
            amount: value.amount,
            asset: value.asset,
            goal: value.goal,
            data1: value.data1,
            data2: value?.data2,
            data3: value?.data3,
            data4: value?.data4,
            data5: value?.data5,
            data6: value?.data6,
          };
        });

        apiSyncData(url, { items })
          .then(async ({ data }) => {
            await clearCollect();
            navigation.navigate("ValidationCommit", {
              type: "ok",
            });
          })
          .catch((error) => {
            navigation.navigate("ValidationCommit", {
              type: "error",
              message: error?.response?.data?.detail,
            });
          });
      } catch (error) {
        navigation.navigate("ValidationCommit", {
          type: "error",
        });
      }
    }
  };

  const getCollectsByType = async (type, currency) => {
    let collects = await getAllCollects();
    setCollects(collects);
  };

  const getCollectsData = (type) => {
    let collectsFiltered = collects.filter((value) => value?.goal === type);
    let usd = collectsFiltered.reduce((acc, collect) => {
      if (collect.currency == "USD") {
        return acc + parseFloat(collect.amount);
      }
      return acc + 0;
    }, 0);

    let cdf = collectsFiltered.reduce((acc, collect) => {
      if (collect.currency == "CDF") {
        return acc + parseFloat(collect.amount);
      }
      return acc + 0;
    }, 0);

    return { collects: collectsFiltered, usd, cdf };
  };

  React.useEffect(() => {
    setCumulUSD(
      collects.reduce((acc, collect) => {
        if (collect.currency == "USD") {
          return acc + parseFloat(collect.amount);
        }
        return acc + 0;
      }, 0)
    );

    setCumulCDF(
      collects.reduce((acc, collect) => {
        if (collect.currency == "CDF") {
          return acc + parseFloat(collect.amount);
        }
        return acc + 0;
      }, 0)
    );
  }, [collects]);

  React.useEffect(() => {
    getCollectsByType();
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={os === "ios" ? "padding" : "height"}
      className={`flex-1 mt-12 w-full h-full ${os === "ios" ? "mt-14" : ""}`}
    >
      <View className="flex-1">
        <View className="flex-row w-full justify-between items-center px-5 pb-3">
          <View
            className={`rounded-full p-1 ${
              os !== "ios" && "border border-primary"
            } `}
          >
            <TouchableOpacity
              className="mr-2"
              onPress={() => navigation.goBack()}
            >
              <ChevronLeftIcon color="#000064" size="22" />
            </TouchableOpacity>
          </View>
          <View className="">
            <Text className="text-base text-center font-[Poppins] text-black">
              Résumé des opérations
            </Text>
          </View>
          <View className=""></View>
        </View>

        <ScrollView>
          <View className="flex justify-between px-4">
            <Card
              className="shadow-lg"
              amountCDF={cumulCDF}
              amountUSD={cumulUSD}
              nbrCollect={collects.length}
              typeOperation={"bwakisa carte"}
              currency={"CDF"}
            />

            <View className="flex flex-row gap-4 mt-4  w-full items-start">
              <View className="w-[30%] p-3 rounded bg-violet-600">
                <View className="flex flex-row ">
                  <Text className="text-white text-[10px]">Dépôt</Text>
                  {/* <CreditCardIcon color={"#fff"} /> */}
                </View>
                <View className="flex flex-row space-x-2 items-center">
                  <Text className="text-white font-[PoppinsBold] text-xl">
                    {getCollectsData("D")?.collects?.length}
                  </Text>
                  <Text className="text-[9px] font-[Poppins] text-white">
                    collectes
                  </Text>
                </View>
                <Text className="text-gray-200 font-[Poppins] text-[10px] ">
                  {getCollectsData("D")?.usd} USD
                </Text>
                <Text className="text-gray-200 font-[Poppins] text-[10px] ">
                  {getCollectsData("D")?.cdf} CDF
                </Text>
              </View>

              <View className="w-[30%] p-3 rounded bg-orange-700">
                <Text className="text-white text-[10px]">Crédit</Text>
                <View className="flex flex-row items-center">
                  <Text className="text-white space-x-2 font-[PoppinsBold] text-xl">
                    {`${getCollectsData("L")?.collects.length}`} {" "}
                  </Text>
                  <Text className="text-[9px] font-[Poppins] text-white">
                    collectes
                  </Text>
                </View>
                <Text className="text-gray-200 font-[Poppins] text-[10px] ">
                  {getCollectsData("L")?.usd} USD
                </Text>
                <Text className="text-gray-200 font-[Poppins] text-[10px] ">
                  {getCollectsData("L")?.cdf} CDF
                </Text>
              </View>

              <View className="w-[30%] p-3 rounded bg-emerald-600">
                <Text className="text-white text-[10px]">Bwakisa carte</Text>
                <View className="flex flex-row items-center">
                  <Text className="text-white font-[PoppinsBold] text-xl">
                    {getCollectsData("S")?.collects?.length}{" "}
                  </Text>
                  <Text className="text-[9px] font-[Poppins] text-white">
                    collectes
                  </Text>
                </View>
                <Text className="text-gray-200 font-[Poppins] text-[10px] ">
                  {getCollectsData("S")?.usd} USD
                </Text>
                <Text className="text-gray-200 font-[Poppins] text-[10px] ">
                  {getCollectsData("S")?.cdf} CDF
                </Text>
              </View>
            </View>

            <View className="mt-8 px-5">
              <TouchableOpacity
                disabled={isSubmitting}
                onPress={() => syncData()}
                className={`text-center rounded-lg p-4 bg-green-600 ${
                  finalSolde < 0 && "bg-green-200"
                } `}
              >
                <Text className="text-center text-sm font-[Poppins] text-white">
                  {isSubmitting
                    ? "Validation en cours ..."
                    : "Valider la synchronisation"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ReviewCommitScreen;
