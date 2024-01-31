import React, { useState } from "react";
import { Platform } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";
import { banner_id_android, banner_id_ios } from "../../assets/keys";

const id = Platform.OS == "ios" ? banner_id_ios : banner_id_android;
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : id;

export default function BannerAdComp() {
  const [adInitialized, setAdInitialized] = useState(false);

  mobileAds().setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,

    // An array of test device IDs to allow.
    testDeviceIdentifiers: ["EMULATOR"],
  });
  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      // console.log(adapterStatuses);
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
