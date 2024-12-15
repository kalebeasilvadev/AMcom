import styled from "styled-components";

import Modal from "react-bootstrap/Modal";

const LookupModalDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9) !important;
`;

export const LookupDiv = styled.div`
  color: black;
  padding: 30px;
  border-radius: 30px;
  background-color: rgba(247, 247, 247, 0.9) !important;
`;
export const ModalBody = styled(Modal.Body)`
  max-height: 60vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  /* hide scrollbar for chrome, safari and opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default LookupModalDiv;
