import React from "react";
import {darken} from "polished";
import DriveByTimes from "./DriveByTimes";
import {Popup, Marker, CircleMarker, Tooltip} from "react-leaflet";
import {icon} from "leaflet";
import TimingStopIcon from "../../icon-time1.svg";

const stopColor = "#3388ff";
const selectedStopColor = darken(0.2, stopColor);

export default ({
  stop,
  selected,
  firstTerminal,
  lastTerminal,
  hfp,
  showTime,
  time,
  onChangeShowTime,
  onTimeClick,
}) => {
  const timingStopIcon = icon({
    iconUrl: TimingStopIcon,
    iconSize: [30, 30],
    iconAnchor: [23, 25 / 2],
    popupAnchor: [3, -15],
  });

  return React.createElement(
    stop.timingStopType ? Marker : CircleMarker,
    {
      pane: "stops",
      icon: timingStopIcon,
      center: [stop.lat, stop.lon],
      position: [stop.lat, stop.lon],
      color: firstTerminal
        ? "green"
        : lastTerminal
          ? "red"
          : selected
            ? selectedStopColor
            : stopColor,
      fillColor: "white",
      fillOpacity: 1,
      strokeWeight: 3,
      radius: firstTerminal || lastTerminal ? 12 : 8,
    },
    <React.Fragment>
      <Tooltip>
        {stop.nameFi}, {stop.shortId.replace(/ /g, "")} ({stop.stopId})
      </Tooltip>
      <Popup>
        <h4>
          {stop.nameFi}, {stop.shortId.replace(/ /g, "")} ({stop.stopId})
        </h4>
        {hfp.length > 0 && (
          <React.Fragment>
            <div>
              <label>
                <input
                  type="radio"
                  value="arrive"
                  checked={showTime === "arrive"}
                  name="showTime"
                  onChange={onChangeShowTime}
                />{" "}
                Arrive
              </label>
              <label>
                <input
                  type="radio"
                  value="depart"
                  checked={showTime === "depart"}
                  name="showTime"
                  onChange={onChangeShowTime}
                />{" "}
                Depart
              </label>
            </div>
            <DriveByTimes
              showTime={showTime}
              onTimeClick={onTimeClick}
              queryTime={time}
              positions={hfp}
            />
          </React.Fragment>
        )}
      </Popup>
    </React.Fragment>
  );
};
