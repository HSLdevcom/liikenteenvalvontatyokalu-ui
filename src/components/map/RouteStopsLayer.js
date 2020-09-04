import React from "react";
import flow from "lodash/flow";
import RouteStop from "./RouteStop";
import {observer} from "mobx-react-lite";
import {inject} from "../../helpers/inject";
import {useQueryData} from "../../hooks/useQueryData";
import {stopsByRouteQuery} from "../../queries/StopsByRouteQuery";
import get from "lodash/get";
import {singleStopQuery} from "./StopLayer";

const decorate = flow(observer, inject("state"));

const RouteStopsLayer = decorate(
  ({state: {date, route, selectedJourney, stop: selectedStop}, showRadius}) => {
    let {data: routeStopsData} = useQueryData(stopsByRouteQuery, {
      skip: !route,
      variables: {
        routeId: get(route, "routeId"),
        direction: get(route, "direction"),
        date,
      },
    });

    const {data: selectedStopData, loading: selectedStopLoading} = useQueryData(
      singleStopQuery,
      {
        skip: !selectedStop || !!selectedJourney,
        variables: {
          stopId: selectedStop,
          date,
        },
      },
      "single stop query"
    );

    let routeStops = routeStopsData || [];

    return routeStops.map((stop, index, arr) => {
      const isFirst = index === 0;
      const isLast = index === arr.length - 1;

      let stopObj =
        !selectedJourney && selectedStopData && stop.stopId === selectedStop
          ? selectedStopData
          : stop;

      return (
        <RouteStop
          key={`stop_marker_${stop.stopId}_${stop.stopIndex}`}
          firstTerminal={isFirst}
          lastTerminal={isLast}
          selectedJourney={selectedJourney}
          firstStop={arr[0]}
          stopId={stop.stopId}
          stop={stopObj}
          date={date}
          showRadius={showRadius}
        />
      );
    });
  }
);

export default RouteStopsLayer;
