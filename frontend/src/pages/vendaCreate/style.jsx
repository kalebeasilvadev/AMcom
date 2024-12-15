import styled from "styled-components";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import {MdDelete} from "react-icons/md";

export const VendaCreateContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 20px;
    padding: 40px;
`;


export const VendaProdutoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 100%;
`;

export const LineDivisor = styled.div`
    width: 1px;
    height: 86%;
    background-color: #C4C4C4;
    margin: 10px 0;
`;

export const VendaDadosContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    min-height: 100%;
    padding-left: 20px;
    padding-right: 20px;
`;

export const SpanTitle = styled.span`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    font-family: "Roboto", sans-serif;
`;

export const VendaItemAdd = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    min-width: 100%;
`;

export const VendaDadosAdd = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    min-hight: 100%;
`;

export const FormLabel = styled(Form.Label)`
    font-size: 10px;
    font-weight: bold;
`;

export const ButtonAdd = styled(Button)`
    background-color: #00585E;
    color: white;
    border: none;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: bold;
    border-radius: 3px;
    padding: 5px 10px 5px 10px;
    cursor: pointer;
`;


export const VendaTotalContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 20px;
    width: 100%;

    span {
        font-size: 16px;
        font-weight: bold;
        font-family: "Roboto", sans-serif;
    }
`;

export const VendaButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    padding: 0 50px 0 50px;
`;


export const TableItens = styled(Table)`
    font-family: "Roboto", sans-serif;
    min-width: 100%;
    margin-top: 20px;

    thead {
        min-width: 100%;

        th {
            padding: 8px;
            align-items: center;
            border-bottom: none;
        }
    }

    tbody {
        tr {
            td {
                font: 14px "Roboto", sans-serif;
                border-bottom: none;
                padding: 8px;
                align-items: center;
                vertical-align: middle;
            }
        }
    }
`;

export const ButtonDelete = styled(MdDelete)`
    color: red;
    cursor: pointer;
    margin-left: 5px;
`;