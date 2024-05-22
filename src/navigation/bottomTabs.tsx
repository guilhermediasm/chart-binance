import React, {useEffect, useRef} from 'react';
import * as Animatable from 'react-native-animatable';
import {useTheme} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, View, useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '~/modules';
import Icon, {Icons} from '../components/Icons';
import Colors from '~/theme/colors';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BlackScreen from '../screens/BlackScreen';

import {
  Touchable,
  AnimatableViewContainer,
  AnimatableText,
  Btn,
} from './styles';

const TabArr = [
  {
    route: 'Add',
    label: 'Add',
    type: Icons.Feather,
    icon: 'plus-square',
    component: BlackScreen,
  },
  {
    route: 'HomeScreen',
    label: 'Home',
    type: Icons.Feather,
    icon: 'home',
    component: HomeScreen,
  },
  {
    route: 'ProfileScreen',
    label: 'Profile',
    type: Icons.Feather,
    icon: 'heart',
    component: ProfileScreen,
  },
];

const Tab = createBottomTabNavigator();

const animate1 = {
  0: {scale: 0.5, translateY: 7},
  0.92: {translateY: -34},
  1: {scale: 1.2, translateY: -24},
};
const animate2 = {
  0: {scale: 1.2, translateY: -24},
  1: {scale: 1, translateY: 7},
};

const circle1 = {
  0: {scaleX: 0},
  0.3: {scaleX: 0.9},
  0.5: {scaleX: 0.2},
  0.8: {scaleX: 0.7},
  1: {scaleX: 1},
};
const circle2 = {0: {scaleX: 1}, 1: {scaleX: 0}};

const TabButton = (props: any) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState?.selected;
  const viewRef = useRef<Animatable.View & View>(null);
  const circleRef = useRef<Animatable.View & View>(null);
  const textRef = useRef<Animatable.Text & Text>(null);
  const isDarkMode = useColorScheme() === 'dark';

  const {colors} = useTheme();
  const color = isDarkMode ? Colors.white : Colors.black;
  const bgColor = colors.background;

  useEffect(() => {
    if (focused) {
      viewRef.current?.animate(animate1);
      circleRef.current?.animate(circle1);
      textRef.current?.transitionTo({scaleX: 1});
    } else {
      viewRef.current?.animate(animate2);
      circleRef.current?.animate(circle2);
      textRef.current?.transitionTo({scaleX: 0});
    }
  }, [focused]);

  return (
    <Touchable onPress={onPress} activeOpacity={1}>
      <AnimatableViewContainer ref={viewRef} duration={1000}>
        <Btn bgColor={bgColor}>
          <Animatable.View ref={circleRef} />
          <Icon
            type={item.type}
            name={item.icon}
            color={focused ? Colors.white : Colors.primary}
          />
        </Btn>
        <AnimatableText ref={textRef} color={color}>
          {item.label}
        </AnimatableText>
      </AnimatableViewContainer>
    </Touchable>
  );
};

export const BottomTabs = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}>
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: props => <TabButton {...props} item={item} />,
              }}
            />
          );
        })}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    position: 'absolute',
    margin: 16,
    borderRadius: 16,
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
});
