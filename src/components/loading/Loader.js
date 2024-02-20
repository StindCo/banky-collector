import AnimatedLoader from "react-native-animated-loader";
import {Text} from "react-native";
import * as React from "react";

function Loader({loading}) {
    return (
        <AnimatedLoader
            visible={loading}
            overlayColor="rgba(255,255,255,0.75)"
            animationStyle={{
                width: 100,
                height: 100,
            }}
            speed={1}
        >
            <Text>Chargement...</Text>
        </AnimatedLoader>
    )
}

export default Loader