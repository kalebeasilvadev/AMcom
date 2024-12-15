import React, { useContext } from "react";
import { GlobalContext } from "../../store/global";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

export default function DataTable({
  columns,
  rows,
  pages,
  page,
  setPage,
  getEmpresaPaginate,
  inputSearch,
  onChangeLookup,
  order,
  setOrder,
  dataOld,
}) {
  const { http } = useContext(GlobalContext);
  function onVoltar() {
    let pagina = page - 1;
    if (pagina >= 1) {
      setPage(pagina);
    }
  }

  function onAvancar() {
    let pagina = page + 1;
    if (pagina <= pages) {
      setPage(pagina);
    }
  }

  function ordernar(column) {
    let set_order = {
      columns: column,
      order: 1,
    };
    if (order.columns == column) {
      set_order.order = order.order * -1;
    }
    setOrder(set_order);
  }

  return (
    <div className="content-wrapper">
      <section className="content">
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
          className="container-fluid"
        >
          {rows.length > 0 && (
            <Table striped bordered hover size="sm">
              <thead key="table_header">
                <tr>
                  {columns.map((el) => {
                    return (
                      <th
                        onClick={() => ordernar(el.field)}
                        key={el.field}
                        style={{ cursor: "pointer" }}
                      >
                        {el.headerName}
                        {order.columns == el.field &&
                          (order.order == -1 ? (
                            <AiOutlineArrowUp />
                          ) : (
                            <AiOutlineArrowDown />
                          ))}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((el) => {
                  return (
                    <tr key={el.id}>
                      {columns.map((val) => {
                        return <td key={el.id + val.field}>{el[val.field]}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
          <Form className="w-100">
            {dataOld.length == 0 && (
              <Row className="d-flex">
                {page > 1 && (
                  <Col md={1}>
                    <Button onClick={onVoltar} size="sm">
                      Voltar
                    </Button>
                  </Col>
                )}
                <Col md={2}>
                  <span>
                    Pagina {page} de {pages}
                  </span>
                </Col>
                {page < pages && (
                  <Col md={2}>
                    <Button onClick={onAvancar} size="sm">
                      Avançar
                    </Button>
                  </Col>
                )}
              </Row>
            )}

            <Row className="d-flex ">
              <Col md={3} className="pe-0">
                <Form.Select
                  size="sm"
                  type="text"
                  name="columnSearch"
                  value={inputSearch.column}
                  onChange={onChangeLookup}
                >
                  {columns.map((el) => {
                    if (el.field != "id") {
                      return (
                        <option key={el.field} value={el.field}>
                          {el.headerName}
                        </option>
                      );
                    }
                  })}
                </Form.Select>
              </Col>
              <Col md={5} className="ps-0">
                <Form.Control
                  size="sm"
                  type="text"
                  name="valueSearch"
                  value={inputSearch.value}
                  onChange={onChangeLookup}
                />
              </Col>
            </Row>
          </Form>
        </div>
      </section>
    </div>
  );
}
