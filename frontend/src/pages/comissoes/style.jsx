import styled from "styled-components";
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

export const TableStyled = styled(Table)`
    font-family: "Roboto", sans-serif;
    min-width: 100%;

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

    tfoot {
        td {

            border-bottom: 1px solid #888888;
        }
    }
`;

export const SpanTitle = styled.span`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    font-family: "Roboto", sans-serif;
    color: #00585E !important;
`;


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    min-height: 100%;
    min-width: 100%;
    background: #f4f4f4;
    color: #00585E !important;
`;

export const ContainerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    background: #f4f4f4;
    min-width: 100%;
    margin-bottom: 20px;
`;

export const RelForm = styled(Row)`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    min-width: 20%;
`;