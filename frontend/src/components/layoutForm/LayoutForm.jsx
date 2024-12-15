import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const LayoutForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(props.validationSchema),
    defaultValues: props.values,
  });
  const [BodyForm, FooterForm] = props.template({
    register,
    errors,
    ...props,
  });
  useEffect(() => {
    for (const key in props.values) {
      setValue(key, props.values[key]);
    }
  });
  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title pb-0 m-0">{props.title}</h3>
              {props?.closeModal ? (
                <h3 onClick={props?.closeModal} className="card-title pb-0 m-0">
                  X
                </h3>
              ) : (
                ""
              )}
            </div>
            <Form noValidate onSubmit={handleSubmit(props.onSubmit)}>
              <div className="card-body">{BodyForm}</div>
              <div className="card-footer">{FooterForm}</div>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LayoutForm;
