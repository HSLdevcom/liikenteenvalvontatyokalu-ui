import {extendObservable, action, observable, reaction} from "mobx";
import {getUrlValue} from "./UrlManager";
import getJourneyId from "../helpers/getJourneyId";
import {createRouteId} from "../helpers/keys";
import uiActions from "./uiActions";

export const LANGUAGES = {
  FINNISH: "fi",
  ENGLISH: "en",
  SWEDISH: "se",
};

export const languageState = observable({
  language: getUrlValue("language", "fi"),
});

export const areaEventsStyles = {
  MARKERS: "markers",
  POLYLINES: "polylines",
};

export default (state) => {
  const sideBarUrlState = getUrlValue("sidePanelVisible", true);
  const journeyDetailsUrlState = getUrlValue("journeyDetailsOpen", true);

  extendObservable(state, {
    sidePanelVisible: !sideBarUrlState || sideBarUrlState === "false" ? false : true,
    journeyDetailsOpen:
      !journeyDetailsUrlState || journeyDetailsUrlState === "false" ? false : true,
    mapOverlays: getUrlValue("mapOverlays", "").split(","),
    areaEventsStyle: getUrlValue("areaEventsStyle", areaEventsStyles.MARKERS),
    language: languageState.language,
    errors: [],
    shareModalOpen: false,
    pollingEnabled: getUrlValue("pollingEnabled", false),
    // This is a computed check to see if we have anything to show in the journey details sidebar.
    // When this returns false the sidebar will hide regardless of the journeyDetailsOpen setting.
    get journeyDetailsCanOpen() {
      // Make sure the route of the selected journey matches the currently selected route.
      // Otherwise the journey details can open even though the user has not made a selection.
      return !!(
        createRouteId(state.route) === createRouteId(state.selectedJourney) &&
        getJourneyId(state.selectedJourney)
      );
    },
    get journeyDetailsAreOpen() {
      return state.journeyDetailsCanOpen && state.journeyDetailsOpen;
    },
  });

  const toggleShareModal = action((setTo = !state.shareModalOpen) => {
    state.shareModalOpen = setTo;
  });

  const actions = uiActions(state);

  // Sync external languageState with app state.
  reaction(
    () => languageState.language,
    (currentLanguage) => {
      state.language = currentLanguage;
    }
  );

  return {
    ...actions,
    toggleShareModal,
  };
};
