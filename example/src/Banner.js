import React from 'react';
import { ToastAndroid, View } from 'react-native';
import { GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { Constants, AdUnitIds } from './Constants';

// Importing ApReactKit
import { pingAdLoaded, pingAdOpened, pingAdClosed } from 'ap-react-kit';

const BannerScreen = () => {
  ToastAndroid.show(Constants.loadingAd, ToastAndroid.SHORT);
  return (
    <>
      <View style={{ margin: 10 }}>
        <GAMBannerAd
          unitId={AdUnitIds.banner}
          sizes={[BannerAdSize.MEDIUM_RECTANGLE]}
          onAdLoaded={() => {
            ToastAndroid.show(Constants.bannerAdLoaded, ToastAndroid.SHORT);
            console.log(Constants.bannerAdLoaded);

            // Sending Ping request for onAdLoaded to ApReactKit.
            pingAdLoaded(AdUnitIds.banner);
          }}
          onAdOpened={() => {
            ToastAndroid.show(Constants.bannerAdOpened, ToastAndroid.SHORT);
            console.log(Constants.bannerAdOpened);

            // Sending Ping request for onAdOpened to ApReactKit.
            pingAdOpened(AdUnitIds.banner);
          }}
          onAdClosed={() => {
            ToastAndroid.show(Constants.bannerAdClosed, ToastAndroid.SHORT);
            console.log(Constants.bannerAdClosed);

            // Sending Ping request for onAdClosed to ApReactKit.
            pingAdClosed(AdUnitIds.banner);
          }}
          onAdFailedToLoad={(error) => {
            ToastAndroid.show(
              Constants.errorPrefix + error.message,
              ToastAndroid.SHORT
            );
            console.log(Constants.errorPrefix + error);
          }}
        />
      </View>
    </>
  );
};

export default BannerScreen;
