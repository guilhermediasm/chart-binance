import {View, Text} from 'react-native-animatable';
import {styled} from '~/modules';

export const Touchable = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 70px;
`;

export const AnimatableViewContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 70px;
`;

export const AnimatableText = styled(Text)`
  font-size: 12px;
  text-align: center;
  color: ${({color}: {color: string}) => color};
  font-weight: 500;
`;

export const Btn = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border-width: 4px;
  border-color: ${({bgColor}: {bgColor: string}) => bgColor};
  background-color: ${({bgColor}: {bgColor: string}) => bgColor};
  justify-content: center;
  align-items: center;
`;
