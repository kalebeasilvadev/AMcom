import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormDiv } from "./style";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import * as yup from "yup";
import { GlobalContext } from "../../store/global";
import { HttpContext } from "../../store/http";

const schema = yup.object().shape({
  user: yup.string().required(),
  password: yup.string().required(),
});

export default function LoginModal({ noNavigate = false, closeModal }) {
  const { global, saveGlobal, setLogout } = useContext(GlobalContext);
  const { login } = global;
  const { login: logar, get, http, clearHttp } = useContext(HttpContext);
  const { host } = http;
  const navigate = useNavigate();
  const [showMsg, setShowMsg] = useState(false);
  const [showMsgUser, setShowMsgUser] = useState(false);
  const [showMsgPassword, setShowMsgPassword] = useState(false);
  const [msg, setMsg] = useState("Não foi possivel realizar o login!");

  async function onSubmit(data) {
    let response = await logar(data);
    if (response?.access_token || response?.access) {
      saveGlobal({
        user: data.user,
        password: data.password,
        token: response?.access_token || response?.access,
        tokenRefresh: response.refresh,
        token_level: response.nivel,
        validade: response.validade,
        login: true,
      });
      if (noNavigate) {
        closeModal();
      }
    }
  }



  useEffect(() => {
    if (host) {
      if (login && !noNavigate) {
        navigate("/layout");
      }
    }
  }, [login]);

  return (
    <FormDiv>
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <Formik
              validationSchema={schema}
              onSubmit={onSubmit}
              initialValues={{
                user: "kalebe",
                password: "kalebe",
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    {showMsg && (
                      <div className="text-warning" role="alert">
                        <span>{msg}</span>
                      </div>
                    )}
                  </Row>
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik101"
                    >
                      <Form.Label>Usuario</Form.Label>
                      <Form.Control
                        type="text"
                        name="user"
                        placeholder="Usuario"
                        value={values.user}
                        onChange={handleChange}
                        isInvalid={!!errors.user}
                      />
                      <Form.Control.Feedback type="invalid">
                        Campo Obrigatorio!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik103"
                    >
                      <Form.Label>Senha</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Senha"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />

                      <Form.Control.Feedback type="invalid">
                        Campo Obrigatorio!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Button type="submit">Logar</Button>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </div>
    </FormDiv>
  );
}
