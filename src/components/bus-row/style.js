import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #dedede;
  position: relative;
  height: 1.5rem;

  cursor: ${(props) => props.clickable && 'pointer'};
`;
