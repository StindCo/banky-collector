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

function Card(props) {
  const { name, accountNumber, balance, currency, className, profileId } =
    props;
  const navigation = useNavigation();

  const accountProfiles = useSelector((state) => state.account.accountProfiles);
  const [typeOfAccount, setTypeOfAccount] = React.useState({});

  React.useEffect(() => {
    let profileOfAccount = accountProfiles.filter(
      (profile) => profile.id == profileId
    )[0];

    setTypeOfAccount(profileOfAccount);
  }, [accountProfiles]);

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
            <Text className="text-sm font-[Poppins] text-gray-400">
              Montant perçu
            </Text>
            <Text className="text-xl font-[PoppinsBold] text-white">
              700 USD
            </Text>
          </View>
        </View>
        <View>
          <Text className="text-sm font-[Poppins] text-gray-400">
            Nombre de collectes
          </Text>
          <Text className="font-medium font-[PoppinsBold] text-base text-white">
            18
          </Text>
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
          className="h-20 w-20 opacity-50"
        />

        <View>
          <Text className="font-[Poppins] text-xs text-center uppercase text-white">
            Epargne
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Card;
