import {action} from "mobx";
import getJourneyId from "../helpers/getJourneyId";
import {pickJourneyProps} from "../helpers/pickJourneyProps";
import filterActions from "./filterActions";
import {setPathName} from "./UrlManager";

export function createJourneyPath(journey) {
  const dateStr = journey.oday.replace(/-/g, "");
  const timeStr = journey.journey_start_time.replace(/:/g, "");

  return `/journey/${dateStr}/${timeStr}/${journey.route_id}/${
    journey.direction_id
  }`;
}

export function createCompositeJourney(date, route, time) {
  if (!route || !route.routeId || !date || !time) {
    return false;
  }

  const journey = {
    oday: date,
    journey_start_time: time,
    route_id: route.routeId,
    direction_id: route.direction,
  };

  return journey;
}

export default (state) => {
  const filters = filterActions(state);

  // Sets the resolved state of a fetched journey.
  const setJourneyFetchState = action(
    "Set the status of a requested journey",
    (journeyId, resolveState) => {
      state.resolvedJourneyStates.set(journeyId, resolveState);
    }
  );

  const setSelectedJourney = action(
    "Set selected journey",
    (hfpItem = null, toggle = true) => {
      if (
        (!hfpItem && toggle) ||
        (state.selectedJourney &&
          getJourneyId(state.selectedJourney) === getJourneyId(hfpItem))
      ) {
        state.selectedJourney = null;
        filters.setVehicle(null);
        setPathName("/");
      } else if (hfpItem) {
        const journey = pickJourneyProps(hfpItem);
        state.selectedJourney = journey;

        if (hfpItem.unique_vehicle_id) {
          filters.setVehicle(hfpItem.unique_vehicle_id);
        }

        setPathName(createJourneyPath(hfpItem));
      }
    }
  );

  return {
    setSelectedJourney,
    setJourneyFetchState,
    createCompositeJourney,
  };
};
