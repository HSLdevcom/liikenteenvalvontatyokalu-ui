import React from "react";
import {Svg, Path, G} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize} from "../helpers/svg";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 0 35 30"
      preserveAspectRatio="xMidYMid meet">
      <G fill={fill} id="Mobile" fillRule="evenodd">
        <Path
          d="M25.9112903,12.5 C30.766129,12.5 34.7177419,16.3333333 34.7177419,21.1666667 C34.7177419,25.9444444 30.766129,29.8333333 25.9112903,29.8333333 C21,29.8333333 17.1048387,25.9444444 17.1048387,21.1666667 C17.1048387,16.3333333 21,12.5 25.9112903,12.5 Z M2.14516129,0.888888889 L2.14516129,5 L18.6290323,5 L18.6290323,0.888888889 L2.14516129,0.888888889 Z M0.282258065,6.66666667 L0.282258065,10.7777778 L16.766129,10.7777778 L16.766129,6.66666667 L0.282258065,6.66666667 Z M2.14516129,16.5555556 L2.14516129,12.4444444 L18.6290323,12.4444444 L18.6290323,14.1111111 C17.9516129,14.8333333 17.3306452,15.6666667 16.8790323,16.5555556 L2.14516129,16.5555556 Z M15.75,21.1666667 C15.75,20.1111111 15.8629032,19.1666667 16.2016129,18.2222222 L2.14516129,18.2222222 L2.14516129,22.3333333 L15.8064516,22.3333333 C15.75,21.9444444 15.75,21.5555556 15.75,21.1666667 Z M29.9758065,24.9444444 C30.0887097,24.8333333 30.2016129,24.6111111 30.2016129,24.3888889 C30.2016129,23.9444444 29.8064516,23.5555556 29.2983871,23.5555556 C29.016129,23.5555556 28.7903226,23.6666667 28.6209677,23.8333333 C28,24.6111111 27.3790323,25.0555556 26.4193548,25.0555556 C25.1209677,25.0555556 24.2177419,24.3333333 23.766129,23.0555556 L26.6451613,23.0555556 C27.0403226,23.0555556 27.3225806,22.7222222 27.3225806,22.3888889 C27.3225806,22 27.0403226,21.6666667 26.6451613,21.6666667 L23.483871,21.6666667 L23.483871,21.0555556 C23.483871,20.8333333 23.483871,20.6111111 23.5403226,20.3888889 L26.6451613,20.3888889 C27.0403226,20.3888889 27.3225806,20.0555556 27.3225806,19.7222222 C27.3225806,19.3333333 27.0403226,19 26.6451613,19 L23.8225806,19 C24.2741935,17.8333333 25.1209677,17.1111111 26.3064516,17.1111111 C27.266129,17.1111111 27.8870968,17.5 28.5080645,18.2222222 C28.6209677,18.3888889 28.8467742,18.5555556 29.1854839,18.5555556 C29.6935484,18.5555556 30.1451613,18.1111111 30.1451613,17.6111111 C30.1451613,17.3333333 30.0322581,17.1111111 29.9193548,16.9444444 C29.0725806,16 28.0564516,15.3333333 26.3629032,15.3333333 C24.0483871,15.3333333 22.4112903,16.8888889 21.7903226,19 L20.8870968,19 C20.4919355,19 20.2096774,19.3333333 20.2096774,19.7222222 C20.2096774,20.0555556 20.4919355,20.3888889 20.8870968,20.3888889 L21.5080645,20.3888889 L21.5080645,21.6666667 L20.8870968,21.6666667 C20.4919355,21.6666667 20.2096774,22 20.2096774,22.3888889 C20.2096774,22.7222222 20.4919355,23.0555556 20.8870968,23.0555556 L21.733871,23.0555556 C22.3548387,25.2777778 24.0483871,26.7777778 26.4193548,26.7777778 C28.0564516,26.7777778 29.1290323,26.0555556 29.9758065,24.9444444 Z"
          id="o"
        />
      </G>
    </Svg>
  );
}

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.displayName = "Icons.Euros";
