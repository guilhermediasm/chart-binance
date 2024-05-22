import React, {useEffect, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {StyleSheet, ScrollView, View} from 'react-native';

import LineChart from './components/ChartLine';
import CandlestickChart from './components/CandLestick';
import {TCandle} from 'react-native-wagmi-charts';

// Function to connect to Binance WebSocket API and get data
const useBinanceWebSocket = (symbol: string, interval: string) => {
  const [lineData, setLineData] = useState<
    {timestamp: number; value: number}[]
  >([]);
  const [candleData, setCandleData] = useState<TCandle[]>([]);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`,
    );

    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      const {
        k: {t, o, h, l, c},
      } = message;

      const newLineData = {timestamp: t, value: parseFloat(c)};
      const newCandleData = {
        timestamp: t,
        open: parseFloat(o),
        high: parseFloat(h),
        low: parseFloat(l),
        close: parseFloat(c),
      };

      setLineData(prevData => [...prevData.slice(-99), newLineData]);
      setCandleData(prevData => [...prevData.slice(-99), newCandleData]);
    };

    return () => {
      ws.close();
    };
  }, [symbol, interval]);

  return {lineData, candleData};
};

const HomeScreen = () => {
  const {lineData, candleData} = useBinanceWebSocket('btcusdt', '1m');

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      {candleData.length > 0 && <CandlestickChart candleData={candleData} />}
    </View>
  );
};

export default HomeScreen;
