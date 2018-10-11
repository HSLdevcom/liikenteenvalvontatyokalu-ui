import React from "react";
import {Svg, Path, G} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize} from "../helpers/svg";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 952 283 283"
      preserveAspectRatio="xMidYMid meet">
      <G fill={fill} fillRule="nonzero">
        <Path d="M40.038,994.883c-22.913,23.385-36.85,54.093-39.685,86.927c7.559,1.417,16.535,1.182,26.929-0.949 c19.606-4.724,42.991-17.008,63.779-36.14c20.787-19.134,34.96-41.102,40.866-60.473c4.016-12.519,4.488-23.386,2.126-31.889 c-35.433,1.889-68.976,17.007-94.015,42.518L40.038,994.883z M0.118,1102.125c4.016,67.559,54.803,122.833,121.652,132.283 c0.472-8.741,2.126-17.953,4.961-27.166c8.268-26.692,26.456-54.802,52.677-78.896c26.22-24.095,55.511-39.92,82.912-46.062 c6.85-1.654,13.701-2.363,20.551-2.599c-7.086-67.558-60.472-120.707-128.03-127.084c1.89,11.811,0.472,24.802-3.543,37.558 c-7.559,23.622-23.622,48.189-46.535,69.448c-23.149,21.26-48.897,35.433-72.991,40.866 C20.905,1102.833,10.039,1103.542,0.118,1102.125L0.118,1102.125z M188.619,1147.242c-21.496,21.024-36.142,44.882-42.755,65.905 c-2.362,8.267-3.78,15.827-4.016,22.677c74.408-0.233,136.061-57.401,141.494-131.574c0-1.417,0-3.07,0-4.487 c-5.197,0.233-10.866,0.949-16.771,2.126c-22.913,5.196-49.606,19.369-73.464,41.338 C191.454,1144.644,190.037,1146.062,188.619,1147.242z" />
      </G>
    </Svg>
  );
}

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.displayName = "Icons.Sport";
