import styled from "styled-components";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

export const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const SidebarNav = styled.nav`
    background: #007bff;
    min-height: 100%;
    min-width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    left: ${({sidebar}) => (sidebar ? "0" : "-100%")};
    transition: 350ms;
    z-index: 10;
`;

export const SidebarWrap = styled.div`
    width: 100%;
`;

export const SidebarLink = styled.div`
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    height: 50px;
    text-decoration: none;
    font-size: 18px;
    border-radius: 10px;

    &:hover {
        background: #0272eb;
        cursor: pointer;
    }
`;

export const SidebarLabel = styled.span`
    margin-left: 16px;
`;

export const DropdownLink = styled.div`
    background: #0272eb;
    height: 50px;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    border-radius: 10px;

    &:hover {
        background: green;
        cursor: pointer;
    }
`;

export const NavPers = styled(Navbar)`
    background-color: #e4e4e4;
    color: #00585E;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
`;

export const MenuLogo = styled.div`
    flex: 0 1 auto;
`;

export const DeslogarButton = styled(Button)`
    margin-right: 10px;
    font-family: "Roboto", sans-serif;
    max-width: 100px;
    flex: 0 1 auto;
`

export const Titulo = styled.h3`
    text-align: center;
    font-family: "Roboto", sans-serif;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

export const MenuItem = styled.div`
    color: #00585E;
    margin-bottom: 20px;
    font-family: "Roboto", sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`;

export const MenuItemIcon = styled.span`
    width: 15px;
    margin-right: 10px;
    align-items: center;
`;

export const MenuItemText = styled.span`
    font-size: 18px;
    font-family: "Roboto", sans-serif;
    align-items: center;
`;

export const MenuItemVector = styled.span`
    position: relative;
    color: lightgray;
    font-weight: bold;
    font-size: 20px;
`;