import React from "react";

export interface SliderContainerProps {
  caption: string;
  children: React.ReactElement;
  sliderValue: Array<number>;
  trackMarks?: Array<number>;
  vertical?: boolean;
  expandBottomSheet: Function
}

