import React from "react";
import {Svg, Path} from "react-primitives-svg";
import PropTypes from "prop-types";
import {svgSize} from "../helpers/svg";

export default function Icon({fill, height, width, ...rest}) {
  return (
    <Svg
      {...rest}
      {...svgSize(height, width)}
      viewBox="0 0 26 46"
      version="1.1"
      preserveAspectRatio="xMidYMid meet">
      <Path
        fill={fill}
        d="M5.228,0.006 C2.32750999,0.0530526962 0.00376635613,2.42314642 0.014,5.324 L0.014,39.484 C0.00376635613,42.3848536 2.32750999,44.7549473 5.228,44.802 L20.209,44.802 C21.606386,44.7917384 22.9419968,44.2246886 23.9199366,43.2264768 C24.8978763,42.228265 25.4374073,40.8813024 25.419,39.484 L25.419,5.326 C25.4374073,3.92869757 24.8978763,2.58173501 23.9199366,1.58352322 C22.9419968,0.58531142 21.606386,0.0182616004 20.209,0.008 L5.228,0.008 L5.228,0.006 Z M10.69,40.664 C10.2244093,40.6379126 9.85769035,40.2572399 9.849,39.791 C9.8916223,39.3534054 10.2506795,39.0144143 10.69,38.997 L14.748,38.997 C15.199034,38.9852232 15.5748478,39.3400342 15.589,39.791 C15.5988559,40.0198518 15.5144891,40.2427432 15.3555681,40.4077111 C15.1966472,40.572679 14.9770602,40.6653068 14.748,40.664 L10.69,40.664 L10.69,40.664 Z M3.29,35.698 L3.29,4.157 L22.15,4.157 L22.15,35.7 L3.289,35.7 L3.29,35.698 Z M20.3000002,20.2731818 C20.3000002,20.9136364 19.6868752,21.3709091 18.8614064,21.3709091 C18.8379689,21.3709091 18.2009377,21.3481818 17.7293752,20.9136364 L16.7623439,23.1777273 C17.3993752,23.2004545 17.8709377,23.635 17.8943752,23.6581818 C18.4840627,24.23 18.5548439,24.9618182 18.1067189,25.3963636 C17.6351564,25.8536364 16.8804689,25.7622727 16.2907814,25.2131818 C16.2673439,25.1904545 15.8192189,24.7559091 15.7953127,24.0927273 L13.4839064,25.0304545 C13.9320314,25.5109091 13.9320314,26.1281818 13.9320314,26.1509091 C13.9320314,26.9513636 13.4604689,27.5459091 12.8000002,27.5459091 C12.1395314,27.5459091 11.6679689,26.9513636 11.6679689,26.1509091 C11.6679689,26.1281818 11.6679689,25.5104545 12.1395314,25.0304545 L9.78078144,24.0927273 C9.78078144,24.7559091 9.33265644,25.1904545 9.30921894,25.2131818 C8.71953144,25.7622727 7.96484394,25.8536364 7.49328144,25.3963636 C7.02171894,24.9618182 7.11593769,24.23 7.70562519,23.6581818 C7.72906269,23.6354545 8.17718769,23.2009091 8.83765644,23.1777273 L7.87062519,20.9136364 C7.39906269,21.3481818 6.76203144,21.3709091 6.73859394,21.3709091 C5.88968769,21.3709091 5.30000019,20.9136364 5.30000019,20.2731818 C5.30000019,19.6327273 5.88968769,19.1754545 6.73859394,19.1754545 C6.76203144,19.1754545 7.39906269,19.1754545 7.87062519,19.61 L8.83765644,17.3686364 C8.17718769,17.3227273 7.72906269,16.9113636 7.70562519,16.8881818 C7.11593769,16.3163636 7.02171894,15.5845455 7.49328144,15.1272727 C7.96484394,14.67 8.71953144,14.7613636 9.30921894,15.3331818 C9.33265644,15.3559091 9.78078144,15.7904545 9.78078144,16.4309091 L12.1395314,15.4931818 C11.6679689,15.0359091 11.6679689,14.4181818 11.6679689,14.3954545 C11.6679689,13.5722727 12.1395314,13.0004545 12.8000002,13.0004545 C13.4604689,13.0004545 13.9320314,13.5722727 13.9320314,14.3954545 C13.9320314,14.4181818 13.9320314,15.0359091 13.4839064,15.4931818 L15.7953127,16.4309091 C15.8187502,15.7904545 16.2668752,15.3559091 16.2907814,15.3331818 C16.8804689,14.7613636 17.6351564,14.67 18.1067189,15.1272727 C18.5548439,15.5845455 18.4840627,16.3163636 17.8943752,16.8881818 C17.8709377,16.9109091 17.3989064,17.3227273 16.7623439,17.3686364 L17.7293752,19.61 C18.2009377,19.1754545 18.8379689,19.1754545 18.8614064,19.1754545 C19.6868752,19.1754545 20.3000002,19.6327273 20.3000002,20.2731818 Z M7.58750019,20.2731818 C7.30437519,19.8159091 6.76203144,19.7927273 6.73859394,19.7927273 C6.26703144,19.7927273 5.96046894,19.9986364 5.96046894,20.2731818 C5.96046894,20.5477273 6.26703144,20.7304545 6.73859394,20.7304545 C6.76203144,20.7304545 7.30484394,20.7077273 7.58750019,20.2731818 Z M8.17718769,16.4309091 C8.20062519,16.4536364 8.57796894,16.8195455 9.12078144,16.7054545 C9.23890644,16.1795455 8.86156269,15.8136364 8.83765644,15.7677273 C8.53109394,15.4704545 8.15375019,15.3790909 7.94140644,15.5845455 C7.75250019,15.7677273 7.84718769,16.1336364 8.17718769,16.4309091 L8.17718769,16.4309091 Z M9.12031269,23.8413636 C8.57796894,23.7040909 8.20062519,24.07 8.17671894,24.0927273 C7.84671894,24.4127273 7.75203144,24.7786364 7.94093769,24.9618182 C8.15328144,25.145 8.53062519,25.0763636 8.83718769,24.7559091 C8.86062519,24.7331818 9.26187519,24.3440909 9.12031269,23.8409091 L9.12031269,23.8413636 Z M15.9837502,23.3381818 L17.2807814,20.2736364 L15.9837502,17.1859091 L12.7995314,15.905 L9.61531269,17.1859091 L8.29437519,20.2736364 L9.61531269,23.3381818 L12.7995314,24.6190909 L15.9837502,23.3381818 Z M12.3279689,14.3954545 C12.3279689,14.4181818 12.3279689,14.9445455 12.7995314,15.2186364 C13.2476564,14.9440909 13.2710939,14.4181818 13.2710939,14.3954545 C13.2710939,13.9381818 13.0821877,13.6409091 12.7995314,13.6409091 C12.5168752,13.6409091 12.3279689,13.9381818 12.3279689,14.3954545 L12.3279689,14.3954545 Z M13.2715627,26.1509091 C13.2715627,26.1281818 13.2481252,25.5790909 12.8000002,25.3277273 C12.3284377,25.5790909 12.3284377,26.1281818 12.3284377,26.1509091 C12.3284377,26.5854545 12.5173439,26.9054545 12.8000002,26.9054545 C13.0826564,26.9054545 13.2715627,26.5854545 13.2715627,26.1509091 Z M16.4792189,16.7054545 C16.9981252,16.82 17.3989064,16.4540909 17.4223439,16.4309091 C17.7523439,16.1336364 17.8470314,15.7677273 17.6346877,15.5845455 C17.4457814,15.3786364 17.0684377,15.47 16.7384377,15.7677273 C16.7150002,15.8131818 16.3610939,16.1790909 16.4792189,16.7054545 Z M17.4223439,24.0927273 C17.3989064,24.07 16.9976564,23.7040909 16.4792189,23.8413636 C16.3610939,24.3445455 16.7150002,24.7331818 16.7384377,24.7563636 C17.0684377,25.0763636 17.4457814,25.145 17.6346877,24.9622727 C17.8470314,24.7795455 17.7528127,24.4136364 17.4223439,24.0931818 L17.4223439,24.0927273 Z M19.6395314,20.2731818 C19.6395314,19.9986364 19.3095314,19.7927273 18.8614064,19.7927273 C18.8379689,19.7927273 18.2951564,19.8154545 18.0125002,20.2731818 C18.2956252,20.7077273 18.8379689,20.7304545 18.8614064,20.7304545 C19.3095314,20.7304545 19.6395314,20.5477273 19.6395314,20.2731818 Z"
        id="phone-with-logo"
      />
    </Svg>
  );
}

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.displayName = "Icons.PhoneWithLogo";