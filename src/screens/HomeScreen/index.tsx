import React, {useEffect, useState} from 'react';
import {View, Switch} from 'react-native';

import ChartLineChart from './components/ChartLine';
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
      setCandleData(prevData => [...prevData.slice(-50), newCandleData]);
    };

    return () => {
      ws.close();
    };
  }, [symbol, interval]);

  return {lineData, candleData};
};

const HomeScreen = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const {lineData, candleData} = useBinanceWebSocket('btcusdt', '1m');

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <CandlestickChart
        candleData={candleData}
        visibility={candleData.length > 0 && isEnabled}
      />
      {lineData.length > 0 && !isEnabled && (
        <View style={{position: 'absolute', top: '30%'}}>
          <ChartLineChart lineData={lineData} />
        </View>
      )}
      <Switch
        trackColor={{false: '#9eff81', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#00fff2'}
        ios_backgroundColor="#eaff00"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{position: 'absolute', right: 0, bottom: 95}}
      />
    </View>
  );
};

export default HomeScreen;
