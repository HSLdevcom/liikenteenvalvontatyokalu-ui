import React from "react";
import {hfpClient} from "../api";
import get from "lodash/get";
import gql from "graphql-tag";
import HfpFieldsFragment from "./HfpFieldsFragment";

export const hfpQuery = gql`
  query hfpQuery(
    $route_id: String
    $direction: smallint
    $date: date
    $time_min: time
    $time_max: time
  ) {
    vehicles(
      order_by: received_at_asc
      where: {
        route_id: {_eq: $route_id}
        direction_id: {_eq: $direction}
        oday: {_eq: $date}
        journey_start_time: {_gte: $time_min, _lte: $time_max}
      }
    ) {
      ...HfpFieldsFragment
    }
  }
  ${HfpFieldsFragment}
`;

export const queryHfp = (route, date, timeRange) => {
  const {routeId, direction} = route;
  const min = get(timeRange, "min", timeRange);
  const max = get(timeRange, "max", timeRange);

  return hfpClient
    .query({
      fetchPolicy: "cache-first",
      query: hfpQuery,
      variables: {
        route_id: routeId,
        direction: parseInt(direction, 10),
        date,
        time_min: typeof min !== "string" ? min.format("HH:mm:ss") : min,
        time_max: typeof max !== "string" ? max.format("HH:mm:ss") : max,
      },
    })
    .then(({data}) => get(data, "vehicles", []));
};
