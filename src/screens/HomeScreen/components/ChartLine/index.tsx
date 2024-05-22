import React, {useMemo} from 'react';
import {Dimensions, Platform} from 'react-native';
import {LineChart} from 'react-native-wagmi-charts';

function invokeHaptic() {
  if (['ios', 'android'].includes(Platform.OS)) {
  }
}

const Index = ({
  lineData,
}: {
  lineData: {
    timestamp: number;
    value: number;
  }[];
}) => {
  const [scaleRelativeToTime, setScaleRelativeToTime] = React.useState(false);
  const [toggleMinMaxLabels, setToggleMinMaxLabels] = React.useState(false);
  const [toggleSnapToPoint, setToggleSnapToPoint] = React.useState(false);
  const [toggleHighlight, setToggleHighlight] = React.useState(false);
  const [yRange, setYRange] = React.useState<undefined | 'low' | 'high'>(
    undefined,
  );

  const toggleYRange = () => {
    setYRange(domain => {
      if (!domain) {
        return 'low';
      }
      if (domain === 'low') {
        return 'high';
      }
      return undefined;
    });
  };

  const [min, max] = useMemo(() => {
    if (Array.isArray(lineData)) {
      const values = lineData.map(d => d.value);
      const _min = Math.min(...values);
      const _max = Math.max(...values);
      return [
        values.findIndex(v => v === _min),
        values.findIndex(v => v === _max),
      ];
    }
    return [0, 0];
  }, [lineData]);

  return (
    <LineChart.Provider
      xDomain={
        scaleRelativeToTime
          ? [lineData[0].timestamp, lineData[lineData.length - 1].timestamp]
          : undefined
      }
      xLength={lineData ? lineData.length * 2 : undefined}
      yRange={{
        min:
          yRange === 'low'
            ? Math.min(...lineData.map(d => d.value)) / 1.1
            : undefined,
        max:
          yRange === 'high'
            ? Math.max(...lineData.map(d => d.value)) * 1.1
            : undefined,
      }}
      data={lineData}>
      <LineChart
        width={Dimensions.get('window').width * 1.8}
        height={Dimensions.get('window').height * 0.4}>
        <LineChart.Path color="black">
          {toggleMinMaxLabels && (
            <>
              <LineChart.Gradient color="black" />
              <LineChart.Tooltip position="top" at={max} />
              <LineChart.Tooltip position="bottom" at={min} yGutter={-10} />
            </>
          )}
          {toggleHighlight && (
            <LineChart.Highlight
              color="red"
              from={Math.floor(lineData.length / 3)}
              to={Math.floor(lineData.length * (2 / 3))}
            />
          )}
        </LineChart.Path>
        <LineChart.CursorCrosshair
          snapToPoint={toggleSnapToPoint}
          onActivated={invokeHaptic}
          onEnded={invokeHaptic}>
          <LineChart.Tooltip position="top" />
          <LineChart.HoverTrap />
        </LineChart.CursorCrosshair>
      </LineChart>
    </LineChart.Provider>
  );
};

export default Index;
