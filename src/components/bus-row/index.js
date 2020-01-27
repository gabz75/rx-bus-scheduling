import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

function BusRow({ children }) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

BusRow.propTypes = {
  children: PropTypes.node,
};

BusRow.defaultProps = {
  children: undefined,
};

export default BusRow;
