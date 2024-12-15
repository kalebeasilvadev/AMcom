import styled from "styled-components";

import Table from 'react-bootstrap/Table';

export const TableStyled = styled(Table)`
    font-family: "Roboto", sans-serif;

    thead {
        background-color: #e4e4e4;
        font: 18px "Roboto", sans-serif;

        th {
            border-bottom: 1px solid #888888;
            padding: 8px;
            align-items: center;
        }
    }

    tbody {
        font: 16px "Roboto", sans-serif;

        tr {
            padding: 8px;

            td {
                border-bottom: 1px solid #888888;
                padding: 8px;
                align-items: center;
            }
        }
    }
`;

export const Options = styled.td`
    display: flex;
    justify-content: space-between;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    color: #00585E !important;
    font-weight: bold;


    span {
        cursor: pointer;
    }

`;


export const TableItens = styled(Table)`
    font-family: "Roboto", sans-serif;

    thead {
        font: 14px "Roboto", sans-serif;

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
            }
        }
    }

    tfoot {
        border-bottom: none;

        tr {
            padding: 8px;

            td {
                font-weight: bold;
                color: #00585E !important;
                border-bottom: none;
                padding: 8px;
                align-items: center;
            }
        }
    }
`;