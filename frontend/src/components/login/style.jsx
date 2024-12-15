import styled from 'styled-components'

const LoginDiv = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.9) !important;
`

export const FormDiv = styled.div`
    color: black;
    padding: 30px;
    border-radius: 30px;
    background-color: rgba(247, 247, 247, 0.9) !important;
`


export default LoginDiv;