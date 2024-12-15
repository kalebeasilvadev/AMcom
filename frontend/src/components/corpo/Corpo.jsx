import React, {useContext} from "react";

import {CorpoContext} from "../../store/corpo";
import {GlobalContext} from "../../store/global";
import CorpoDiv, {CorpoConteudo, CorpoMenu} from "./style";
import SubMenu from "../menu/SubMenu.jsx";

export default function Corpo({sidebar, showSidebar}) {
    const {corpo} = useContext(CorpoContext);
    const {sideMenu} = useContext(GlobalContext).global;
    return (
        <CorpoDiv>
            <CorpoMenu sidebar={sideMenu}>
                <SubMenu/>
            </CorpoMenu>
            <CorpoConteudo sidebar={sideMenu}>{corpo.component}</CorpoConteudo>
        </CorpoDiv>
    );
}
