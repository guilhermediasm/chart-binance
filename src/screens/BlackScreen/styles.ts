import {styled} from '~/modules';

export const ButtonsContainer = styled.View`
  flex: 1;
  background-color: aqua;
`;

export const SafeAreaView = styled.SafeAreaView`
  background-color: ${({theme}: {theme: any}) => theme.colors.background};
  flex: 1;
`;
