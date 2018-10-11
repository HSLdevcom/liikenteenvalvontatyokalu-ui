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
          id="TramWithTail-linearGradient-1">
          <Stop stopColor={fill} stopOpacity="0" offset="0%" />
          <Stop stopColor={fill} stopOpacity="0.5" offset="100%" />
        </LinearGradient>
      </Defs>
      <G
        id="icon-tram-live"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd">
        <Path
          fill="url(#TramWithTail-linearGradient-1)"
          d="M12,54 C18.627417,54 24,48.627417 24,42 C24,35.372583 18.627417,0 12,0 C5.372583,0 0,35.372583 0,42 C0,48.627417 5.372583,54 12,54 Z"
          id="tail"
        />
        <G {...svgTranslate(0.0, 30.0)}>
          <Circle id="Oval-3" fill={fill} cx="12" cy="12" r="12" />
          <G id="icon-tram" {...svgTranslate(3.0, 3.0)}>
            <G id="icon_tram">
              <Path
                fill="#FFFFFF"
                fillRule="nonzero"
                d="M15.3,17.46 L2.7,17.46 C1.5069375,17.46 0.54,16.4930625 0.54,15.3 L0.54,2.7 C0.54,1.5069375 1.5069375,0.54 2.7,0.54 L15.3,0.54 C16.4930625,0.54 17.46,1.5069375 17.46,2.7 L17.46,15.3 C17.46,16.4930625 16.4930625,17.46 15.3,17.46 Z"
                id="Shape"
              />
              <Path
                fill={fill}
                fillRule="nonzero"
                d="M0.0005625,2.228625 C0.0005625,1.013625 1.0130625,0.001125 2.2280625,0.001125 L15.7269375,0.001125 C16.9869375,0.001125 17.9994375,1.013625 17.9994375,2.228625 L17.9994375,15.7275 C17.9994375,16.9875 16.9869375,18 15.7269375,18 L2.2280625,18 C1.0130625,18 0.0005625,16.9875 0.0005625,15.7275 L0.0005625,2.228625 Z M12.5769375,3.848625 C12.4644375,3.578625 12.3069375,3.443625 12.0369375,3.376125 C11.0694375,3.128625 10.3719375,3.038625 9.4719375,3.016125 L9.4719375,2.228625 L11.1369375,2.228625 C11.3619375,2.228625 11.5419375,2.026125 11.5419375,1.801125 C11.5419375,1.531125 11.3619375,1.328625 11.1369375,1.328625 L6.9075,1.328625 C6.6375,1.328625 6.435,1.531125 6.435,1.801125 C6.435,2.026125 6.6375,2.228625 6.9075,2.228625 L8.55,2.228625 L8.55,3.016125 C7.6275,3.038625 6.885,3.128625 5.985,3.376125 C5.67,3.466125 5.5125,3.578625 5.3775,3.848625 L4.995,4.771125 C4.8825,5.041125 4.8825,5.423625 4.8825,5.716125 L4.8825,13.8155625 C4.8825,14.2205625 5.1525,14.4680625 5.5575,14.5355625 C6.7725,14.7830625 7.83,14.8730625 8.9994375,14.8730625 C10.1244375,14.8730625 11.2044375,14.7830625 12.463875,14.5355625 C12.846375,14.4680625 13.138875,14.2205625 13.138875,13.8155625 L13.138875,5.716125 C13.138875,5.423625 13.071375,5.041125 12.958875,4.771125 L12.576375,3.848625 L12.5769375,3.848625 Z M11.4519375,15.975 L11.4519375,15.3 L10.6194375,15.4125 L10.6194375,15.975 L7.4019375,15.975 L7.4019375,15.4125 L6.5694375,15.3 L6.5694375,15.975 L5.8944375,15.975 C5.6469375,15.975 5.4894375,16.1775 5.4894375,16.38 C5.4894375,16.6725 5.6469375,16.8525 5.8944375,16.8525 L12.126375,16.8525 C12.328875,16.8525 12.553875,16.6725 12.553875,16.38 C12.553875,16.1775 12.328875,15.975 12.126375,15.975 L11.451375,15.975 L11.4519375,15.975 Z M5.6925,12.5105625 C5.6925,12.1955625 5.9175,11.9480625 6.21,11.9480625 C6.525,11.9480625 6.75,12.1955625 6.75,12.5105625 C6.75,12.8030625 6.525,13.0055625 6.21,13.0055625 C5.9175,13.0055625 5.6925,12.8030625 5.6925,12.5105625 Z M5.715,5.536125 L12.2619375,5.536125 L12.2619375,11.0030625 C11.4069375,11.2505625 10.1919375,11.4080625 8.9994375,11.4080625 C7.8294375,11.4080625 6.6144375,11.2280625 5.7144375,11.0030625 L5.7144375,5.536125 L5.715,5.536125 Z M11.3619375,12.5105625 C11.3619375,12.1955625 11.5644375,11.9480625 11.8569375,11.9480625 C12.1719375,11.9480625 12.4194375,12.1955625 12.4194375,12.5105625 C12.4194375,12.8030625 12.1719375,13.0055625 11.8569375,13.0055625 C11.5644375,13.0055625 11.3619375,12.8030625 11.3619375,12.5105625 Z"
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
  fill: Colors.transport.tram,
};

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.displayName = "Icons.TramWithTail";
