import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

function Template(props) {
  return [
    <div key="template-relatorio">
      <Row className="mb-3">
        {props.showMsg && (
          <div className="text-warning" role="alert">
            <span>{props.msg}</span>
          </div>
        )}
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="3">
          <Form.Label>Endpoint</Form.Label>
          <Form.Select
            size="sm"
            type="text"
            name="endpoint"
            {...props.register("endpoint")}
            isInvalid={!!props.errors.endpoint}
          >
            <option value="empresa">Empresa</option>
            <option value="produto">Produto</option>
            <option value="nota_fiscal">Nota Fiscal</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label>Data Inicio</Form.Label>
          <Form.Control
            size="sm"
            type="date"
            name="date_init"
            {...props.register("date_init")}
            isInvalid={!!props.errors.date_init}
          />
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label>Data Fim</Form.Label>
          <Form.Control
            size="sm"
            type="date"
            name="date_end"
            {...props.register("date_end")}
          />
        </Form.Group>
      </Row>
    </div>,
    <Row key="templete-relatorio-button">
      <Form.Group as={Col} md="auto">
        <Button type="submit">Gerar</Button>
      </Form.Group>
    </Row>,
  ];
}
export default Template;
