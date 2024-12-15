import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LoginModal from "../login/LoginModal";
import { GlobalContext } from "../../store/global";

export default function ModalLogin() {
  const { global, saveGlobal, setLogout, setLogoutTela } =
    useContext(GlobalContext);
  const { loginTela } = global;

  const handleClose = () => setLogoutTela(false);

  return (
    <Modal
      show={loginTela}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="sm"
      backdrop="static"
    >
      <LoginModal noNavigate={true} closeModal={handleClose} />
    </Modal>
  );
}
