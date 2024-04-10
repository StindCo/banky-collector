import * as React from "react";
import {
  View,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import {
  ChevronLeftIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/core";
import Card from "../../components/Card/Card";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import { TYPE_OF_COLLECT } from "../../constants/app.constant";
import CollectList from "../../components/CollectElement/CollectList";
import {
  getAllCollectByType,
  getAllCollectByTypeAndCurrency,
  getAllCollectByTypeAndQuery,
  getAllCollects,
} from "../../services/CollectorService";
import { getAllByFilter } from "../../utils/CollectsUtils";

const moment = require("moment");

const LIST_OF_SEARCH_QUERY_TAG = [
  {
    displayName: "Custom date",
    tag: "from",
  },
  {
    displayName: "Custom date",
    tag: "to",
  },
  {
    displayName: "Aujourd'hui",
    tag: "today",
  },
  {
    displayName: "Cette semaine",
    tag: "week",
  },
  {
    displayName: "Ce mois",
    tag: "month",
  },
  {
    displayName: "Cette année",
    tag: "year",
  },
  {
    displayName: "Toutes les collectes",
    tag: "all",
  },
];

function ReportScreen() {
  const os = Platform.OS;
  const navigation = useNavigation();

  const [selectedQuerytag, setSelectedQueryTag] = useState("today");

  const [collects, setCollects] = useState([]);
  const [collectsFiltered, setCollectsFiltered] = useState([]);

  const [isCollectLoading, setIsCollectLoading] = useState(true);

  const [cumulCDF, setCumulCDF] = useState(0);
  const [cumulUSD, setCumulUSD] = useState(0);
  const [querySearch, setQuerySearch] = useState("");

  const [onSearch, setOnSearch] = useState(true);

  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);

  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const [typeOfCollectSelected, setTypeOfCollectSelected] = useState("D");

  const getCollectsByType = async (type, currency) => {
    let collects = await getAllCollectByType(type);
    setCollects(collects);
    setIsCollectLoading(false);
  };

  React.useEffect(() => {
    let newCollectedFilter = getAllByFilter(collects, {
      toDate,
      fromDate,
      selectedQuerytag,
    });
    setCollectsFiltered(newCollectedFilter);
    setCumulUSD(
      newCollectedFilter.reduce((acc, collect) => {
        if (collect.currency == "USD") {
          return acc + parseFloat(collect.amount);
        }
        return acc + 0;
      }, 0)
    );

    setCumulCDF(
      newCollectedFilter.reduce((acc, collect) => {
        if (collect.currency == "CDF") {
          return acc + parseFloat(collect.amount);
        }
        return acc + 0;
      }, 0)
    );
  }, [collects, toDate, fromDate, selectedQuerytag]);

  const onClose = () => {
    setQuerySearch("");
    setOnSearch(false);
    getCollectsByType(typeOfCollectSelected);
  };

  React.useEffect(() => {
    setIsCollectLoading(true);
    getCollectsByType(typeOfCollectSelected);
  }, [typeOfCollectSelected]);

  React.useEffect(() => {
    setIsCollectLoading(true);
    getCollectsByType(typeOfCollectSelected);
  }, [navigation]);

  const filterCollect = React.useCallback(
    async (text) => {
      if (text == "") getCollectsByType(typeOfCollectSelected);
      setQuerySearch(text);
      let collects = await getAllCollectByTypeAndQuery(
        typeOfCollectSelected,
        text
      );

      setCollectsFiltered(collects);
    },
    [typeOfCollectSelected]
  );

  return (
    <KeyboardAvoidingView
      behavior={os === "ios" ? "padding" : "height-100"}
      className={`flex-1`}
    >
      <ScrollView className={`flex w-full h-full ${os ? "mt-12" : ""}`}>
        <View className="flex-row justify-between items-center pb-3 px-5">
          <TouchableOpacity
            className={`w-1/3 rounded-full`}
            onPress={() => navigation.navigate("Home")}
          >
            <ChevronLeftIcon color="black" />
          </TouchableOpacity>
          <View className="w-1/3">
            <Text className="text-base text-center text-black">
              Mes collectes
            </Text>
          </View>
          <View className="w-1/3"></View>
        </View>

        <View className="mt-3 mx-5 flex-row items-center justify-center">
          {/* <TouchableOpacity
          onPress={() => setTypeOfCollectSelected("saving")}
          className={`p-2 ${
            typeOfCollectSelected == "saving" ? "bg-primary" : "bg-slate-200"
          }  px-3 rounded-l-lg`}
        >
          <Text
            className={`text-white text-xs ${
              typeOfCollectSelected == "saving"
                ? "text-white"
                : "text-indigo-950"
            }`}
          >
            Epargne
          </Text>
        </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => setTypeOfCollectSelected("D")}
            className={`p-2 rounded-l-lg ${
              typeOfCollectSelected == "D" ? "bg-primary" : "bg-slate-200"
            }  px-5 `}
          >
            <Text
              className={`text-white px-2  text-xs ${
                typeOfCollectSelected == "D" ? "text-white" : "text-indigo-950"
              }`}
            >
              Dépot
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTypeOfCollectSelected("L")}
            className={`p-2 ${
              typeOfCollectSelected == "L" ? "bg-primary" : "bg-slate-200"
            }  px-5`}
          >
            <Text
              className={`text-white px-2  text-xs ${
                typeOfCollectSelected == "L" ? "text-white" : "text-indigo-950"
              }`}
            >
              Crédit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTypeOfCollectSelected("S")}
            className={`p-2 ${
              typeOfCollectSelected == "S" ? "bg-primary" : "bg-slate-200"
            }  px-5 rounded-r-lg `}
          >
            <Text
              className={`text-white text-xs ${
                typeOfCollectSelected == "S" ? "text-white" : "text-indigo-950"
              }`}
            >
              Bwakisa carte
            </Text>
          </TouchableOpacity>
        </View>

        {isCollectLoading ? (
          <ActivityIndicator color={"#1e1b4b"} className="mt-5" />
        ) : (
          <>
            {!onSearch && (
              <View className="px-5 mt-5">
                <View>
                  <Card
                    className="shadow-lg"
                    amountCDF={cumulCDF}
                    amountUSD={cumulUSD}
                    nbrCollect={collectsFiltered.length}
                    typeOperation={typeOfCollectSelected}
                    currency={selectedCurrency}
                  />
                </View>
              </View>
            )}

            <View className="flex p-3 py-1 my-5 rounded-lg justify-between border-gray-400 mx-5 border items-center flex-row space-x-2">
              <View className="w-2/3 flex-row space-x-3 items-center">
                <MagnifyingGlassIcon size={15} color={"#000"} />
                <TextInput
                  onChangeText={(text) => filterCollect(text)}
                  onFocus={() => setOnSearch(true)}
                  value={querySearch}
                  placeholder="Rechercher une collecte"
                  className="text-[11px] w-full  text-black  border-gray-400  font-[Poppins]"
                  keyboardType="default"
                />
              </View>
              {onSearch && (
                <TouchableOpacity className="px-3" onPress={() => onClose()}>
                  <XMarkIcon size={15} color={"#ff0000"} />
                </TouchableOpacity>
              )}
            </View>

            <ScrollView>
              <View className="space-y-4 px-7">
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-md font-[Poppins] font-semibold">
                    Liste de collectes
                  </Text>
                </View>
                <CollectList
                  isTransactionLoading={true}
                  bgStyle="bg-zinc-50"
                  collects={collectsFiltered}
                />
                <View className="py-14"></View>
              </View>
            </ScrollView>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ReportScreen;
