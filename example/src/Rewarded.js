import React, { useEffect, useState } from 'react';
import {
  View,
  Button,
  ScrollView,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import { Constants, AdUnitIds } from './Constants';

// Importing ApReactKit
import { pingAdLoaded, pingAdOpened, pingAdClosed } from 'ap-react-kit';

const rewarded = RewardedAd.createForAdRequest(AdUnitIds.rewarded);

const RewardedScreen = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
        console.log(Constants.rewardedAdLoaded);
        ToastAndroid.show(Constants.rewardedAdLoaded, ToastAndroid.SHORT);

        // Sending Ping request for onAdLoaded to ApReactKit.
        pingAdLoaded(rewarded.adUnitId);
      }
    );
    const unsubscribeOpened = rewarded.addAdEventListener(
      AdEventType.OPENED,
      () => {
        console.log(Constants.rewardedAdOpened);
        ToastAndroid.show(Constants.rewardedAdOpened, ToastAndroid.SHORT);

        // Sending Ping request for onAdOpened to ApReactKit.
        pingAdOpened(rewarded.adUnitId);
      }
    );
    const unsubscribeClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        console.log(Constants.rewardedAdClosed);
        ToastAndroid.show(Constants.rewardedAdClosed, ToastAndroid.SHORT);

        // Sending Ping request for onAdClosed to ApReactKit.
        pingAdClosed(rewarded.adUnitId);
      }
    );

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log(Constants.userEarnedRewardWithAmount, reward);
        ToastAndroid.show(Constants.userEarnedReward, ToastAndroid.SHORT);
      }
    );

    const unsubscribeError = rewarded.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        ToastAndroid.show(
          Constants.errorPrefix + error.message,
          ToastAndroid.SHORT
        );
        console.log(Constants.errorPrefix + error);
      }
    );

    ToastAndroid.show(Constants.loadingAd, ToastAndroid.SHORT);
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
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
              title="Load Ad"
              onPress={() => {
                if (!loaded) {
                  rewarded.load();
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
              title="Show Ad"
              onPress={() => {
                if (loaded) {
                  setLoaded(false);
                  rewarded.show();
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

export default RewardedScreen;
