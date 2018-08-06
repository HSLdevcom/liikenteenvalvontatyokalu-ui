import React from "react";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import get from "lodash/get";
import RouteFieldsFragment from "./RouteFieldsFragment";
import {observer} from "mobx-react";

export const singleRouteQuery = gql`
  query singleRouteQuery($route: ID!) {
    route(nodeId: $route) {
      ...RouteFieldsFragment
    }
  }
  ${RouteFieldsFragment}
`;

export default observer(({children, route}) => (
  <Query query={singleRouteQuery} variables={{route}}>
    {({loading, error, data}) => {
      if (loading) return "Loading...";
      if (error) return "Error!";

      const route = get(data, "route", null);

      return children({
        loading,
        error,
        route,
      });
    }}
  </Query>
));
