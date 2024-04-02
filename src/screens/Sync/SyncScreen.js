import * as React from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { useState } from "react";
import Loader from "../../components/loading/Loader";
import { useSelector } from "react-redux";
import SyncScan from "./SyncScan";
// import { Camera, CameraType } from "expo-camera";

function SyncScreen() {
  const os = Platform.OS;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);



  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);
  React.useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <>
      {!loading ? (
        <View
          className={`flex w-full mt-14 h-full ${os === "ios" ? "mt-16" : ""}`}
        >
          <View className="flex-row justify-between items-center pb-3 px-5">
            <View className="w-1/4"></View>

            <View className="w-2/4">
              <Text className="text-base text-center font-[Poppins] text-black">
                Synchronisation
              </Text>
            </View>
            <View className="w-1/4 "></View>
          </View>
          <View>
            <View className="mt-1">
              {/* <Camera className="mt-8 mx-5 h-80 rounded-lg" type={type}>
                <View>
                  <TouchableOpacity>
                    <Text>Flip Camera</Text>
                  </TouchableOpacity>
                </View>
              </Camera> */}

              <SyncScan />
            </View>
          </View>
        </View>
      ) : (
        <Loader loading={loading} />
      )}
    </>
  );
}

export default SyncScreen;
