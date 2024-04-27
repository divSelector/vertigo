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

export const PopupContainer = styled.div`
  position: fixed;
  top: ${({ top }) => top + 25}px;
  left: ${({ left, centeradjust }) => left - centeradjust}px;
  transform: translateX(-50%);
  z-index: 1000;
`;