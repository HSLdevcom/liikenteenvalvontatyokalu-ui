import React, {Component} from "react";
import DateSettings from "./DateSettings";
import TimeSettings from "./TimeSettings";
import {observer, inject} from "mobx-react";
import styled from "styled-components";
import TimeSlider, {TIME_SLIDER_MIN, TIME_SLIDER_MAX} from "./TimeSlider";
import AdditionalTimeSettings from "./AdditionalTimeSettings";
import LineSettings from "./LineSettings";
import FilterSection from "./FilterSection";
import Header from "./Header";
import {
  getTimeRangeFromPositions,
  dateToSeconds,
} from "../../helpers/getTimeRangeFromPositions";
import getJourneyId from "../../helpers/getJourneyId";
import get from "lodash/get";
import VehicleSettings from "./VehicleSettings";
import StopSettings from "./StopSettings";
import {app} from "mobx-app";

const SiteHeader = styled(Header)`
  flex: 0 0 auto;
  z-index: 1;
  width: 25rem;
  height: 100%;
`;

const FilterBarWrapper = styled.div`
  background: var(--lightest-grey);
  color: var(--dark-grey);
  border-bottom: 1px solid var(--alt-grey);
  overflow: visible;
  height: 100%;
  display: flex;
  flex: 1 1 calc(100% - 25rem);
  flex-direction: row;
  position: relative;
`;

const FilterBarGrid = styled.div`
  display: grid;
  grid-template-columns: 23rem 1fr 1fr 1fr;
  height: 100%;
  align-items: stretch;
`;

const BottomSlider = styled(TimeSlider)`
  position: absolute;
  bottom: -1rem;
  right: 0;
  width: calc((100% - 25rem) + 2px);
  z-index: 10;
`;

@inject(app("state"))
@observer
class FilterBar extends Component {
  render() {
    const {state, positions = [], timeRange = null} = this.props;
    const {sidePanelVisible: visible} = state;

    return (
      <FilterBarWrapper visible={visible}>
        <SiteHeader />
        <FilterBarGrid>
          <FilterSection expandable={<AdditionalTimeSettings />}>
            <DateSettings />
            <TimeSettings />
          </FilterSection>
          <FilterSection>
            <LineSettings />
          </FilterSection>
          <FilterSection>
            <VehicleSettings />
          </FilterSection>
          <FilterSection>
            <StopSettings />
          </FilterSection>
        </FilterBarGrid>
        <BottomSlider positions={positions} timeRange={timeRange} />
      </FilterBarWrapper>
    );
  }
}

export default FilterBar;
