import React from "react";

import * as Pages from "../../pages/pages";

import {FaCalculator, FaCashRegister} from "react-icons/fa6";

const MenuData = [
    {
        id: 1,
        title: "Vendas",
        icon: <FaCashRegister/>,
        component: <Pages.Venda/>,
    },
    {
        id: 2,
        title: "Comissões",
        icon: <FaCalculator/>,
        component: <Pages.Comissoes/>,
    },
];

export default MenuData;
