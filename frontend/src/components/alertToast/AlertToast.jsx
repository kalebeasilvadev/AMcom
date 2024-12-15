import React, {useContext} from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import {GlobalContext} from "../../store/global";

export default function AlertToast() {
    const {global, setAlertToast} = useContext(GlobalContext)

    function onclose() {
        setAlertToast({
            show: false,
            title: "Venda Gerencial",
            msg: "",
        })
    }

    return (
        <ToastContainer className="p-3" position="top-end">
            <Toast onClose={onclose} show={global.alertToast?.show}>
                <Toast.Header>
                    <strong className="me-auto">{global.alertToast?.title}</strong>
                </Toast.Header>
                <Toast.Body>{global.alertToast?.msg}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}
