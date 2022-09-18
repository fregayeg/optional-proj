import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../../constants/theme';

const HeartFillIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill={props.color ? props.color : theme.colors.primary}
    className="bi bi-heart-fill"
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
    />
  </Svg>
);

export default HeartFillIcon;
