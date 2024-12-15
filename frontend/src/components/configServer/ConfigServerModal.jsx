import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FormDiv} from "./style";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {Formik} from "formik";
import * as yup from "yup";
import {HttpContext} from "../../store/http";

const schema = yup.object().shape({
    host: yup.string().required(),
    port: yup.string().required(),
});

export default function ConfigServerModal() {
    const {http, saveHttp} = useContext(HttpContext);
    const {host, port} = http;
    const navigate = useNavigate();
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("Não foi possivel salvar!");

    async function onSubmit(data) {
        if (data.host) {
            saveHttp({
                host: data.host,
                port: data.port,
            });
        }
    }

    useEffect(() => {
        if (host) {
            navigate("/login");
        }
    }, [host]);

    return (
        <FormDiv>
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <Formik
                            validationSchema={schema}
                            onSubmit={onSubmit}
                            initialValues={{
                                host: "",
                                port: "",
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
                                        <img src={Logo} height={100}/>
                                    </Row>
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
                                            <Form.Label>Host</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="host"
                                                placeholder="Host"
                                                value={values.host}
                                                onChange={handleChange}
                                                isInvalid={!!errors.host}
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
                                            <Form.Label>Porta</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Porta"
                                                name="port"
                                                value={values.port}
                                                onChange={handleChange}
                                                isInvalid={!!errors.port}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Campo Obrigatorio!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Button type="submit">Salvar</Button>
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
