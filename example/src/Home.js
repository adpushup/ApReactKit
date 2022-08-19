import React from 'react';
import { Appbar } from 'react-native-paper';
import { View, Button, ScrollView } from 'react-native';
import { Constants } from './Constants';

function HomeScreenAppBar() {
  return (
    <Appbar.Header>
      <Appbar.Content title={Constants.titleMain} />
    </Appbar.Header>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <ScrollView>
        <View style={{ margin: 10 }}>
          <Button
            title={Constants.titleBanner}
            onPress={() => navigation.navigate(Constants.routeBanner)}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            title={Constants.titleInterstitial}
            onPress={() => navigation.navigate(Constants.routeInterstitial)}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            title={Constants.titleRewarded}
            onPress={() => navigation.navigate(Constants.routeRewarded)}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            title={Constants.titleNative}
            onPress={() => navigation.navigate(Constants.routeNative)}
          />
        </View>
      </ScrollView>
    </>
  );
};

export { HomeScreen, HomeScreenAppBar };
