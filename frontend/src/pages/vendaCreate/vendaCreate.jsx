import React, {useContext, useEffect, useState} from "react";
import {
    ButtonAdd,
    ButtonDelete,
    FormLabel,
    LineDivisor,
    SpanTitle,
    TableItens,
    VendaButtonsContainer,
    VendaCreateContainer,
    VendaDadosAdd,
    VendaDadosContainer,
    VendaItemAdd,
    VendaProdutoContainer,
    VendaTotalContainer
} from "./style.jsx";
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {CorpoContext} from "../../store/corpo.jsx";
import {GlobalContext} from "../../store/global.jsx";
import * as Pages from "../pages.jsx";
import {HttpContext} from "../../store/http.jsx";
import SearchSelect from "../../components/searchSelect/searchSelect.jsx";

const VendaCreate = ({vendaEdit}) => {
    const {saveCorpo} = useContext(CorpoContext);
    const {setNavTitle, global, setVenda, resetVenda, setAlertToast} = useContext(GlobalContext);
    const {venda} = global;
    const {get, post, put} = useContext(HttpContext);
    const [produtoSelected, setProdutoSelected] = useState({});
    const [quantidade, setQuantidade] = useState(0);
    const [vendedorList, setVendedorList] = useState([]);
    const [clientList, setClientList] = useState([]);

    const [resetSearch, setResetSearch] = useState(false);


    const handleVenda = () => {
        resetVenda();
        saveCorpo(<Pages.Venda/>);
        setNavTitle("Venda");
    };

    const setVendedor = (vendedor) => {
        setVenda({...venda, vendedor: vendedor});
    }

    const setClient = (client) => {
        setVenda({...venda, cliente: client});
    }

    const setDataVenda = (data) => {
        setVenda({...venda, data_hora: data});
    }

    const searchProduct = async (text) => {
        if (text.length < 3) {
            return;
        }
        const res = await get(`api/produto/?search=${text}`);
        const response = []
        if (res.results) res.results.map((item) => {
            response.push({
                ...item,
                produto_name: item.descricao,
                name: `${item.codigo} - ${item.descricao}`,
                produto: item.codigo,
            });
        });
        return response;
    };

    const addProduto = () => {
        if (produtoSelected) {
            const total = quantidade * produtoSelected.valor_unitario;
            const total_venda = venda.valor_total || 0;
            const produto = produtoSelected;
            produto["quantidade"] = quantidade;
            const produtoList = venda?.itens || [];

            if (produtoList.find((item) => item.id === produto.id)) {
                const index = produtoList.findIndex((item) => item.id === produto.id);
                produtoList[index].quantidade = parseInt(produtoList[index].quantidade) + parseInt(quantidade);
            } else {
                produtoList.push(produto);
            }
            setVenda({...venda, itens: produtoList, valor_total: total_venda + total});

            setProdutoSelected({});
            setQuantidade(0);
            setResetSearch(true);
        }
    }

    const removeProduto = (id) => {
        const produtoList = venda?.itens || [];
        const newList = produtoList.filter((item) => item.id !== id);
        setVenda({...venda, itens: newList});
    }

    const getVendedor = async () => {
        const res = await get(`api/vendedor/`);
        setVendedorList(res.results);
    }

    const getClient = async () => {
        const res = await get(`api/cliente/`);
        setClientList(res.results);
    }

    const finalizarVenda = async () => {
        try {
            if (!venda.vendedor) {

                setAlertToast({
                    show: true,
                    title: "Venda Gerencial",
                    msg: "Selecione um vendedor",
                });
                return;
            }
            if (!venda.cliente) {
                setAlertToast({
                    show: true,
                    title: "Venda Gerencial",
                    msg: "Selecione um cliente",
                });
                return;
            }
            if (!venda.data_hora) {
                setAlertToast({
                    show: true,
                    title: "Venda Gerencial",
                    msg: "Selecione a data e hora da venda",
                });
                return;
            }
            if (!venda.itens) {
                setAlertToast({
                    show: true,
                    title: "Venda Gerencial",
                    msg: "Adicione produtos a venda",
                });
                return;
            }
            if (vendaEdit) {
                const res = await put(`api/venda/${vendaEdit.id}/`, venda);
                if (res.id) {
                    setAlertToast({
                        show: true,
                        title: "Venda Gerencial",
                        msg: "Venda atualizada com sucesso",
                    });
                    handleVenda();
                }
            } else {
                const res = await post(`api/venda/`, venda);
                if (res.id) {
                    setAlertToast({
                        show: true,
                        title: "Venda Gerencial",
                        msg: "Venda realizada com sucesso",
                    });
                    handleVenda();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getVendedor();
            await getClient();
            resetVenda();

            if (vendaEdit) {
                vendaEdit["vendedor"] = vendaEdit.vendedor_id;
                vendaEdit["cliente"] = vendaEdit.cliente_id;
                vendaEdit["data_hora"] = vendaEdit.data_hora.split(".")[0].replace(" ", "T");
                setVenda(vendaEdit);
            }
        };

        fetchData();
    }, []);

    return (
        <VendaCreateContainer>
            <VendaProdutoContainer>
                <SpanTitle>Produtos</SpanTitle>
                <VendaItemAdd>
                    <Form className="w-100">
                        <Row className="align-items-end">
                            <Col xs={6}>
                                <Form.Group controlId="productSearch">
                                    <FormLabel className="small">Buscar pelo código de barras ou descrição</FormLabel>
                                    <SearchSelect
                                        fetchItems={searchProduct}
                                        onSelect={setProdutoSelected}
                                        placeholder="Digite o código ou nome do produto"
                                        itemKey="id"
                                        itemLabel="name"
                                        reset={resetSearch}
                                        setReset={setResetSearch}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group controlId="quantity">
                                    <FormLabel className="small">Quantidade de Itens</FormLabel>
                                    <Form.Control type="number" size="sm" min="0"
                                                  onChange={(e) => setQuantidade(e.target.value)}
                                                  value={quantidade}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <ButtonAdd variant="success" size="sm" onClick={() => addProduto()}>
                                    Adicionar
                                </ButtonAdd>
                            </Col>
                        </Row>
                    </Form>
                </VendaItemAdd>
                <TableItens hover responsive size="sm" className="text-center">
                    <thead>
                    <tr style={{background: "#f4f4f4"}}>
                        <th>Produto/Serviço</th>
                        <th>Quantidade</th>
                        <th>Preço Unitário</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {venda?.itens?.map((item) => (
                        <tr key={`itemVenda${item.id}`}>
                            <td>{item.produto} - {item.produto_name}</td>
                            <td>{item.quantidade}</td>
                            <td>R$ {item.valor_unitario}</td>
                            <td>R$ {item.quantidade * item.valor_unitario}
                                <ButtonDelete onClick={() => removeProduto(item.id)}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </TableItens>
            </VendaProdutoContainer>
            <LineDivisor/>
            <VendaDadosContainer>
                <SpanTitle>Dados da Venda</SpanTitle>
                <VendaDadosAdd>
                    <Form className="w-100 p-1">
                        <Row>
                            <Col xs={12}>
                                <Form.Group controlId="datetime">
                                    <FormLabel className="small">Data e Hora da Venda</FormLabel>
                                    <Form.Control
                                        type="datetime-local"
                                        size="sm"
                                        value={venda.data_hora || ""}
                                        onChange={(e) => setDataVenda(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="pt-2">
                            <Col xs={12}>
                                <Form.Group controlId="vendedor">
                                    <FormLabel className="small">Escolha um vendedor</FormLabel>
                                    <Form.Control as="select" size="sm" key="selectVendedor"
                                                  value={venda.vendedor || ""}
                                                  onChange={(e) => setVendedor(e.target.value)}>
                                        <option>Selecione um vendedor</option>
                                        {vendedorList.map((item) => (
                                            <option key={item.id} value={item.id}>{item.nome}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="pt-2">
                            <Col xs={12}>
                                <Form.Group controlId="cliente">
                                    <FormLabel className="small">Escolha um cliente</FormLabel>
                                    <Form.Control as="select" size="sm" key="selectClient"
                                                  value={venda.cliente || ""}
                                                  onChange={(e) => setClient(e.target.value)}
                                    >
                                        <option>Selecione um vendedor</option>
                                        {clientList.map((item) => (
                                            <option key={item.id} value={item.id}>{item.nome}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                    <VendaTotalContainer>
                        <SpanTitle>Valor total da venda:</SpanTitle>
                        <h3>R$ {venda?.valor_total || 0}</h3>
                    </VendaTotalContainer>
                    <VendaButtonsContainer>
                        <ButtonAdd size="sm" onClick={() => handleVenda()}>
                            cancelar
                        </ButtonAdd>
                        <ButtonAdd size="sm" onClick={() => finalizarVenda()}>
                            Finalizar
                        </ButtonAdd>
                    </VendaButtonsContainer>
                </VendaDadosAdd>
            </VendaDadosContainer>
        </VendaCreateContainer>
    );
};

export default VendaCreate;