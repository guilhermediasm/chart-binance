import React, {FC, PropsWithChildren} from 'react';
import {ThemeProvider} from '~/modules';
import colors from './colors';
import fontsVariant from './fonts';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const theme = {colors, fontsVariant};
export type ThemeType = typeof theme;

const ThemeProviderContainer: FC<PropsWithChildren> = ({children}) => {
  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default ThemeProviderContainer;
