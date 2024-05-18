import React from 'react';
import { Lottie, NativeStackScreenProps } from '~/modules';
import { ContainerView } from './styles';
import { Routes } from '~/navigation/routes';

type Props = NativeStackScreenProps<Routes, 'SplashScreen'>;

const SplashScreen = ({ navigation }: Props) => {
  return (
    <ContainerView>
      <Lottie
        source={require('~/assets/animations/splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => navigation.navigate('Main')}
      />
    </ContainerView>
  );
};

export default SplashScreen;
