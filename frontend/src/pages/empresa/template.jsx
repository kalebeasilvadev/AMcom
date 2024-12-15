import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { IMaskInput } from "react-imask";
import Form from "react-bootstrap/Form"; 
import Row from "react-bootstrap/Row";
import { getIn } from "formik";
import Lookup from "../../components/lookup/Lookup";

function Template(props) {
  return [
    <div key="template-empresa">
      <Row className="pt-0 pb-0">
        {props.showMsg && (
          <div className="text-warning" role="alert">
            <span>{props.msg}</span>
          </div>
        )}
      </Row>
      <Lookup props={props} />
      <Row className="pt-0 pb-0">
        <Form.Group as={Col} md="3">
          <Form.Label style={{ paddingBottom: 0 }}>CNPJ</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            as={IMaskInput}
            mask="00.000.000/0000-00"
            name="cnpj"
            value={props.values.cnpj}
            onChange={props.onChange}
            isInvalid={!!getIn(props.errors, "cnpj")}
            readOnly={!props.insert}
          />
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label style={{ paddingBottom: 0 }}>Nome Fantasia</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name="nome_fantasia"
            value={props.values.nome_fantasia}
            onChange={props.onChange}
            onKeyDown={props.consultanome_fantasia}
            isInvalid={!!getIn(props.errors, "nome_fantasia")}
          />
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label style={{ paddingBottom: 0 }}>CNAE</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name="cnae"
            value={props.values.cnae}
            onChange={props.onChange}
            onKeyDown={props.consultacnae}
            isInvalid={!!getIn(props.errors, "cnae")}
          />
        </Form.Group>
      </Row>
    </div>,
    <Row key="template-empresa-buttons">
      <Form.Group as={Col} md="auto">
        <Button type="submit" size="sm">
          {props.insert ? "Cadastrar" : "Atualizar"}
        </Button>
      </Form.Group>
      {!props.insert && (
        <Form.Group as={Col} md="auto">
          <Button onClick={props.onDelete} size="sm">Deletar</Button>
        </Form.Group>
      )}
    </Row>,
  ];
}
export default Template;
