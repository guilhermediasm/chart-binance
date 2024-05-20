import {renderWithTheme} from '~/utils';
import ProfileScreen from './index';
import {describe} from 'yargs';
import {it} from 'node:test';

describe('HomeScreen', () => {
  it('should be able to render HomeScreen', () => {
    renderWithTheme(<ProfileScreen />);
  });
});
