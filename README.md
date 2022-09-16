# ap-react-kit
Ap React Kit is a React Native Module for ApAppKit. It currently supports Android Platform. It allows you to integrate AdPushup's AdX Ads into your apps.
## Installation

```sh
npm install ap-react-kit
```

## Configure your app
In your project-level build.gradle file (Located at : '/android/build.gradle'), include jitpack Maven Repository in allprojects section:

```groovy
allprojects {
    repositories {
        maven { url 'https://www.jitpack.io' }
        // ...
    }
    // ...
}
```


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
