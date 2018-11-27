import React, {Component} from "react";
import orderBy from "lodash/orderBy";
import flatMap from "lodash/flatMap";
import get from "lodash/get";
import {observer} from "mobx-react";
import styled from "styled-components";
import TimetableDeparture from "./TimetableDeparture";
import FirstDepartureQuery from "../../queries/FirstDepartureQuery";
import {getDayTypeFromDate} from "../../helpers/getDayTypeFromDate";

const TimetableGrid = styled.div`
  margin-bottom: 1rem;
`;

const TimetableSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const AVG_DEPARTURES_THRESHOLD = 7;

@observer
class StopTimetable extends Component {
  getFocusedDepartureTime = (departuresByHour, time) => {
    let scrollToHour = false;
    let scrollToMinute = false;

    const timeHour = time.split(":")[0];
    const timeMinute = parseInt(time.split(":")[1], 10);

    const selectedHourTimes = departuresByHour.find(
      ([hour]) => timeHour === hour.split(":")[0]
    );

    if (selectedHourTimes) {
      scrollToHour = parseInt(timeHour);

      const orderByMatchingTime = orderBy(selectedHourTimes[1], (departure) =>
        Math.abs(departure.minutes - timeMinute)
      );

      if (orderByMatchingTime.length !== 0) {
        scrollToMinute = get(orderByMatchingTime, "[0].minutes", false);
      }
    }

    return {hours: scrollToHour, minutes: scrollToMinute};
  };

  render() {
    const {
      routeFilter,
      timeRangeFilter,
      departuresByHour,
      departuresPerHour,
      groupedJourneys,
      date,
      selectedJourney,
      stop,
      onSelectAsJourney,
      focusRef,
      time,
      loading: allLoading,
    } = this.props;

    // Figure out which time the list should be scrolled to.
    const focusedDepartureTime = this.getFocusedDepartureTime(
      departuresByHour,
      time
    );

    let {min, max} = timeRangeFilter;

    const dayType = getDayTypeFromDate(date);
    let batchedFirstDepartureRequests = [];

    // Only fetch the observed times if there's not too many departures. If the average
    // number of departures per hour is over the threshold, wait for the user to filter by time.
    if (departuresPerHour <= AVG_DEPARTURES_THRESHOLD || (min && max)) {
      // Create batches for the firstDeparture query.
      batchedFirstDepartureRequests = flatMap(
        departuresByHour,
        // Map to whole departures. The query will pick what it needs.
        ([hour, departures]) => departures.map((dep) => dep)
      );
    }

    // If there is min/max hour filters set, make sure no unnecessary first departures are fetched.
    if (min || max || routeFilter) {
      batchedFirstDepartureRequests = batchedFirstDepartureRequests.filter(
        ({hours, routeId}) => {
          if ((min && hours < parseInt(min)) || (max && hours > parseInt(max))) {
            return false;
          }

          if (routeFilter) {
            // Clean up the routeId to be compatible with what
            // the user will enter into the filter field.
            const routeIdFilterTerm = routeId
              .substring(1)
              .replace(/^0+/, "")
              .toLowerCase();

            if (!routeIdFilterTerm.startsWith(routeFilter.toLowerCase())) {
              return false;
            }
          }

          return true;
        }
      );
    }

    return (
      <FirstDepartureQuery
        skip={batchedFirstDepartureRequests.length === 0}
        queries={batchedFirstDepartureRequests}
        dayType={dayType}>
        {({firstDepartures, loading}) => (
          <TimetableGrid>
            {!allLoading && departuresByHour.length === 0 && "No data"}

            {/* Loop through the hour-grouped departures */}
            {departuresByHour.map(([hour, times]) => {
              let timetableDepartures = times;

              if (min !== "" || max !== "") {
                const intHour = parseInt(hour.replace(":", ""), 10) / 100;
                if (intHour < parseInt(min) || intHour > parseInt(max)) {
                  return null;
                }
              }

              // Filter the list by the route filter
              if (routeFilter) {
                timetableDepartures = times.filter((departure) =>
                  get(departure, "routeId", "")
                    .substring(1)
                    .replace(/^0+/, "")
                    .toLowerCase()
                    .startsWith(routeFilter.toLowerCase())
                );
              }

              return (
                <TimetableSection key={`hour_${stop.stopId}_${hour}`}>
                  {timetableDepartures.map((departure) => {
                    let scrollToTime = false;

                    // Check if the list should be scrolled to the current element.
                    if (
                      focusedDepartureTime.hours === departure.hours &&
                      focusedDepartureTime.minutes === departure.minutes
                    ) {
                      scrollToTime = true;
                    }

                    const {departureId, dayType, routeId, direction} = departure;

                    let departureJourney = null;

                    // Find the scheduled time for the first stop in order
                    // to get the correct hfp item.
                    const firstDepartureTime = get(
                      firstDepartures,
                      `${departure.routeId}_${departure.direction}_${
                        departure.departureId
                      }`
                    );

                    // If we have the scheduled time from the first stop, we can
                    // find the correct hfp item.
                    if (firstDepartures && firstDepartureTime) {
                      departureJourney = get(
                        groupedJourneys,
                        `${firstDepartureTime}:${departure.routeId}:${
                          departure.direction
                        }`,
                        null
                      );
                    }

                    return (
                      <TimetableDeparture
                        key={`departure_${departureId}_${routeId}_${direction}_${
                          stop.stopId
                        }_${dayType}_${departure.hours}:${departure.minutes}`}
                        focusRef={scrollToTime ? focusRef : null}
                        routeFilter={routeFilter}
                        timeRangeFilter={timeRangeFilter}
                        selectedJourney={selectedJourney}
                        onClick={onSelectAsJourney}
                        stop={stop}
                        date={date}
                        journey={departureJourney}
                        departure={departure}
                        loading={allLoading || loading}
                      />
                    );
                  })}
                </TimetableSection>
              );
            })}
          </TimetableGrid>
        )}
      </FirstDepartureQuery>
    );
  }
}

export default StopTimetable;
