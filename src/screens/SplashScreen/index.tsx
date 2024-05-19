import React from 'react';
import {Lottie, NativeStackScreenProps} from '~/modules';

import {Routes} from '~/navigation/routes';

type Props = NativeStackScreenProps<Routes, 'SplashScreen'>;

const SplashScreen = ({navigation}: Props) => {
  return (
    <Lottie
      style={{flex: 1, backgroundColor: '#000'}}
      source={require('~/assets/animations/splash.json')}
      autoPlay
      loop={false}
      onAnimationFinish={() => navigation.navigate('Main')}
    />
  );
};

export default SplashScreen;
