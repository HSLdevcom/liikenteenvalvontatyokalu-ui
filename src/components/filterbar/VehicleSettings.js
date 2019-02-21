import React from "react";
import {text, Text} from "../../helpers/text";
import {ControlGroup, Button} from "../Forms";
import {inject, observer} from "mobx-react";
import {app} from "mobx-app";
import VehicleInput from "./VehicleInput";
import Input from "../Input";
import sortBy from "lodash/sortBy";
import groupBy from "lodash/groupBy";
import map from "lodash/map";
import VehicleOptionsQuery from "../../queries/VehicleOptionsQuery";
import {getOperatorName} from "../../helpers/getOperatorNameById";
import Loading from "../Loading";
import styled from "styled-components";
import Tooltip from "../Tooltip";

const LoadingSpinner = styled(Loading)`
  margin: 0.5rem 0.5rem 0.5rem 1rem;
`;

@inject(app("Filters"))
@observer
class VehicleSettings extends React.Component {
  onChangeQueryVehicle = (value) => {
    this.props.Filters.setVehicle(value);
  };

  renderInput(children, value, isDisabled = false) {
    return (
      <ControlGroup>
        <Input
          helpText="Select vehicle disabled"
          label={text("filterpanel.filter_by_vehicle")}
          animatedLabel={false}
          value={value}
          disabled={isDisabled}>
          {children}
        </Input>
      </ControlGroup>
    );
  }

  render() {
    const {state} = this.props;
    const {vehicle = "", date, selectedJourney} = state;

    const isDisabled = !!selectedJourney;

    if (isDisabled) {
      return this.renderInput(undefined, vehicle, true);
    }

    return (
      <>
        <VehicleOptionsQuery date={date}>
          {({vehicles, loading}) => {
            if (loading) {
              return this.renderInput(
                <LoadingSpinner inline={true} />,
                vehicle,
                false
              );
            }

            const groupedVehicles = sortBy(
              map(
                groupBy(vehicles, ({operatorId}) => parseInt(operatorId, 10) + ""),
                (vehicles, operatorId) => {
                  return {
                    operatorName: getOperatorName(operatorId),
                    operatorId: operatorId,
                    vehicles: sortBy(vehicles, "vehicleId"),
                  };
                }
              ),
              "operatorId"
            );

            return this.renderInput(
              <VehicleInput
                options={groupedVehicles}
                value={vehicle}
                onSelect={this.onChangeQueryVehicle}
              />,
              vehicle
            );
          }}
        </VehicleOptionsQuery>
        {!!vehicle && (
          <Tooltip helpText="Clear vehicle">
            <Button
              primary={false}
              small={true}
              onClick={() => this.onChangeQueryVehicle("")}>
              <Text>filterpanel.clear.vehicle</Text>
            </Button>
          </Tooltip>
        )}
      </>
    );
  }
}

export default VehicleSettings;
