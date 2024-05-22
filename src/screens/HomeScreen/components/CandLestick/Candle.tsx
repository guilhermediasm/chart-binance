import React from 'react';
import {Line, Rect} from 'react-native-svg';

import {scaleY, scaleBody} from './ChartHelpers';

const MARGIN = 2;

export interface Candle {
  date: string;
  day: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandleProps {
  candle: Candle;
  index: number;
  width: number;
  ArrayCandle: Candle[];
}

const Candle = ({candle, index, width, ArrayCandle}: CandleProps) => {
  if (
    !candle ||
    !candle?.close ||
    !candle?.open ||
    !candle?.high ||
    !candle?.low
  ) {
    return <></>;
  }
  const {close, open, high, low} = candle;
  const fill = close > open ? '#4AFA9A' : '#E33F64';
  const x = index * width;
  const max = Math.max(open, close);
  const min = Math.min(open, close);
  return (
    <>
      <Line
        x1={x + width / 2}
        y1={scaleY(low, ArrayCandle)}
        x2={x + width / 2}
        y2={scaleY(high, ArrayCandle)}
        stroke={fill}
        strokeWidth={1}
      />
      <Rect
        x={x + MARGIN}
        y={scaleY(max, ArrayCandle)}
        width={width - MARGIN * 2}
        height={scaleBody(max - min, ArrayCandle)}
        {...{fill}}
      />
    </>
  );
};

export default Candle;
