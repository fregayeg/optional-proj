import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import theme from "@app/constants/theme";
/**
 * FRE - Sliders icon following fontawesome
 * https://fontawesome.com/icons/sliders
 *
 * @param props
 * @constructor
 */
const SlidersIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill={props.color ? props.color : theme.colors.primary}
    viewBox="0 0 512 512"
    width={props.width || 16}
    height={props.height || 16}
    {...props}
  >
    <Path d="M0 416c0-17.7 14.33-32 32-32h54.66C99 355.7 127.2 336 160 336c32.8 0 60.1 19.7 73.3 48H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H233.3c-13.2 28.3-40.5 48-73.3 48s-61-19.7-73.34-48H32c-17.67 0-32-14.3-32-32zm192 0c0-17.7-14.3-32-32-32s-32 14.3-32 32 14.3 32 32 32 32-14.3 32-32zm160-240c32.8 0 60.1 19.7 73.3 48H480c17.7 0 32 14.3 32 32s-14.3 32-32 32h-54.7c-13.2 28.3-40.5 48-73.3 48s-61-19.7-73.3-48H32c-17.67 0-32-14.3-32-32s14.33-32 32-32h246.7c12.3-28.3 40.5-48 73.3-48zm32 80c0-17.7-14.3-32-32-32s-32 14.3-32 32 14.3 32 32 32 32-14.3 32-32zm96-192c17.7 0 32 14.33 32 32 0 17.7-14.3 32-32 32H265.3c-13.2 28.3-40.5 48-73.3 48s-61-19.7-73.3-48H32c-17.67 0-32-14.3-32-32 0-17.67 14.33-32 32-32h86.7C131 35.75 159.2 16 192 16s60.1 19.75 73.3 48H480zM160 96c0 17.7 14.3 32 32 32s32-14.3 32-32c0-17.67-14.3-32-32-32s-32 14.33-32 32z"/>
  </Svg>
)
export default React.memo(SlidersIcon)
