import React, {useContext, useEffect} from "react";
import {Container, ContainerHeader, RelForm, SpanTitle, TableStyled} from "./style.jsx";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {ButtonAdd} from "../vendaCreate/style.jsx";
import {FaSearch} from "react-icons/fa";
import {HttpContext} from "../../store/http.jsx";


const Comissoes = () => {
    const {get} = useContext(HttpContext);

    const [rows, setRows] = React.useState([]);
    const [dateStart, setDateStart] = React.useState("");
    const [dateEnd, setDateEnd] = React.useState("");

    const getComissoes = async () => {
        const response = await get("api/comissao-report/");
        return response.results;
    }

    const getComissoesByDate = async () => {
        if (!dateStart) return getComissoes().then((data) => setRows(data));
        const response = await get(`api/comissao-report/?start_date=${dateStart}&end_date=${dateEnd}`);
        setRows(response.results);
    }

    useEffect(() => {
        getComissoes().then((data) => {
            setRows(data);
        });
    }, []);

    return (
        <Container>
            <ContainerHeader>
                <SpanTitle>Relatório de Comssões</SpanTitle>
                <RelForm>
                    <Col xs={5}>
                        <Form.Group controlId="productSearch">
                            <Form.Control
                                type="date"
                                size="sm"
                                value={dateStart}
                                onChange={(e) => setDateStart(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={5}>
                        <Form.Group controlId="productSearch">
                            <Form.Control
                                type="date"
                                size="sm"
                                value={dateEnd}
                                onChange={(e) => setDateEnd(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={1}>
                        <ButtonAdd variant="success" size="sm">
                            <FaSearch onClick={() => getComissoesByDate()}/>
                        </ButtonAdd>
                    </Col>
                </RelForm>
            </ContainerHeader>

            <TableStyled responsive size="sm" className="text-center">
                <thead>
                <tr style={{background: "#f4f4f4"}}>
                    <th>Cód.</th>
                    <th>Vendedor</th>
                    <th>Total de Vendas</th>
                    <th>Total de Comissões</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row) => (
                    <tr key={row.codigo}>
                        <td>{row.codigo}</td>
                        <td>{row.vendedor}</td>
                        <td>{row.quantidade_vendas}</td>
                        <td>{row.total_comissao.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="3" style={{textAlign: "left"}}>Total de Comissões no Período</td>
                    <td>{rows.reduce((acc, item) => acc + item.total_comissao, 0).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}</td>
                </tr>
                </tfoot>
            </TableStyled>
        </Container>
    );
};

export default Comissoes;
