import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';

import {formatUSD, scaleYInvert} from './ChartHelpers';
import {Candle} from './Candle';

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignSelf: 'flex-end',
    backgroundColor: '#FEFFFF',
    borderRadius: 4,
    padding: 4,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

interface LabelProps {
  translateY: Animated.SharedValue<number>;
  opacity: Animated.SharedValue<number>;
  Candles: Candle[];
}

const Label = ({translateY, opacity, Candles}: LabelProps) => {
  const text = useDerivedValue(() => {
    const price = scaleYInvert(translateY.value, Candles);
    return formatUSD(price);
  });

  const horizontal = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));
  return (
    <Animated.View style={[styles.container, horizontal]}>
      <ReText {...{text}} />
    </Animated.View>
  );
};

export default Label;
