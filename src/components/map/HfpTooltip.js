import React, {useRef} from "react";
import {Tooltip} from "react-leaflet";
import moment from "moment-timezone";
import {observer} from "mobx-react-lite";
import {TIMEZONE} from "../../constants";
import BusStop from "../../icons/BusStop";
import styled from "styled-components";
import flow from "lodash/flow";
import get from "lodash/get";
import {inject} from "../../helpers/inject";
import Time2 from "../../icons/Time2";
import Bus from "../../icons/Bus";
import Envelope from "../../icons/Envelope";
import RealTime2 from "../../icons/RealTime2";
import BusLine from "../../icons/BusLine";
import Timetable from "../../icons/Timetable";
import ArrowRight from "../../icons/ArrowRight";
import {text} from "../../helpers/text";
import LocationMarker from "../../icons/LocationMarker";

const TooltipWrapper = styled.div``;

const TooltipDataRow = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: ${(p) => (p.small ? `0.875rem` : "0.95rem")};
  padding: 0.5rem 0.75rem 0.5rem 0.5rem;

  &:nth-child(odd) {
    background: var(--lightest-grey);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const decorate = flow(observer, inject("state"));

const HfpTooltip = decorate(
  ({
    journey = null,
    event = null,
    permanent = false,
    sticky = true,
    direction = "left",
    offset = [-25, 0],
    state,
  }) => {
    const prevEvent = useRef(null);
    let usingEvent = event || prevEvent.current;
    const {user = null} = state;

    if (!usingEvent) {
      return null;
    }

    if (event) {
      prevEvent.current = event;
    }

    return (
      <Tooltip
        className="tooltip-unpadded"
        sticky={sticky}
        permanent={permanent}
        offset={offset}
        direction={direction}>
        <TooltipWrapper data-testid="hfp-tooltip-content">
          <TooltipDataRow>
            <BusLine fill="var(--blue)" width="1rem" height="1rem" />
            <strong>
              {journey.journeyType !== "journey" ? (
                <>
                  {journey.journeyType}: {journey.uniqueVehicleId}
                </>
              ) : (
                <>
                  {journey.routeId} / {journey.direction}
                </>
              )}
            </strong>
          </TooltipDataRow>
          {!!journey.departureTime && (
            <TooltipDataRow>
              <Timetable fill="var(--blue)" width="1rem" height="1rem" />
              {journey.departureTime}
            </TooltipDataRow>
          )}
          <TooltipDataRow data-testid="hfp-event-time">
            <RealTime2 fill="var(--blue)" width="1rem" height="1rem" />
            {moment.tz(usingEvent.recordedAt, TIMEZONE).format("YYYY-MM-DD, HH:mm:ss")}
          </TooltipDataRow>
          <TooltipDataRow>
            <Envelope fill="var(--blue)" width="1rem" height="1rem" />
            {moment.tz(usingEvent.receivedAt, TIMEZONE).format("YYYY-MM-DD, HH:mm:ss")}
          </TooltipDataRow>
          {user && (
            <TooltipDataRow>
              <Bus fill="var(--blue)" width="1rem" height="1rem" />
              {journey.uniqueVehicleId}
            </TooltipDataRow>
          )}
          {!!usingEvent.stop && (
            <TooltipDataRow>
              <BusStop fill="var(--blue)" width="1rem" height="1rem" /> {usingEvent.stop}
            </TooltipDataRow>
          )}
          <TooltipDataRow>
            <ArrowRight fill="var(--blue)" width="1rem" height="1rem" />{" "}
            {Math.round((usingEvent.velocity * 18) / 5)} km/h
          </TooltipDataRow>
          {!!usingEvent.delay && (
            <TooltipDataRow>
              <Time2 fill="var(--blue)" width="1rem" height="1rem" /> {usingEvent.delay}{" "}
              sek.
            </TooltipDataRow>
          )}
          <TooltipDataRow>
            <LocationMarker fill="var(--blue)" width="1rem" height="1rem" />{" "}
            {get(usingEvent, "loc", text("general.unknown"))}
          </TooltipDataRow>
        </TooltipWrapper>
      </Tooltip>
    );
  }
);

export default HfpTooltip;
