import styled from "styled-components";
import Button from "react-bootstrap/Button";

export const VendaDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 40px;
`;

export const VendaHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const VendaCorpo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const InsertVenda = styled(Button)`
    background-color: #00585E;
    color: white;
    border: none;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: bold;
    border-radius: 3px;
    padding: 5px 20px 5px 20px;
    cursor: pointer;
`;

export const VendaTitle = styled.span`
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-weight: bold;
    color: #00585E;
`;