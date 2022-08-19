import { NativeModules, Platform } from 'react-native';
import { Constants } from './contstants';

const LINKING_ERROR =
  Constants.linkingErrorPrefix +
  Platform.select({
    android: '',
    default: Constants.linkingErrorOtherPlatform,
  }) +
  Constants.linkingErrorSuffix;

const ApReactKit = NativeModules.ApReactKit
  ? NativeModules.ApReactKit
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

// Sending Ping Request for Ad Impression Callback.
function pingAdImpression(adUnitId: String, adResponseId: String) {
  if (Platform.OS === Constants.android)
    ApReactKit.ping(adUnitId, adResponseId, Constants.adImpression);
}

// Sending Ping Request for Ad Opened Callback.
function pingAdOpened(adUnitId: String, adResponseId: String) {
  if (Platform.OS === Constants.android)
    ApReactKit.ping(adUnitId, adResponseId, Constants.adOpened);
}

// Sending Ping Request for Ad Closed Callback.
function pingAdClosed(adUnitId: String, adResponseId: String) {
  if (Platform.OS === Constants.android)
    ApReactKit.ping(adUnitId, adResponseId, Constants.adClosed);
}

// Sending Ping Request for Ad Loaded Callback.
function pingAdLoaded(adUnitId: String, adResponseId: String) {
  if (Platform.OS === Constants.android)
    ApReactKit.ping(adUnitId, adResponseId, Constants.adLoaded);
}

export { pingAdImpression, pingAdOpened, pingAdClosed, pingAdLoaded };
