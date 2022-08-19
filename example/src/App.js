import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, HomeScreenAppBar } from './Home';
import mobileAds from 'react-native-google-mobile-ads';
import BannerScreen from './Banner';
import InterstitialScreen from './Interstitial';
import RewardedScreen from './Rewarded';
import NativeScreen from './Native';
import { Constants } from './Constants';

class App extends Component {
  componentDidMount() {
    // Initializing Google Ads.
    mobileAds().initialize();
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={Constants.routeHome}
            options={{ header: HomeScreenAppBar }}
            component={HomeScreen}
          />
          <Stack.Screen name={Constants.routeBanner} component={BannerScreen} />
          <Stack.Screen
            name={Constants.routeInterstitial}
            component={InterstitialScreen}
          />
          <Stack.Screen
            name={Constants.routeRewarded}
            component={RewardedScreen}
          />
          <Stack.Screen name={Constants.routeNative} component={NativeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
