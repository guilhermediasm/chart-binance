import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {clamp} from 'react-native-redash';
import Chart from './Chart';
import Values from './Values';
import Line from './Line';
import Label from './Label';
import {SIZE} from './ChartHelpers';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
});

const Index = ({
  candleData,
  visibility = true,
}: {
  candleData: any[];
  visibility?: boolean;
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({x, y}) => {
      opacity.value = 1;
      translateY.value = clamp(y, 0, SIZE);
      translateX.value =
        x - ((x % SIZE) / candleData.length + SIZE / candleData.length / 2);
    },
    onEnd: () => {
      opacity.value = 0;
    },
  });

  const horizontal = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));

  const vertical = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateX: translateX.value}],
  }));

  return (
    <View style={styles.container}>
      <View>
        {candleData.length > 0 && (
          <View pointerEvents="none">
            <Values {...{translateX, candleData}} />
          </View>
        )}
      </View>
      {visibility && (
        <View>
          <Chart candleData={candleData} />
          <PanGestureHandler minDist={0} {...{onGestureEvent}}>
            <Animated.View style={StyleSheet.absoluteFill}>
              <Animated.View style={[StyleSheet.absoluteFill, horizontal]}>
                <Line x={SIZE} y={0} />
              </Animated.View>
              <Animated.View style={[StyleSheet.absoluteFill, vertical]}>
                <Line x={0} y={SIZE} />
              </Animated.View>
              <Label {...{translateY, opacity, Candles: candleData}} />
            </Animated.View>
          </PanGestureHandler>
        </View>
      )}
    </View>
  );
};

export default Index;
