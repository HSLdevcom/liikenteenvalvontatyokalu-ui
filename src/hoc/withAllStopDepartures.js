import {inject, observer} from "mobx-react";
import {app} from "mobx-app";
import React from "react";
import DeparturesQuery from "../queries/DeparturesQuery";

export default (Component) => {
  @inject(app("state"))
  @observer
  class WithAllStopDeparturesComponent extends React.Component {
    render() {
      const {
        stop,
        state: {date},
      } = this.props;

      return (
        <DeparturesQuery stop={stop} date={date}>
          {({departures = [], loading}) => (
            <Component {...this.props} departures={departures} loading={loading} />
          )}
        </DeparturesQuery>
      );
    }
  }

  return WithAllStopDeparturesComponent;
};
