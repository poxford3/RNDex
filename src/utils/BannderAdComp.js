import React, { useState } from "react";
import { Platform } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import mobileAds from "react-native-google-mobile-ads";
import { banner_id_android, banner_id_ios } from "../../keys";

const id = Platform.OS == "ios" ? banner_id_ios : banner_id_android;
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : id;

export default function BannerAdComp() {
  const [adInitialized, setAdInitialized] = useState(false);

  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      console.log(adapterStatuses);
      setAdInitialized(true);
    });

  return (
    <>
      {adInitialized ? (
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      ) : null}
    </>
  );
}

// export default BannerAdComp();
