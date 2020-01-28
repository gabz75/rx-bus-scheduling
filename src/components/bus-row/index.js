import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

function BusRow({
  children,
  bus,
  clickable,
  onClick,
}) {
  // handlers
  const handleOnClick = () => onClick(bus);

  return (
    <Wrapper clickable={clickable} onClick={handleOnClick}>
      {children}
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
