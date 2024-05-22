import {Dimensions} from 'react-native';
import {interpolate, Extrapolate} from 'react-native-reanimated';
import {round} from 'react-native-redash';

import {Candle} from './Candle';

export const {width: SIZE} = Dimensions.get('window');

export const formatUSD = (value: number) => {
  'worklet';
  return `$ ${round(value, 2).toLocaleString('en-US', {currency: 'USD'})}`;
};

export const formatDatetime = (value: string) => {
  'worklet';

  const d = new Date(value);
  return d.toLocaleTimeString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getDomain = (rows: Candle[]): [number, number] => {
  'worklet';
  if (rows?.length > 0) {
    const values = rows.map(({high, low}) => [high, low]).flat();
    return [Math.min(...values), Math.max(...values)];
  }

  return [0, 0];
};

export const scaleY = (value: number, CANDLES: Candle[]) => {
  'worklet';
  return interpolate(value, getDomain(CANDLES), [SIZE, 0], Extrapolate.CLAMP);
};

export const scaleBody = (value: number, CANDLES: Candle[]) => {
  'worklet';
  return interpolate(
    value,
    [0, Math.max(...getDomain(CANDLES)) - Math.min(...getDomain(CANDLES))],
    [0, SIZE],
    Extrapolate.CLAMP,
  );
};

export const scaleYInvert = (y: number, CANDLES: Candle[]) => {
  'worklet';
  return interpolate(
    y,
    [0, SIZE],
    getDomain(CANDLES).reverse(),
    Extrapolate.CLAMP,
  );
};
