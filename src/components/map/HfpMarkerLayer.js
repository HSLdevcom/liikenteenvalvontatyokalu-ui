import React, {Component} from "react";
import PropTypes from "prop-types";
import {Tooltip} from "react-leaflet";
import get from "lodash/get";
import {observer, inject} from "mobx-react";
import {app} from "mobx-app";
import {Text} from "../../helpers/text";
import "./Map.css";
import {getModeColor} from "../../helpers/vehicleColor";
import VehicleMarker from "./VehicleMarker";
import DivIcon from "../../helpers/DivIcon";
import HfpTooltip from "./HfpTooltip";

@inject(app("state"))
@observer
class HfpMarkerLayer extends Component {
  static propTypes = {
    onMarkerClick: PropTypes.func.isRequired,
  };

  componentDidMount() {}

  onMarkerClick = (positionWhenClicked) => () => {
    const {onMarkerClick} = this.props;

    if (typeof onMarkerClick === "function") {
      onMarkerClick(positionWhenClicked);
    }
  };

  render() {
    const {currentPosition: position} = this.props;

    if (!position) {
      return null;
    }

    const modeColor = getModeColor(get(position, "mode", "").toUpperCase());

    return (
      <DivIcon
        onClick={this.onMarkerClick(position)}
        position={[position.lat, position.long]}
        iconSize={[35, 35]}
        icon={<VehicleMarker position={position} color={modeColor} />}
        pane="hfp-markers">
        <HfpTooltip position={position} permanent={true} />
      </DivIcon>
    );
  }
}

export default HfpMarkerLayer;
