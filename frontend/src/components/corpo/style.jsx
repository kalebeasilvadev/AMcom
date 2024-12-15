import styled from "styled-components";

const CorpoDiv = styled.div`
    min-width: 100%;
    height: 94%;
    display: flex;
    flex-direction: row;
`;

export const CorpoConteudo = styled.div`
    min-width: ${(props) => (props.sidebar ? "100%" : "80%")};
    min-height: 100%;
    position: relative;
    overflow-y: auto;
    align-items: center;
`;

export const CorpoMenu = styled.div`
    width: 20%;
    height: 100%;
    padding: 10px;
    position: relative;
    overflow-y: auto;
    background-color: #e4e4e4;
    display: ${(props) => (props.sidebar ? "none" : "block")};
`;

export default CorpoDiv;
