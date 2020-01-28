import styled from 'styled-components';

import { MARGIN_LEFT } from 'components/bus-scheduling-widget/style';

export const Wrapper = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #dedede;
  display: flex;
  align-items: center;
  height: 1.5rem;

  cursor: ${(props) => props.clickable && 'pointer'};
`;

export const Header = styled.div`
  width: ${MARGIN_LEFT}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Body = styled.div`
  height: 1.5rem;
  position: relative;
  border-left: 1px solid #dedede;
`;

export const BusName = styled.div`
  font-weight: bold;
  padding-left: 2rem;
`;

export const BusTimeFrame = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  color: #6d6d6d;
  padding-right: 2rem;
`;
