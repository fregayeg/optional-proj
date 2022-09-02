import 'react-native-svg';
import React from "react";

declare module 'react-native-openanything';
declare module '@react-native-community/netinfo/jest/netinfo-mock.js';
declare module 'react-native-svg' {
  export interface SvgProps {
    xmlns?: string;
    xmlnsXlink?: string;
    className?: string;
  }
}

export declare interface BasicReactComponentProps {
  children?: React.ReactNode; // best, accepts everything React can render
  style?: React.CSSProperties; // to pass through style props
}
