import styled from 'styled-components'

const LayoutColumn = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const Space = styled.div`
    min-width: 100%;
    height: 3px;
`


export default LayoutColumn;