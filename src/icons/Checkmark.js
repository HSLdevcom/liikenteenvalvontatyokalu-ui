import React from "react";
import {Svg, Path} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize} from "../helpers/svg";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 0 376 376"
      version="1.1"
      preserveAspectRatio="xMidYMid meet">
      <Path
        fill={fill}
        d="M256.478,109.288158 L159.55,206.172368 L117.61,164.251316 C108.29,154.935526 94.31,154.935526 84.99,164.251316 L84.99,164.251316 C75.67,173.567105 75.67,187.540789 84.99,196.856579 L159.55,271.382895 L290.03,141.893421 C299.35,132.577632 299.35,118.603947 290.03,109.288158 L290.03,109.288158 C279.778,100.903947 265.798,100.903947 256.478,109.288158 Z"
        id="Shape"
      />
    </Svg>
  );
}

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.displayName = "Icons.Checkmark";
