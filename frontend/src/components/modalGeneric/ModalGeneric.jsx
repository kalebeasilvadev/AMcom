import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LoginModal from "../login/LoginModal";
import { GlobalContext } from "../../store/global";

export default function ModalGeneric() {
  const { global, setModal, setLogout } = useContext(GlobalContext);
  const { modal } = global;

  const handleClose = () => setModal({ view: false });
  return (
    <Modal
      show={modal?.view}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="xl"
      backdrop="static"
    >
      <Modal.Body>
        {modal?.component ? (
          <modal.component closeModal={handleClose} idData={modal?.id} />
        ) : (
          ""
        )}
      </Modal.Body>
    </Modal>
  );
}
