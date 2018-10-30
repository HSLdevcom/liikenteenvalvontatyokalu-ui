import React from "react";
import {Svg, G, Path, Rect} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize, svgTranslate} from "../helpers/svg";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 0 21 20"
      version="1.1"
      preserveAspectRatio="xMidYMid meet">
      <G fillRule="evenodd">
        <Path
          fill={fill}
          d="M1.17515789,0.0700350877 C1.78554386,0.0700350877 2.2802807,0.56477193 2.2802807,1.17515789 L2.2802807,19.9623158 L0.0700350877,19.9623158 L0.0700350877,1.17515789 C0.0700350877,0.56477193 0.56477193,0.0700350877 1.17515789,0.0700350877 Z"
          id="Shape"
        />
        <G {...svgTranslate(2, 1)}>
          <Rect
            fill={fill}
            id="Rectangle-path"
            x="2.81515789"
            y="2.81515789"
            width="2.76280702"
            height="1.65768421"
          />
          <Rect
            fill={fill}
            id="Rectangle-path"
            x="2.81515789"
            y="5.02540351"
            width="12.7089123"
            height="1"
          />
          <Rect
            fill={fill}
            id="Rectangle-path"
            x="6.13052632"
            y="2.81515789"
            width="2.76280702"
            height="1.65768421"
          />
          <Rect
            fill={fill}
            id="Rectangle-path"
            x="9.44589474"
            y="2.81515789"
            width="2.76280702"
            height="1.65768421"
          />
          <Path
            fill={fill}
            d="M17.7343158,0.0523508772 L0.0523508772,0.0523508772 L0.0523508772,9.99845614 L17.7343158,9.99845614 C18.3447018,9.99845614 18.8394386,9.5037193 18.8394386,8.89333333 L18.8394386,1.15747368 C18.8394386,0.547087719 18.3447018,0.0523508772 17.7343158,0.0523508772 Z M16.0766316,6.68308772 C16.0766316,6.9882807 15.8292632,7.23564912 15.5240702,7.23564912 L14.3707368,7.23564912 C14.4014035,7.32217544 14.4189474,7.41487719 14.4189474,7.51192982 C14.4189474,7.96968421 14.0478596,8.34077193 13.5901053,8.34077193 C13.1323509,8.34077193 12.7612632,7.96968421 12.7612632,7.51192982 C12.7612632,7.41487719 12.778807,7.32217544 12.8094737,7.23564912 L5.52975439,7.23564912 C5.56042105,7.32217544 5.57796491,7.41487719 5.57796491,7.51192982 C5.57796491,7.96968421 5.20687719,8.34077193 4.74912281,8.34077193 C4.29136842,8.34077193 3.9202807,7.96968421 3.9202807,7.51192982 C3.9202807,7.41487719 3.93782456,7.32217544 3.96849123,7.23564912 L2.81515789,7.23564912 C2.50996491,7.23564912 2.26259649,6.9882807 2.26259649,6.68308772 L2.26259649,2.81515789 C2.26259649,2.50996491 2.50996491,2.26259649 2.81515789,2.26259649 L15.5240702,2.26259649 C15.8292632,2.26259649 16.0766316,2.50996491 16.0766316,2.81515789 L16.0766316,6.68308772 Z"
            id="Shape"
          />
          <Rect
            fill={fill}
            id="Rectangle-path"
            x="12.7612632"
            y="2.81515789"
            width="2.76280702"
            height="1.65768421"
          />
        </G>
      </G>
    </Svg>
  );
}

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.displayName = "Icons.BusStop";