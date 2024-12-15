import React, {useContext, useEffect} from "react";
import {Options, TableItens, TableStyled} from "./style.jsx";
import {MdDelete} from "react-icons/md";
import {FaEdit} from "react-icons/fa";
import {CorpoContext} from "../../store/corpo.jsx";
import * as Pages from "../pages.jsx";
import {GlobalContext} from "../../store/global.jsx";
import {HttpContext} from "../../store/http.jsx";

const VendaList = () => {
    const {saveCorpo} = useContext(CorpoContext);
    const {setNavTitle} = useContext(GlobalContext);
    const {get, http_delete} = useContext(HttpContext);
    const [showItens, setShowItens] = React.useState({});
    const [vendas, setVendas] = React.useState([]);

    const setNewShowItens = (id) => {
        setShowItens({...showItens, [id]: !showItens[id]});
    }

    const getVendas = async () => {
        const response = await get("api/venda/");
        return response.results;
    }

    const deleteVenda = async (id) => {
        await http_delete(`api/venda/${id}/`);
        getVendas().then((data) => {
            setVendas(data);
        });
    }

    const handleUpdate = (item) => {
        saveCorpo(<Pages.VendaCreate vendaEdit={item}/>);
        setNavTitle(`Alterar Venda - N ${item.id}`);
    }

    useEffect(() => {
        getVendas().then((data) => {
            setVendas(data);
        });
    }, []);

    const tableOptions = (row) => {
        return (
            <TableItens hover responsive size="sm" className="text-center">
                <thead>
                <tr style={{background: "#f4f4f4"}}>
                    <th>Produto/Serviço</th>
                    <th>Quantidade</th>
                    <th>Preço Unitário</th>
                    <th>Total do Produto</th>
                    <th>% de Comissão</th>
                    <th>Comissão</th>
                </tr>
                </thead>
                <tbody>
                {row.itens.map((item) => (
                    <tr key={item.id}>
                        <td>{item.produto} - {item.produto_name}</td>
                        <td>{item.quantidade}</td>
                        <td>{item.valor_unitario.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                        <td>{item.valor_total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                        <td>{item.percentual_comissao}%</td>
                        <td>{item.comissao.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td>Total da Venda</td>
                    <td>{row.itens.reduce((acc, item) => acc + item.quantidade, 0)}</td>
                    <td></td>
                    <td>{row.valor_total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                    <td></td>
                    <td></td>
                </tr>
                </tfoot>
            </TableItens>
        )
    }

    return (
        <TableStyled hover responsive size="sm" className="text-center">
            <thead>
            <tr style={{background: "#f4f4f4"}}>
                <th>Nota Fiscal</th>
                <th>Cliente</th>
                <th>Vendedor</th>
                <th>Data da Venda</th>
                <th>Valor Total</th>
                <th>Opções</th>
            </tr>
            </thead>
            <tbody>
            {vendas.map((row) => (
                <>
                    <tr key={row.id}>
                        <td>{row.numero_nota}</td>
                        <td>{row.cliente}</td>
                        <td>{row.vendedor}</td>
                        <td>{row.created_at}</td>
                        <td>{row.valor_total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                        <Options>
                            <span onClick={() => setNewShowItens(row.id)}>Ver itens</span>
                            <FaEdit onClick={() => handleUpdate(row)} style={{cursor: "pointer"}}/>
                            <MdDelete onClick={() => deleteVenda(row.id)} style={{color: "red", cursor: "pointer"}}/>
                        </Options>
                    </tr>
                    {showItens[row.id] && (
                        <tr>
                            <td colSpan={6}>{tableOptions(row)}</td>
                        </tr>)}
                </>
            ))}
            </tbody>
        </TableStyled>
    );
};

export default VendaList;
