import React, {useContext} from "react";
import {InsertVenda, VendaCorpo, VendaDiv, VendaHeader, VendaTitle} from "./style.jsx";
import {VendaList} from "../pages.jsx";
import {CorpoContext} from "../../store/corpo.jsx";
import * as Pages from "../../pages/pages";
import {GlobalContext} from "../../store/global.jsx";

const Venda = () => {
    const {saveCorpo} = useContext(CorpoContext);
    const {setNavTitle, setVenda} = useContext(GlobalContext);

    const handleNovaVenda = () => {
        setVenda({});
        saveCorpo(<Pages.VendaCreate/>);
        setNavTitle("Nova Venda");
    }

    return (
        <VendaDiv>
            <VendaHeader>
                <VendaTitle>Vendas Realizadas</VendaTitle>
                <InsertVenda onClick={() => handleNovaVenda()}> Inserir nova Venda</InsertVenda>
            </VendaHeader>
            <VendaCorpo>
                <VendaList/>
            </VendaCorpo>
        </VendaDiv>
    );
};

export default Venda;
