import get from "lodash/get";
import moment from "moment-timezone";
import {TIMEZONE} from "../constants";

export const AlertLevel = {
  Info: "INFO",
  Warning: "WARNING",
  Severe: "SEVERE",
};

export const AlertDistribution = {
  Stop: "STOP",
  AllStops: "ALL_STOPS",
  Route: "ROUTE",
  AllRoutes: "ALL_ROUTES",
  Network: "NETWORK",
};

const timeProps = [
  "recordedAt",
  "events[0].recordedAt",
  "journey.events[0].recordedAt",
  "observedDepartureTime.departureDateTime",
  "plannedDepartureTime.departureDateTime",
  "observedArrivalTime.arrivalDateTime",
  "plannedArrivalTime.arrivalDateTime",
];

export const getAlertsInEffect = (
  objectWithAlerts = [],
  time,
  includeNetworkAlerts = false
) => {
  // The first priority is to get the time from the object with the alerts
  // according to the possible timeProps above. If that fails, use the `time` argument.
  const objectTimeProp = timeProps.find((tp) => get(objectWithAlerts, tp, false));
  let alertTime = get(objectWithAlerts, objectTimeProp, time);
  // If the time is a shorter string, that means that it is a day without the time part.
  // In that case we should show all alerts for the day.
  const timeIsDate = typeof alertTime === "string" && alertTime.length < 11;
  const currentMoment = moment.tz(alertTime, TIMEZONE);

  const alerts = get(
    objectWithAlerts,
    "alerts",
    objectWithAlerts && Array.isArray(objectWithAlerts) ? objectWithAlerts : []
  );

  return alerts.reduce((alerts, alert) => {
    if (
      !currentMoment.isBetween(
        alert.startDateTime,
        alert.endDateTime,
        timeIsDate ? "day" : "minute",
        "[]"
      )
    ) {
      return alerts;
    }

    // If we're given an array of alerts, we are only interested in matching them to
    // the time argument. Thus return them without further matching.
    if (Array.isArray(objectWithAlerts)) {
      alerts.push(alert);
      return alerts;
    }

    if (includeNetworkAlerts && alert.distribution === AlertDistribution.Network) {
      alerts.push(alert);
    } else if (
      (alert.distribution === AlertDistribution.Route &&
        objectWithAlerts.routeId === alert.affectedId) ||
      (alert.distribution === AlertDistribution.AllRoutes &&
        typeof objectWithAlerts.routeId !== "undefined")
    ) {
      alerts.push(alert);
    } else if (
      (alert.distribution === AlertDistribution.Stop &&
        objectWithAlerts.stopId === alert.affectedId) ||
      (alert.distribution === AlertDistribution.AllStops &&
        typeof objectWithAlerts.stopId !== "undefined")
    ) {
      alerts.push(alert);
    }

    return alerts;
  }, []);
};
