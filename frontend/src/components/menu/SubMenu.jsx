import React, {useContext} from "react";
import {CorpoContext} from "../../store/corpo";
import Container from "react-bootstrap/Container";
import {MenuItem, MenuItemIcon, MenuItemText, MenuItemVector} from "./style.jsx";
import MenuData from "./MenuData.jsx";
import {MdKeyboardArrowRight} from "react-icons/md";
import {GlobalContext} from "../../store/global.jsx";

const SubMenu = () => {
    const {saveCorpo} = useContext(CorpoContext);
    const {setNavTitle} = useContext(GlobalContext);

    const handleClick = (elm, subNav = true) => {
        saveCorpo(elm.component);
        setNavTitle(elm.title);

    };

    return (
        <Container style={{padding: "10px"}}>
            {MenuData.map((item) => {

                return <MenuItem
                    style={{cursor: "pointer"}}
                    onClick={() => {
                        handleClick(item, false);
                    }}
                    id={item.id}
                    key={item.id}
                >
                    <div>
                        <MenuItemIcon>{item.icon}</MenuItemIcon>
                        <MenuItemText><b>{item.title}</b></MenuItemText>
                    </div>
                    <MenuItemVector><MdKeyboardArrowRight/></MenuItemVector>

                </MenuItem>
            })}
        </Container>
    );
};

export default SubMenu;
