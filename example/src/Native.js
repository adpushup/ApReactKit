import React, { useEffect, useRef, useState } from 'react';

// Importing ApReactKit
import {
  pingAdClosed,
  pingAdOpened,
  pingAdLoaded,
  pingAdImpression,
} from 'ap-react-kit';

import {
  ActivityIndicator,
  Platform,
  Text,
  View,
  ToastAndroid,
} from 'react-native';
import NativeAdView, {
  AdvertiserView,
  CallToActionView,
  HeadlineView,
  IconView,
  StarRatingView,
  StoreView,
  TaglineView,
} from 'react-native-admob-native-ads';
import { Constants, AdUnitIds } from './Constants';

const NativeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const nativeAdRef = useRef();

  const onAdFailedToLoad = (event) => {
    setError(true);
    setLoading(false);
    console.log(Constants.errorPrefix, event.error.message);
    ToastAndroid.show(
      Constants.errorPrefix + event.error.message,
      ToastAndroid.SHORT
    );
  };

  const onAdLoaded = () => {
    console.log(Constants.nativeAdLoaded);
    ToastAndroid.show(Constants.nativeAdLoaded, ToastAndroid.SHORT);

    // Sending Ping request for onAdLoaded to ApReactKit.
    pingAdLoaded(AdUnitIds.native);
  };

  const onAdImpression = () => {
    console.log(Constants.nativeAdImpression);
    ToastAndroid.show(Constants.nativeAdImpression, ToastAndroid.SHORT);

    // Sending Ping request for onAdImpression to ApReactKit.
    pingAdImpression(AdUnitIds.native);
  };

  const onAdOpened = () => {
    console.log(Constants.nativeAdOpened);
    ToastAndroid.show(Constants.nativeAdOpened, ToastAndroid.SHORT);

    // Sending Ping request for onAdOpened to ApReactKit.
    pingAdOpened(AdUnitIds.native);
  };

  const onAdClosed = () => {
    console.log(Constants.nativeAdClosed);
    ToastAndroid.show(Constants.nativeAdClosed, ToastAndroid.SHORT);

    // Sending Ping request for onAdClosed to ApReactKit.
    pingAdClosed(AdUnitIds.native);
  };

  const onNativeAdLoaded = (event) => {
    console.log(Constants.nativeAdRecieved, event);
    ToastAndroid.show(Constants.nativeAdRecieved, ToastAndroid.SHORT);
    setLoading(false);
    setLoaded(true);
    setError(false);
  };

  useEffect(() => {
    nativeAdRef.current?.loadAd();
    return () => {
      setLoaded(false);
    };
  }, []);

  return (
    <>
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <NativeAdView
          ref={nativeAdRef}
          onAdLoaded={onAdLoaded}
          onAdFailedToLoad={onAdFailedToLoad}
          onAdImpression={onAdImpression}
          onNativeAdLoaded={onNativeAdLoaded}
          onAdOpened={onAdOpened}
          onAdClosed={onAdClosed}
          style={{
            width: '98%',
            alignSelf: 'center',
            backgroundColor: 'transparent',
          }}
          adUnitID={AdUnitIds.native}
        >
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f0f0f0',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: !loading && !error && loaded ? 0 : 1,
                zIndex: !loading && !error && loaded ? 0 : 10,
              }}
            >
              {loading && <ActivityIndicator size={28} color="#a9a9a9" />}
              {error && <Text style={{ color: '#a9a9a9' }}>:-(</Text>}
            </View>

            <View
              style={{
                height: 100,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingHorizontal: 10,
                opacity: loading || error || !loaded ? 0 : 1,
              }}
            >
              <IconView
                style={{
                  width: 60,
                  height: 60,
                }}
              />
              <View
                style={{
                  flexGrow: 1,
                  flexShrink: 1,
                  paddingHorizontal: 6,
                }}
              >
                <HeadlineView
                  hello="abc"
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                  }}
                />
                <TaglineView
                  numberOfLines={2}
                  style={{
                    fontSize: 11,
                  }}
                />
                <AdvertiserView
                  style={{
                    fontSize: 10,
                    color: 'gray',
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <StoreView
                    style={{
                      fontSize: 12,
                    }}
                  />
                  <StarRatingView
                    starSize={12}
                    fullStarColor="orange"
                    emptyStarColor="gray"
                    style={{
                      width: 65,
                      marginLeft: 10,
                    }}
                  />
                </View>
              </View>

              <CallToActionView
                style={[
                  {
                    minHeight: 45,
                    paddingHorizontal: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 10,
                    maxWidth: 100,
                    width: 80,
                  },
                  Platform.OS === 'ios'
                    ? {
                        backgroundColor: '#FFA500',
                        borderRadius: 10,
                      }
                    : {},
                ]}
                buttonAndroidStyle={{
                  backgroundColor: '#FFA500',
                  borderRadius: 10,
                }}
                allCaps
                textStyle={{
                  fontSize: 13,
                  flexWrap: 'wrap',
                  textAlign: 'center',
                  color: 'white',
                }}
              />
            </View>
          </View>
        </NativeAdView>
      </View>
    </>
  );
};

export default NativeScreen;
