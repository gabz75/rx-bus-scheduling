import React from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper,
  Header,
  BusName,
  BusTimeFrame,
  Body,
} from './style';

import { getTimeFrameLabel } from './helpers';

function BusRow({
  children,
  bus,
  clickable,
  onClick,
}) {
  const busName = (bus && `Bus ${bus.id}`) || 'New bus';
  const timeFrame = getTimeFrameLabel(bus);
  // handlers
  const handleOnClick = () => onClick(bus);

  return (
    <Wrapper data-testid="bus-row" clickable={clickable} onClick={handleOnClick}>
      <Header>
        <BusName>{busName}</BusName>
        <BusTimeFrame>{timeFrame}</BusTimeFrame>
      </Header>
      <Body>
        {children}
      </Body>
    </Wrapper>
  );
}

BusRow.propTypes = {
  bus: PropTypes.shape({
    id: PropTypes.number,
    trips: PropTypes.array,
  }),
  children: PropTypes.node,
  onClick: PropTypes.func,
  clickable: PropTypes.bool,
};

BusRow.defaultProps = {
  bus: undefined,
  children: undefined,
  clickable: undefined,
  onClick: () => {},
};

export default BusRow;
