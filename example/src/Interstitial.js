import React, { useEffect, useState } from 'react';
import {
  View,
  Button,
  ScrollView,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { Constants, AdUnitIds } from './Constants';
// Importing ApReactKit
import { pingAdLoaded, pingAdOpened, pingAdClosed } from 'ap-react-kit';

const interstitial = InterstitialAd.createForAdRequest(AdUnitIds.interstitial);

const InterstitialScreen = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        ToastAndroid.show(Constants.interstitialAdLoaded, ToastAndroid.SHORT);
        console.log(Constants.interstitialAdLoaded);
        setLoaded(true);

        // Sending Ping request for onAdLoaded to ApReactKit.
        pingAdLoaded(interstitial.adUnitId);
      }
    );

    const unsubscribeOpened = interstitial.addAdEventListener(
      AdEventType.OPENED,
      () => {
        ToastAndroid.show(Constants.interstitialAdOpened, ToastAndroid.SHORT);
        console.log(Constants.interstitialAdOpened);

        // Sending Ping request for onAdOpened to ApReactKit.
        pingAdOpened(interstitial.adUnitId);
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        ToastAndroid.show(Constants.interstitialAdClosed, ToastAndroid.SHORT);
        console.log(Constants.interstitialAdClosed);

        // Sending Ping request for onAdClosed to ApReactKit.
        pingAdClosed(interstitial.adUnitId);
      }
    );

    const unsubscribeError = interstitial.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        ToastAndroid.show(
          Constants.errorPrefix + error.message,
          ToastAndroid.SHORT
        );
        console.log(Constants.errorPrefix + error);
      }
    );

    // Start loading the interstitial straight away
    ToastAndroid.show(Constants.loadingAd, ToastAndroid.SHORT);
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeOpened();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, []);

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ height: Dimensions.get('window').height }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View style={{ margin: 10 }}>
            <Button
              title={Constants.loadAd}
              onPress={() => {
                if (!loaded) {
                  interstitial.load();
                  ToastAndroid.show(Constants.loadingAd, ToastAndroid.SHORT);
                } else {
                  ToastAndroid.show(
                    Constants.adAlreadyLoaded,
                    ToastAndroid.SHORT
                  );
                }
              }}
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              title={Constants.showAd}
              onPress={() => {
                if (loaded) {
                  setLoaded(false);
                  interstitial.show();
                } else {
                  ToastAndroid.show(
                    Constants.adNotLoadedyet,
                    ToastAndroid.SHORT
                  );
                }
              }}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default InterstitialScreen;
