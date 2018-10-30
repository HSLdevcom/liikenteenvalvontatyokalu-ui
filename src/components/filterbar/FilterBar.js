import React, {Component} from "react";
import StopInput from "./StopInput";
import AllStopsQuery from "../../queries/AllStopsQuery";
import StopsByRouteQuery from "../../queries/StopsByRouteQuery";
import DateSettings from "./DateSettings";
import TimeSettings from "./TimeSettings";
import {observer, inject} from "mobx-react";
import {app} from "mobx-app";
import VehicleInput from "./VehicleInput";
import styled from "styled-components";
import TimeSlider from "./TimeSlider";
import SimulationSettings from "./SimulationSettings";
import LineSettings from "./LineSettings";
import Input from "../Input";
import {ControlGroup} from "../Forms";
import {text} from "../../helpers/text";
import FilterSection from "./FilterSection";
import Header from "./Header";

const SiteHeader = styled(Header)`
  flex: 0 0 25rem;
  z-index: 1;
`;

const FilterBarWrapper = styled.div`
  width: 100%;
  background: var(--lightest-grey);
  color: var(--dark-grey);
  border-bottom: 1px solid var(--alt-grey);
  position: relative;
  overflow: visible;
  grid-row: 1;
  grid-column: 1 / span 2;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const FilterBarGrid = styled.div`
  display: grid;
  grid-template-columns: 23rem 1fr 1fr 1fr;
  height: 100%;
  align-items: stretch;
`;

const BottomSlider = styled(TimeSlider)`
  position: absolute;
  bottom: calc(-1rem - 4px);
  right: 0;
  width: calc((100% - 25rem) + 2px);
  z-index: 10;
`;

@inject(app("Filters", "UI"))
@observer
class FilterBar extends Component {
  onChangeQueryVehicle = (value) => {
    this.props.Filters.setVehicle(value);
  };

  render() {
    const {state, Filters, positions} = this.props;
    const {vehicle, stop, route, filterPanelVisible: visible} = state;

    return (
      <FilterBarWrapper visible={visible}>
        <SiteHeader />
        <FilterBarGrid>
          <FilterSection expandable={<SimulationSettings />}>
            <DateSettings />
            <TimeSettings positions={positions} />
          </FilterSection>
          <FilterSection>
            <LineSettings />
          </FilterSection>
          <FilterSection>
            <ControlGroup>
              <Input
                label={text("filterpanel.filter_by_vehicle")}
                animatedLabel={false}>
                <VehicleInput
                  positions={positions}
                  value={vehicle}
                  onSelect={this.onChangeQueryVehicle}
                />
              </Input>
            </ControlGroup>
          </FilterSection>
          <FilterSection>
            <ControlGroup>
              <Input
                label={text("filterpanel.filter_by_stop")}
                animatedLabel={false}>
                {!route.routeId ? (
                  <AllStopsQuery key="all_stops">
                    {({stops}) => (
                      <StopInput
                        onSelect={Filters.setStop}
                        stop={stop}
                        stops={stops}
                      />
                    )}
                  </AllStopsQuery>
                ) : (
                  <StopsByRouteQuery
                    key={`stop_input_by_route_${route.routeId}`}
                    route={route}>
                    {({stops}) => (
                      <StopInput
                        onSelect={Filters.setStop}
                        stop={stop}
                        stops={stops}
                      />
                    )}
                  </StopsByRouteQuery>
                )}
              </Input>
            </ControlGroup>
          </FilterSection>
        </FilterBarGrid>
        <BottomSlider positions={positions} />
      </FilterBarWrapper>
    );
  }
}

export default FilterBar;