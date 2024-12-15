import React, {useContext} from "react";
import {DeslogarButton, MenuLogo, NavPers, Titulo} from "./style";
import {GlobalContext} from "../../store/global";
import {TiThMenu} from "react-icons/ti";
import Logo from "../../assets/logo.png";

const Menu = ({sidebar, showSidebar}) => {
    const {setLogout, setSideMenu} = useContext(GlobalContext);
    const {sideMenu, navTitle} = useContext(GlobalContext).global;
    const showMenu = () => {
        setSideMenu(!sideMenu);
    }
    return (
        <NavPers style={{backgroundColor: "#e4e4e4", color: "#00585E"}} expand="lg">
            <MenuLogo>
                <TiThMenu style={{cursor: "pointer", marginLeft: "10px"}} onClick={() => showMenu()}/>
                <img src={Logo} alt="Logo" style={{height: "50px", marginLeft: "10"}}/>
            </MenuLogo>
            <Titulo><b>{navTitle}</b></Titulo>
            <DeslogarButton variant="outline-danger" size="sm" onClick={setLogout}>
                Deslogar
            </DeslogarButton>
        </NavPers>
    );
};

export default Menu;
