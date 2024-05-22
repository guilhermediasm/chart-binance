import React from 'react';
import {Svg} from 'react-native-svg';

import Candle, {Candle as TypeCandle} from './Candle';
import {SIZE} from './ChartHelpers';

const Chart = ({candleData}: {candleData: TypeCandle[]}) => (
  <Svg key={Math.random().toString()} width={SIZE} height={SIZE}>
    {candleData.map((candle: any, index: any) => (
      <Candle
        key={candle?.date + Math.random().toString()}
        ArrayCandle={candleData}
        width={SIZE / candleData.length}
        {...{candle, index}}
      />
    ))}
  </Svg>
);

export default Chart;
