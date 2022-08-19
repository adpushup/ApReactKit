export const Constants = {
  linkingErrorPrefix: `The package 'ap-react-kit' doesn't seem to be linked. Make sure: \n\n`,
  linkingErrorSuffix:
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo managed workflow\n',
  linkingErrorOtherPlatform:
    '- You are using this package for Android Apps only.\n',
  android: 'android',
  adImpression: 'onAdImpression',
  adOpened: 'onAdOpened',
  adClosed: 'onAdClosed',
  adLoaded: 'onAdLoaded',
};
