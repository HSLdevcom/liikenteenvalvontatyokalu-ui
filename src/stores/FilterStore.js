import {extendObservable, action} from "mobx";
import filterActions from "./filterActions";
import {inflate} from "../helpers/inflate";
import pick from "lodash/pick";
import merge from "lodash/merge";
import omit from "lodash/omit";
import {resetUrlState} from "./UrlManager";
import moment from "moment-timezone";
import {TIMEZONE} from "../constants";

const resetListeners = [];

export function setResetListener(cb) {
  resetListeners.push(cb);

  return () => {
    const cbIndex = resetListeners.indexOf(cb);

    if (cbIndex !== -1) {
      resetListeners.splice(cbIndex, 1);
    }
  };
}

export default (state, initialState = {}) => {
  const emptyState = {
    date: moment.tz(new Date(), TIMEZONE).format("YYYY-MM-DD"),
    stop: "",
    vehicle: "",
    line: {
      lineId: "1006T",
      dateBegin: "",
      dateEnd: "",
    },
    route: {
      routeId: "",
      direction: "",
      dateBegin: "",
      dateEnd: "",
      originstopId: "",
    },
  };

  extendObservable(
    state,
    merge({}, emptyState, pick(inflate(initialState), ...Object.keys(emptyState)))
  );

  const actions = filterActions(state);

  const reset = action(() => {
    // Recurse through the passed object and assign each value to the respective state value.
    function resetStateWith(obj) {
      Object.entries(obj).forEach(([key, value]) => {
        state[key] = value;
      });
    }

    resetStateWith(omit(emptyState, "date"));

    resetListeners.forEach((cb) => {
      if (typeof cb === "function") {
        cb();
      }
    });

    resetUrlState(true);
  });

  return {
    ...actions,
    reset,
  };
};
