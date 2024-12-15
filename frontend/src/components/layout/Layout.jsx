import React, {useContext} from "react";
import {GlobalContext} from "../../store/global";
import CorpoProvider from "../../store/corpo";
import Menu from "../menu/Menu";
import LayoutColumn, {Space} from "./style";
import Corpo from "../corpo/Corpo";
import ModalLogin from "../modalLogin/ModalLogin";
import AlertToast from "../alertToast/AlertToast";
import ModalGeneric from '../modalGeneric/ModalGeneric';

export default function Layout() {
    const {http} = useContext(GlobalContext);

    return (
        <CorpoProvider>
            <LayoutColumn>
                <Menu/>
                <Space/>
                <Corpo/>
                <ModalLogin/>
                <AlertToast/>
                <ModalGeneric/>
            </LayoutColumn>
        </CorpoProvider>
    );
}
