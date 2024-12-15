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

export default function SubLookup({
  name,
  value,
  onChange,
  errors,
  className,
  path,
  idname,
  title,
  valueName,
  getId,
}) {
  const { get, post, http, saveHttp } = useContext(HttpContext);
  const [lookupModal, setLookupModal] = useState(false);
  const handleClose = () => setLookupModal(false);
  const [inputSearch, setInputSearch] = useState({
    columnSearch: "nome",
    valueSearch: "",
  });
  const [search, setSearch] = useState({});
  const [dados, setData] = useState([]);
  const [dataName, setDataName] = useState("");
  const lookupColumns = [
    { name: "ID", value: idname },
    { name: "Nome", value: "nome" },
  ];

  async function handleKeyPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      const { value } = event.target;
      if (value > 0) {
        get_id(value);
      }
    }
  }

  async function handleClick(event) {
    await getData();
    setLookupModal(true);
  }

  async function searchLookup(data) {
    const res = await post("lookup/filter/" + path + "?limit=100", data);
    if (res) {
      setData(res);
    }
  }

  async function get_id() {
    let res = await post("lookup/filter/" + path + "?limit=1", {
      [idname]: value,
    });
    if (res) {
      setDataName(res.nome);
      
      if (getId) {
        getId(value);
      }
    }
  }
  async function getData() {
    let res = await post("lookup/filter/" + path + "?limit=0", {});
    if (res) {
      setData(res);
    }
  }

  // useEffect(() => {
  //   if (inputSearch.valueSearch.length > 0) {
  //     searchLookup({ [inputSearch.columnSearch]: inputSearch.valueSearch });
  //   }
  // }, [inputSearch.valueSearch]);

  // useEffect(() => {
  //   if (value > 0 && valueName == "") {
  //     get_id();
  //   }
  // }, [value]);

  function onChangeLookup(field) {
    let value = field.target.value;
    let name = field.target.name;
    setInputSearch({ ...inputSearch, [name]: value });
  }

  async function selectRow(value) {
    let field = {
      target: {
        value: value[idname],
        name: name,
      },
    };
    onChange(field);
    setDataName(value.nome);
    if (getId) {
      getId(value[idname]);
    }
    handleClose();
  }

  return (
    <>
      <Row className="pt-0 pb-0">
        <Form.Group as={Col} md="4">
          <h5>{title}</h5>
        </Form.Group>
      </Row>
      <Row className="pt-0 pb-0">
        <Form.Label>Codigo</Form.Label>
        <InputGroup className="mb-1" size="sm">
          <InputGroup.Text size="sm" onClick={() => handleClick()}>
            <SearchIcon sx={{ fontSize: 20 }} />
          </InputGroup.Text>
          <Col sm="1">
            <Form.Control
              size="sm"
              type="text"
              name={name}
              value={value}
              onChange={onChange}
              onKeyDown={handleKeyPress}
              isInvalid={!!getIn(errors, idname)}
            />
          </Col>
          <Form.Control
            size="sm"
            type="text"
            name={name + "text"}
            value={dataName != "" ? dataName : valueName}
            readOnly
            disabled
          />
        </InputGroup>
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
                    key={el[idname]}
                    onClick={() => {
                      selectRow(el);
                    }}
                  >
                    {lookupColumns.map((val) => {
                      return (
                        <td key={el[idname] + val.name}>{el[val.value]}</td>
                      );
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
                    if (el.value != idname) {
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
