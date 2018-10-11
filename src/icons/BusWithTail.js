import React from "react";
import {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  Svg,
} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize, svgTranslate} from "../helpers/svg";
import {Colors} from "./HSL_COLORS";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 0 24 54"
      preserveAspectRatio="xMidYMid meet">
      <Defs>
        <LinearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="97.8555485%"
          id="BusWithTail-linearGradient-1">
          <Stop stopColor={fill} stopOpacity="0" offset="0%" />
          <Stop stopColor={fill} stopOpacity="0.5" offset="100%" />
        </LinearGradient>
      </Defs>
      <G
        id="icon-bus-live"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd">
        <Path
          fill="url(#BusWithTail-linearGradient-1)"
          d="M12,54 C18.627417,54 24,48.627417 24,42 C24,35.372583 18.627417,0 12,0 C5.372583,0 0,35.372583 0,42 C0,48.627417 5.372583,54 12,54 Z"
          id="tail"
        />
        <G {...svgTranslate(0.0, 30.0)}>
          <Circle id="Oval-3" fill={fill} cx="12" cy="12" r="12" />
          <G id="icon-bus" {...svgTranslate(3.0, 3.0)}>
            <G id="icon_bus">
              <Path
                fill="#FFFFFF"
                fillRule="nonzero"
                d="M15.3703125,17.46 L2.7703125,17.46 C1.57725,17.46 0.6103125,16.4930625 0.6103125,15.3 L0.6103125,2.7 C0.6103125,1.5069375 1.57725,0.54 2.7703125,0.54 L15.3703125,0.54 C16.563375,0.54 17.5303125,1.5069375 17.5303125,2.7 L17.5303125,15.3 C17.5303125,16.4930625 16.563375,17.46 15.3703125,17.46 Z"
                id="Shape"
              />
              <Path
                fill={fill}
                fillRule="nonzero"
                d="M0.0005625,2.228625 C0.0005625,1.013625 1.0130625,0.001125 2.2280625,0.001125 L15.7269375,0.001125 C16.9869375,0.001125 17.9994375,1.013625 17.9994375,2.228625 L17.9994375,15.7275 C17.9994375,16.9875 16.9869375,18 15.7269375,18 L2.2280625,18 C1.0130625,18 0.0005625,16.9875 0.0005625,15.7275 L0.0005625,2.228625 Z M9.0225,1.936125 C7.155,1.936125 5.535,2.026125 3.7580625,2.273625 C3.2180625,2.341125 2.9030625,2.656125 2.9030625,3.128625 L2.9030625,13.6575 C2.9030625,13.995 3.1505625,14.22 3.3755625,14.2875 L4.0505625,14.4 L4.0505625,15.8175 C4.0505625,15.975 4.1855625,16.0875 4.3655625,16.0875 L5.4455625,16.0875 C5.5805625,16.0875 5.7155625,15.975 5.7155625,15.8175 L5.7155625,14.5575 C6.5930625,14.67 7.7855625,14.715 8.9780625,14.715 C10.1930625,14.715 11.4305625,14.67 12.2855625,14.5575 L12.2855625,15.8175 C12.2855625,15.975 12.4430625,16.0875 12.5780625,16.0875 L13.6580625,16.0875 C13.8380625,16.0875 13.9730625,15.975 13.9730625,15.8175 L13.9730625,14.4 L14.6480625,14.2875 C14.8955625,14.22 15.1205625,14.0175 15.1205625,13.6575 L15.1205625,3.128625 C15.1205625,2.656125 14.8055625,2.341125 14.2655625,2.273625 C12.4655625,2.048625 10.823625,1.936125 9.023625,1.936125 L9.0225,1.936125 Z M13.6794375,10.9130625 C12.3969375,11.1380625 10.7094375,11.3630625 9.0675,11.3630625 C7.335,11.3630625 5.6930625,11.1605625 4.3880625,10.8680625 C4.0280625,10.8005625 3.8930625,10.6655625 3.8930625,10.3730625 L3.8930625,3.803625 C3.8930625,3.511125 4.0280625,3.308625 4.3880625,3.308625 L13.6794375,3.353625 C14.0394375,3.353625 14.1519375,3.556125 14.1519375,3.848625 L14.1519375,10.4180625 C14.1519375,10.7105625 14.0394375,10.8680625 13.6794375,10.9130625 Z M4.2525,12.7130625 C4.275,12.4205625 4.545,12.1505625 4.86,12.1505625 C5.175,12.1505625 5.445,12.4205625 5.445,12.7130625 C5.445,13.0505625 5.175,13.3205625 4.86,13.3205625 C4.5225,13.2980625 4.2525,13.0280625 4.2525,12.7130625 Z M12.4869375,12.7130625 C12.5094375,12.4205625 12.7794375,12.1505625 13.0719375,12.1505625 C13.3869375,12.1505625 13.6569375,12.4205625 13.6569375,12.7130625 C13.6569375,13.0505625 13.3869375,13.3205625 13.0719375,13.3205625 C12.7569375,13.2980625 12.4869375,13.0280625 12.4869375,12.7130625 Z"
                id="Shape"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}

Icon.defaultProps = {
  fill: Colors.transport.bus,
};

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.displayName = "Icons.BusWithTail";
