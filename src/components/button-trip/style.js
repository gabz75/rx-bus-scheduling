import styled from 'styled-components';

export const StyledButtonTrip = styled.button`
  position: absolute;
  border: 1px solid black;
  height: 1.5rem;
  cursor: pointer;

  background-color: ${(props) => props.selected && '#015baa'}
`;
