import React, {useMemo, useRef, useEffect} from "react";
import {observer} from "mobx-react-lite";
import StopMarker from "./StopMarker";
import {latLng} from "leaflet";
import CompoundStopMarker from "./CompoundStopMarker";
import flow from "lodash/flow";
import {inject} from "../../helpers/inject";
import {useQueryData} from "../../hooks/useQueryData";
import gql from "graphql-tag";
import {StopFieldsFragment} from "../../queries/StopFieldsFragment";
import {useCenterOnPopup} from "../../hooks/useCenterOnPopup";

const decorate = flow(observer, inject("Filters", "UI"));

const StopLayerContent = decorate(({stops, showRadius, state, Filters}) => {
  const {stop: selectedStopId, highlightedStop} = state;

  const prevStopAreas = useRef([]);

  const stopAreas = useMemo(() => {
    if (stops.length === 0) {
      return [];
    }

    const currentAreas = new Map();

    for (const stop of stops) {
      const pos = latLng(stop.lat, stop.lng);

      let groupBounds;

      if (currentAreas.size !== 0) {
        const groupEntries = currentAreas.entries();

        for (const [area] of groupEntries) {
          if (area.contains(pos)) {
            groupBounds = area;
            break;
          }
        }
      }

      if (!groupBounds) {
        groupBounds = pos.toBounds(3);
      }

      const stopGroup = currentAreas.get(groupBounds) || [];
      stopGroup.push(stop);
      currentAreas.set(groupBounds, stopGroup);
    }

    return Array.from(currentAreas.entries());
  }, [stops]);

  if (stopAreas.length !== 0) {
    prevStopAreas.current = stopAreas;
  }

  return (
    <>
      {prevStopAreas.current.map(([bounds, stopCluster]) => {
        const clusterIsSelected = stopCluster.some(
          ({stopId}) => stopId === selectedStopId
        );

        return (
          <React.Fragment
            key={`stop_cluster_${stopCluster
              .map((stop) => stop.stopId)
              .sort()
              .join("_")}`}>
            {stopCluster.length === 1 ? (
              <StopMarker
                selected={clusterIsSelected}
                showRadius={showRadius}
                stop={stopCluster[0]}
                selectedStop={selectedStopId}
                highlightedStop={highlightedStop}
                setRoute={Filters.setRoute}
                setStop={Filters.setStop}
              />
            ) : (
              <CompoundStopMarker
                selected={clusterIsSelected}
                bounds={bounds}
                showRadius={showRadius}
                stops={stopCluster}
                selectedStop={selectedStopId}
                highlightedStop={highlightedStop}
                setRoute={Filters.setRoute}
                setStop={Filters.setStop}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
});

export const singleStopQuery = gql`
  query singleStopQuery($stopId: String!, $date: Date!) {
    stop(date: $date, stopId: $stopId) {
      ...StopFieldsFragment
    }
  }
  ${StopFieldsFragment}
`;

export const allStopsQuery = gql`
  query allStopsQuery($date: Date, $search: String) {
    stops(date: $date, filter: {search: $search}) {
      ...StopFieldsFragment
    }
  }
  ${StopFieldsFragment}
`;

let stopsVisibleBeforeRouteSelected = false;

const StopLayer = decorate(({showRadius, state, UI, Filters}) => {
  const {
    date,
    stop,
    route,
    mapView,
    mapBounds,
    mapOverlays,
    mapZoom,
    selectedJourney,
  } = state;

  const {data: selectedStop, loading: selectedStopLoading} = useQueryData(
    singleStopQuery,
    {
      skip: !stop || !!selectedJourney,
      variables: {
        stopId: stop,
        date,
      },
    },
    "single stop query"
  );

  const {data: stopsData} = useQueryData(
    allStopsQuery,
    {skip: !!selectedJourney, variables: {date}},
    "all stops query"
  );

  useCenterOnPopup([!!selectedStop, !selectedStopLoading, !selectedJourney]);

  const stops = stopsData || [];
  const stopsHidden = mapZoom < 14 || !mapOverlays.includes("Stops");

  useEffect(() => {
    if (!!route.routeId) {
      if (!stopsHidden) {
        stopsVisibleBeforeRouteSelected = true;
        UI.changeOverlay("remove")({name: "Stops"});
      } else {
        stopsVisibleBeforeRouteSelected = false;
      }
    }

    if (!route.routeId && stopsVisibleBeforeRouteSelected) {
      UI.changeOverlay("add")({name: "Stops"});
    }
  }, [route.routeId]);

  const stopsInArea = useMemo(() => {
    if (selectedJourney || mapZoom < 14 || !mapBounds) {
      return [];
    }

    return stops.filter(
      ({stopId, lat, lng}) => stopId === stop || mapBounds.contains([lat, lng])
    );
  }, [stop, stops, mapView, mapBounds, mapZoom, selectedJourney]);

  if (selectedJourney || (stopsHidden && !selectedStop)) {
    return null;
  }

  if (stopsHidden && selectedStop) {
    return (
      <StopMarker
        selected={true}
        showRadius={showRadius}
        stop={selectedStop}
        setStop={Filters.setStop}
        date={date}
      />
    );
  }

  return (
    <StopLayerContent
      key="stop layer content"
      stops={stopsInArea}
      showRadius={showRadius}
    />
  );
});

export default StopLayer;
