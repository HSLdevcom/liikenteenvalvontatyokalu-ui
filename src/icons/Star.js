import React from "react";
import {Svg, Path} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize} from "../helpers/svg";

export default function Icon({stroke, fill, height, width, ...rest}) {
  const strokeProps = stroke ? {stroke, strokeWidth: 2} : {};
  const viewBox = stroke ? "-1 -1 38 37" : "0 0 34 33";
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox={viewBox}
      version="1.1"
      preserveAspectRatio="xMidYMid meet">
      <Path
        {...strokeProps}
        fill={fill}
        d="M33.3995455,14.6764839 L26.9298485,21.4404194 L28.21,30.7070323 C28.2778788,31.451129 28.0074242,32.1952258 27.4018182,32.6008065 C26.7962121,33.0063871 26.0537879,33.0745161 25.380303,32.804129 L16.9569697,28.6780645 L8.53363636,32.804129 C8.26424242,32.9393226 7.99484848,32.9393226 7.72545455,32.9393226 C7.32136364,32.9393226 6.91621212,32.8722581 6.58,32.6008065 C5.97333333,32.1952258 5.63712121,31.451129 5.77181818,30.7070323 L6.98515152,21.4404194 L0.583333333,14.6764839 C0.0445454545,14.1357097 -0.0901515152,13.3916129 0.111363636,12.7145806 C0.313939394,11.9704839 0.920606061,11.4967742 1.66090909,11.3615806 L10.8256061,9.67112903 L15.2727273,1.419 C15.61,0.743032258 16.2834848,0.404516129 16.9569697,0.404516129 C17.6983333,0.404516129 18.3718182,0.743032258 18.7090909,1.419 L23.1572727,9.67112903 L32.3219697,11.3615806 C33.0633333,11.4967742 33.6021212,11.9704839 33.8715152,12.7145806 C34.0740909,13.3905484 33.9393939,14.1346452 33.3995455,14.6764839 Z"
        id="Star"
      />
    </Svg>
  );
}

Icon.propTypes = {
  stroke: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.defaultProps = {
  stroke: null,
};

Icon.displayName = "Icons.Star";
