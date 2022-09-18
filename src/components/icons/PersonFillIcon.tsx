import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../constants/theme';

const PersonFillIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill={props.color ? props.color : theme.colors.primary}
    className="bi bi-person-fill"
    {...props}
  >
    <Path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
  </Svg>
);

export default PersonFillIcon;
