import styled from 'styled-components';

export const MARGIN_LEFT = 220;

export const Wrapper = styled.div`
`;

export const Header = styled.div`
  position: relative;
  border-bottom: 1px solid #dedede;
  height: 1rem;
  padding: 0.5rem 0;

  & > span {
    position: absolute;
    padding-left: ${MARGIN_LEFT}px;
    font-size: 11px;
  }
`;

export const Body = styled.div`
  & > :nth-child(2n+1) {
    background-color: #f8f8f8;
  }
`;
