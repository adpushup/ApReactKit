# ap-react-kit
Ap React Kit is a React Native Module for ApAppKit. It currently supports Android Plateform. It allows you to integrate AdPushup's AdX Ads into your apps.
## Installation

```sh
npm install ap-react-kit
```

## Configure your app
In your project-level build.gradle file (Located at : '/android/build.gradle'), include AdPushUp Maven Repository in allprojects section:

```groovy
allprojects {
    repositories {
        // ...
        // AdPushUp Maven Repository
        maven {
            name 'apappkit'
            url 'https://pkgs.dev.azure.com/adpushup/_packaging/adpushup/maven/v1'
            credentials {
                username "adpushup"
                password "grs27r4xxaob7rds3h64xlh2ft6va2kx54l5jaqmhd3doh3ubc3q"
            }
        }
        // ...
    }
    // ...
}
```

NOTE: Please get the latest credentials of AdPushUp Maven Repository from the AdPushup.

## Usage

```js
import { pingAdLoaded, pingAdOpened, pingAdClosed, pingAdImpression } from "ap-react-kit";

// ...
onAdLoaded={ () => {
    pingAdLoaded(adUnitId);
    console.log('Ad Loaded');
}}
onAdOpened={ () => {
    pingAdOpened(adUnitId);
    console.log('Ad Opened');
}}
onAdClosed={ () => {
    pingAdClosed(adUnitId);
    console.log('Ad Closed');
}}
onAdImpression={ () => {
    pingAdClosed(adUnitId);
    console.log('Ad Impression Recorded');
}}
// ...
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT