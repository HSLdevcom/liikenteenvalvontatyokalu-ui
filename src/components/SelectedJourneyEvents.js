import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {app} from "mobx-app";
import {createHfpItem} from "../helpers/createHfpItem";
import SelectedJourneyQuery from "../queries/SelectedJourneyQuery";
import getJourneyId from "../helpers/getJourneyId";
import get from "lodash/get";
import withRoute from "../hoc/withRoute";
import EnsureJourneySelection from "../helpers/EnsureJourneySelection";

@withRoute
@inject(app("state"))
@observer
class SelectedJourneyEvents extends Component {
  renderChildren = (children, events = [], loading = false, error = null) => (
    <EnsureJourneySelection events={events} eventsLoading={loading} error={error}>
      {children}
    </EnsureJourneySelection>
  );

  render() {
    const {children, state} = this.props;
    const {selectedJourney, route} = state;

    // Hide fetched selected journey HFP if the route is not selected
    const selectedJourneyValid =
      !!selectedJourney &&
      get(route, "routeId", "") === selectedJourney.route_id &&
      parseInt(get(route, "direction", 0), 10) ===
        parseInt(selectedJourney.direction_id, 10);

    return (
      <SelectedJourneyQuery
        skip={!selectedJourneyValid}
        selectedJourney={selectedJourney}>
        {({positions = [], loading, error}) => {
          if ((!positions || positions.length === 0) && !loading) {
            return this.renderChildren(children);
          }

          if (!positions || positions.length === 0 || loading) {
            return this.renderChildren(children, [], loading, error);
          }

          const events = positions
            // TODO: Fix when we have to deal with null coordinates
            .filter((pos) => !!pos.lat && !!pos.long)
            .map(createHfpItem);

          const journeyId = getJourneyId(events[0]);

          return this.renderChildren(
            children,
            [{journeyId, events}],
            loading,
            error
          );
        }}
      </SelectedJourneyQuery>
    );
  }
}

export default SelectedJourneyEvents;
