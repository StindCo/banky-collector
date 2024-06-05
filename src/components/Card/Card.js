import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";

const getAccountTypeName = (label) => {
  switch (label) {
    case "SAVING":
      return "EPARGNE";
      break;
    case "CURRENT":
      return "COURANT";
      break;

    default:
      break;
  }
};

const getSelectedOperationTextByTag = (tag) => {
  if (tag == "saving") return "Epargne";
  else if (tag == "S") return "Bwakisa carte";
  else if (tag == "L") return "Crédit";
  else if (tag == "D") return "Dépôt";
};

function Card(props) {
  const {
    amountCDF,
    amountUSD,
    currency,
    nbrCollect,
    className,
    profileId,
    typeOperation,
  } = props;
  const navigation = useNavigation();

  // console.log(accountProfiles);

  return (
    <View>
      <View
        className={
          "flex justify-between w-full space-y-3  p-5 rounded-xl bg-primary py-6 " +
          className
        }
      >
        <View className="flex-row justify-between">
          <View>
            <View>
              <Text className="text-xs font-[Poppins] text-gray-400">
                Nombre de collectes
              </Text>
              <Text className="font-medium font-[PoppinsBold] text-base text-white">
                {nbrCollect}
              </Text>
            </View>
            <Text className="text-xs font-[Poppins] text-gray-400">
              Montant perçu (CDF)
            </Text>
            <Text className="text-sm font-[PoppinsBold] text-white">
              {amountCDF} {"CDF"}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between">
          <View>
            <Text className="text-xs font-[Poppins] text-gray-400">
              Montant perçu (USD)
            </Text>
            <Text className="text-sm font-[PoppinsBold] text-white">
              {amountUSD} {"USD"}
            </Text>
          </View>
        </View>

        {/* <View>
          <Text className="text-sm font-[Poppins] text-gray-400">
            Intitulé du compte
          </Text>
          <Text className="text-base font-[PoppinsBold] text-white">
            {name}
          </Text>
        </View> */}
      </View>
      <View className="absolute right-3 top-7">
        <Image
          source={require("../../../assets/img/logo/logo-dark-streamline.png")}
          className="h-24 w-24 opacity-50"
        />

        <View>
          <Text className="font-[Poppins] text-xs text-center uppercase text-white">
            {getSelectedOperationTextByTag(typeOperation)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Card;
