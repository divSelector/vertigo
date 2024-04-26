import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ContainerNoSelect = styled(Container)`
    user-select: none;
`; 

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -2.0rem;
`;
