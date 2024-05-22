import {styled} from '~/modules';

export const ButtonsContainer = styled.View`
  flex: 1;
  background-color: aqua;
`;

export const SafeAreaView = styled.SafeAreaView`
  background-color: ${({theme}: {theme: any}) => theme.colors.background};
  flex: 1;
  align-items: center;
  background-color: aqua;
`;

export const TextHello = styled.Text`
  font-size: 14px;
`;
