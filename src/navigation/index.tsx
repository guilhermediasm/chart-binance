import React from 'react';
import {NavigationContainer, createNativeStackNavigator} from '~/modules';

import {BottomTabs} from './bottomTabs';
import SplashScreen from '~/screens/SplashScreen';
import {Routes} from './routes';

const Stack = createNativeStackNavigator<Routes>();

const AppRoutes = (): React.ReactElement | null => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
