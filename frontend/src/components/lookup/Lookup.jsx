import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Formik, getIn } from "formik";
import * as yup from "yup";
import { GlobalContext } from "../../store/global";
import { HttpContext } from "../../store/http";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { ModalBody } from "./style";
import SearchIcon from "@mui/icons-material/Search";

export default function Lookup({ props }) {
  const { get, post, http, saveHttp } = useContext(HttpContext);
  const [lookupModal, setLookupModal] = useState(false);
  const handleClose = () => setLookupModal(false);
  const [inputSearch, setInputSearch] = useState({
    columnSearch: "nome_fantasia",
    valueSearch: "",
  });
  const [search, setSearch] = useState({});
  const {
    lookupColumns,
    prop,
    getId,
    getData,
    values,
    onChange,
    errors,
    title,
    readOnly
  } = props;
  const { nome, id, desc } = prop;
  const propNameId = `${id}`;
  const propNameDesc = `${desc}`;
  const [dados, setData] = useState([]);

  async function handleKeyPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      const { value } = event.target;
      if (value > 0) {
        getId(value);
      }
    }
  }

  async function handleClick() {
    setData(await getData());
    setLookupModal(true);
  }

  async function searchLookup(data) {
    const res = await post("api/lookup/filter?limit=100", data);
    if (res) {
      setData(res);
    }
  }

  useEffect(() => {
    if (inputSearch.valueSearch.length > 0) {
      searchLookup({ [inputSearch.columnSearch]: inputSearch.valueSearch });
    }
  }, [inputSearch.valueSearch]);

  function onChangeLookup(field) {
    let value = field.target.value;
    let name = field.target.name;
    setInputSearch({ ...inputSearch, [name]: value });
  }

  async function selectRow(value) {
    getId(value);
    handleClose();
  }

  return (
    <>
      <Row className="pt-0 pb-0">
        <Form.Group as={Col} md="2" style={{ paddingRight: "0" }}>
          <Form.Label>Codigo</Form.Label>
          <InputGroup size="sm">
            <InputGroup.Text size="sm" onClick={() => handleClick()}>
              <SearchIcon sx={{ fontSize: 20 }} />
            </InputGroup.Text>
            <Form.Control
              size="sm"
              type="text"
              name={propNameId}
              value={values[id]}
              onChange={onChange}
              onKeyDown={handleKeyPress}
              isInvalid={!!getIn(errors, propNameId)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="10" style={{ paddingLeft: "0" }}>
          <Form.Label>Razão Social</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name={propNameDesc}
            value={values[desc]}
            onChange={onChange}
            isInvalid={!!getIn(errors, propNameDesc)}
            readOnly={readOnly}
          />
        </Form.Group>
      </Row>
      <Modal
        show={lookupModal}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                {lookupColumns.map((el) => {
                  return <th key={el.name}>{el.name}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {dados.map((el) => {
                return (
                  <tr
                    key={el[id]}
                    onClick={() => {
                      selectRow(el[id]);
                    }}
                  >
                    {lookupColumns.map((val) => {
                      return <td key={el[id] + val.name}>{el[val.value]}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </ModalBody>
        <Modal.Footer>
          <Form className="w-100">
            <Row className="d-flex justify-content-between">
              <Col md={3} className="pe-0">
                <Form.Select
                  size="sm"
                  type="text"
                  name="columnSearch"
                  value={inputSearch.column}
                  onChange={onChangeLookup}
                >
                  {lookupColumns.map((el) => {
                    if (el.value != id) {
                      return (
                        <option key={el.value} value={el.value}>
                          {el.name}
                        </option>
                      );
                    }
                  })}
                </Form.Select>
              </Col>
              <Col className="ps-0">
                <Form.Control
                  size="sm"
                  type="text"
                  name="valueSearch"
                  value={inputSearch.value}
                  onChange={onChangeLookup}
                />
              </Col>
              <Col xs="auto">
                <Button size="sm" onClick={handleClose}>
                  Fechar
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
}
