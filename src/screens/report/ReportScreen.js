import * as React from "react";
import {
  View,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);

  const [cumul, setCumul] = useState(0);

  const [beforeDate, setBeforeDate] = useState(null);
  const [afterDate, setAfterDate] = useState(null);

  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);

  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const [typeOfCollectSelected, setTypeOfCollectSelected] = useState("saving");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFromDate(date.toISOString());

    hideDatePicker();
  };

  const showToDatePicker = () => {
    setToDatePickerVisibility(true);
  };

  const hideToDatePicker = () => {
    setToDatePickerVisibility(false);
  };

  const handleToConfirm = (date) => {
    setToDate(date.toISOString());
    hideToDatePicker();
  };

  const getCollectsByType = async (type, currency) => {
    let collects = await getAllCollectByTypeAndCurrency(type, currency);
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
    setCumul(
      newCollectedFilter.reduce((acc, collect) => {
        if (collect.currency == selectedCurrency) {
          return acc + parseFloat(collect.amount);
        }
        return acc + 0;
      }, 0)
    );
  }, [collects, toDate, fromDate, selectedQuerytag]);

  React.useEffect(() => {
    setIsCollectLoading(true);
    getCollectsByType(typeOfCollectSelected, selectedCurrency);
  }, [typeOfCollectSelected, selectedCurrency]);

  return (
    <View className={`flex w-full h-full ${os ? "mt-12" : ""}`}>
      <View className="flex-row justify-between items-center pb-3 px-5">
        <TouchableOpacity
          className={`w-1/3 rounded-full`}
          onPress={() => navigation.navigate("Home")}
        >
          <ChevronLeftIcon color="black" />
        </TouchableOpacity>
        <View className="w-1/3">
          <Text className="text-base text-center text-black">Rapports</Text>
        </View>
        <View className="w-1/3"></View>
      </View>

      <View className="mt-3 mx-5 flex-row items-center justify-center">
        <TouchableOpacity
          onPress={() => setTypeOfCollectSelected("saving")}
          className={`p-2 ${
            typeOfCollectSelected == "saving" ? "bg-primary" : "bg-slate-200"
          }  px-3 rounded-l-lg`}
        >
          <Text
            className={`text-white ${
              typeOfCollectSelected == "saving"
                ? "text-white"
                : "text-indigo-950"
            }`}
          >
            Epargne
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTypeOfCollectSelected("loan")}
          className={`p-2 ${
            typeOfCollectSelected == "loan" ? "bg-primary" : "bg-slate-200"
          }  px-5`}
        >
          <Text
            className={`text-white ${
              typeOfCollectSelected == "loan" ? "text-white" : "text-indigo-950"
            }`}
          >
            Crédit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTypeOfCollectSelected("saving_card")}
          className={`p-2 ${
            typeOfCollectSelected == "saving_card"
              ? "bg-primary"
              : "bg-slate-200"
          }  px-5 rounded-r-lg `}
        >
          <Text
            className={`text-white ${
              typeOfCollectSelected == "saving_card"
                ? "text-white"
                : "text-indigo-950"
            }`}
          >
            Buakisa carte
          </Text>
        </TouchableOpacity>
      </View>

      {isCollectLoading ? (
        <ActivityIndicator color={"#1e1b4b"} className="mt-5" />
      ) : (
        <>
          <View className="px-5 mt-5">
            <View>
              <Card
                className="shadow-lg"
                amount={cumul}
                nbrCollect={collectsFiltered.length}
                typeOperation={typeOfCollectSelected}
                currency={selectedCurrency}
              />
            </View>
          </View>

          <View className="px-5 mt-5 mb-1">
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="pr-2"
            >
              <RNPickerSelect
                onValueChange={(value) => setSelectedCurrency(value)}
                items={[
                  { label: "Dollars américain", value: "USD" },
                  { label: "Francs congolais", value: "CDF" },
                ]}
              >
                <View className="mx-2">
                  <TouchableOpacity
                    onPress={() => {}}
                    className={`p-2 px-4 bg-slate-200  rounded-lg`}
                  >
                    <Text className={`font-[Poppins] text-slate-800 text-sm `}>
                      Dévise:{"  "}
                      <Text className="font-[PoppinsBold]">
                        {selectedCurrency}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </RNPickerSelect>
              <Text className="mt-4 ml-8 text-xs font-[Poppins]">
                Temporalité:{" "}
              </Text>
              {LIST_OF_SEARCH_QUERY_TAG.map((value, index) => (
                <View key={index} className="mx-2">
                  {value.tag != "custom" &&
                  value.tag != "from" &&
                  value.tag != "to" ? (
                    <TouchableOpacity
                      onPress={() => {
                        setToDate(null);
                        setFromDate(null);
                        setSelectedQueryTag(value.tag);
                      }}
                      className={`p-2 px-4 bg-slate-200  rounded-lg ${
                        value.tag == selectedQuerytag &&
                        toDate == null &&
                        fromDate == null &&
                        "bg-primary"
                      }`}
                    >
                      <Text
                        className={`font-[Poppins] text-slate-800 text-sm ${
                          value.tag == selectedQuerytag &&
                          toDate == null &&
                          fromDate == null &&
                          "text-slate-100"
                        }`}
                      >
                        {value.displayName}
                      </Text>
                    </TouchableOpacity>
                  ) : null}

                  {value.tag == "from" ? (
                    <TouchableOpacity
                      onPress={showDatePicker}
                      className={`p-1.5 px-4 bg-slate-200  rounded-lg ${
                        fromDate && "bg-primary"
                      }`}
                    >
                      <Text
                        className={`font-[Poppins] ${fromDate && "text-white"}`}
                      >
                        <Text className="font-[Poppins]">Du : </Text>
                        <Text className="font-[PoppinsBold]">
                          {fromDate
                            ? moment(fromDate).format("DD-MM-YYYY")
                            : "                    "}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  ) : null}

                  {value.tag == "to" ? (
                    <TouchableOpacity
                      onPress={showToDatePicker}
                      className={`p-1.5 px-4 bg-slate-200  rounded-lg ${
                        toDate && "bg-primary"
                      }`}
                    >
                      <Text
                        className={`font-[Poppins] ${toDate && "text-white"}`}
                      >
                        <Text className="font-[Poppins]">Au : </Text>
                        <Text className="font-[PoppinsBold]">
                          {toDate
                            ? moment(toDate).format("DD-MM-YYYY")
                            : "                    "}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              ))}

              <View>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>

              <View>
                <DateTimePickerModal
                  isVisible={isToDatePickerVisible}
                  mode="date"
                  onConfirm={handleToConfirm}
                  onCancel={hideToDatePicker}
                />
              </View>
            </ScrollView>
          </View>

          <ScrollView>
            <View className="space-y-4 px-7 mt-6">
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
    </View>
  );
}

export default ReportScreen;
