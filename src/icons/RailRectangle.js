import React from "react";
import {Svg, G, Path, Rect} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize} from "../helpers/svg";
import {Colors} from "./HSL_COLORS";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 0 35 35"
      version="1.1"
      preserveAspectRatio="xMidYMid meet">
      <G>
        <Rect fill={fill.inner} x="3" y="3" width="30" height="30" />
        <Path
          fill={fill.outer}
          d="M0.00109375,4.3334375 C0.00109375,1.9709375 1.96984375,0.0021875 4.33234375,0.0021875 L30.5801563,0.0021875 C33.0301563,0.0021875 34.9989063,1.9709375 34.9989063,4.3334375 L34.9989063,30.58125 C34.9989063,33.03125 33.0301563,35 30.5801563,35 L4.33234375,35 C1.96984375,35 0.00109375,33.03125 0.00109375,30.58125 L0.00109375,4.3334375 Z M26.8614063,4.4646875 C25.8989063,3.5896875 21.7426563,2.5834375 17.5,2.5834375 C13.3875,2.5834375 9.14484375,3.5896875 8.22609375,4.4646875 C7.56984375,5.0334375 6.91359375,6.3459375 6.12609375,8.0084375 C5.46984375,9.4521875 4.94484375,10.8084375 4.94484375,11.5959375 L4.94484375,24.2385938 C4.94484375,25.2448438 5.29484375,25.6823438 6.65109375,26.7323438 C7.65734375,27.5198438 8.09484375,27.8698438 9.62609375,27.8698438 L12.5135938,27.8698438 L12.5135938,29.7510938 L22.61875,29.7510938 L22.61875,27.8698438 L25.4625,27.8698438 C26.99375,27.8698438 27.43125,27.5198438 28.39375,26.7323438 C29.75,25.6385938 30.05625,25.2448438 30.05625,24.2385938 L30.05625,11.5959375 C30.05625,10.8084375 29.53125,9.4521875 28.91875,8.0084375 C28.13125,6.3459375 27.51875,5.0334375 26.8625,4.4646875 L26.8614063,4.4646875 Z M25.6801562,31.0625 L25.6801562,29.225 L24.0614062,29.225 L24.0614062,31.0625 L11.025,31.0625 L11.025,29.225 L9.3625,29.225 L9.3625,31.0625 L7.35,31.0625 C6.86875,31.0625 6.475,31.45625 6.475,31.89375 C6.475,32.375 6.86875,32.76875 7.35,32.76875 L27.7353125,32.76875 C28.2165625,32.76875 28.5665625,32.375 28.5665625,31.89375 C28.5665625,31.45625 28.2165625,31.0625 27.7353125,31.0625 L25.6790625,31.0625 L25.6801562,31.0625 Z M24.7614062,19.9073438 C24.6301562,20.6510938 23.8864062,21.2198437 23.1426562,21.2198437 L11.94375,21.2198437 C11.2,21.2198437 10.45625,20.6510938 10.325,19.9073438 L8.26875,11.2021875 C8.1375,10.4584375 8.61875,9.8896875 9.3625,9.8896875 L25.6801562,9.8896875 C26.4239062,9.8896875 26.9489062,10.4584375 26.7739062,11.2021875 L24.7614062,19.9073438 Z M24.1489062,5.9959375 L24.1489062,6.7396875 C24.1489062,7.3084375 23.7114063,7.7896875 23.1426562,7.7896875 L11.94375,7.7896875 C11.375,7.7896875 10.89375,7.3084375 10.89375,6.7396875 L10.89375,5.9959375 L24.1489062,5.9959375 Z M10.89375,24.4573438 C10.89375,23.8448438 11.33125,23.3635938 11.94375,23.3635938 C12.55625,23.3635938 13.08125,23.8448438 13.08125,24.4573438 C13.08125,25.0698438 12.55625,25.5073438 11.94375,25.5073438 C11.33125,25.5073438 10.89375,25.0698438 10.89375,24.4573438 Z M22.0489062,24.3260938 C22.0489062,23.7135938 22.5301563,23.2323438 23.1426562,23.2323438 C23.7551562,23.2323438 24.2364062,23.7135938 24.2364062,24.3260938 C24.2364062,24.9385937 23.7551562,25.3760938 23.1426562,25.3760938 C22.5301563,25.3760938 22.0489062,24.9385938 22.0489062,24.3260938 Z"
          id="Rail-1"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
}

Icon.propTypes = {
  fill: PropTypes.shape({
    inner: PropTypes.string,
    outer: PropTypes.string,
  }),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.defaultProps = {
  fill: {
    inner: Colors.primary.hslWhite,
    outer: Colors.transport.rail,
  },
};

Icon.displayName = "Icons.RailRectangle";
