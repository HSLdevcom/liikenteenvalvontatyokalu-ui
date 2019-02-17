import {Heading} from "../../Typography";
import {TransportIcon} from "../../transportModes";
import React from "react";
import styled from "styled-components";
import Calendar from "../../../icons/Calendar";
import JourneyPlanner from "../../../icons/JourneyPlanner";
import Time2 from "../../../icons/Time2";
import get from "lodash/get";

const JourneyPanelHeader = styled.div`
  flex: none;
  padding: 1rem;
  border-bottom: 1px solid var(--lighter-grey);
  width: 100%;

  > * {
    display: flex;
    align-items: flex-end;
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  svg {
    margin-left: -0.2rem;
    margin-right: 0.5rem;
  }
`;

const LineNameHeading = styled(Heading).attrs({level: 4})`
  font-weight: normal;
`;

const MainHeaderRow = styled(Heading).attrs({level: 3})`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1.3rem;
`;

const HeaderText = styled.span`
  font-weight: normal;
  margin-left: 1.25rem;
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  padding-bottom: 0.2rem;
  overflow: visible;

  &:first-child {
    margin-left: 0;
  }

  svg {
    margin-left: 0;
  }
`;

const DateTimeHeading = styled.div``;

export default ({mode, routeId, date, name, journey}) => {
  return (
    <JourneyPanelHeader>
      <MainHeaderRow>
        <TransportIcon width={23} height={23} mode={mode} />
        {get(journey, "desi", "")}
        <HeaderText>
          <JourneyPlanner fill="var(--blue)" width="1rem" height="1rem" />
          {routeId}
        </HeaderText>
        <HeaderText>
          <TransportIcon mode={mode} width={17} height={17} />
          {get(journey, "unique_vehicle_id", "")}
        </HeaderText>
      </MainHeaderRow>
      <DateTimeHeading>
        <HeaderText>
          <Calendar fill="var(--blue)" width="1rem" height="1rem" />
          {date}
        </HeaderText>
        <HeaderText>
          <Time2 fill="var(--blue)" width="1rem" height="1rem" />
          {get(journey, "journey_start_time", "")}
        </HeaderText>
      </DateTimeHeading>
      <LineNameHeading>{name}</LineNameHeading>
    </JourneyPanelHeader>
  );
};