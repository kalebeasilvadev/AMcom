import React, { useContext, useState, useEffect } from "react";
import * as yup from "yup";
import LayoutForm from "../../components/layoutForm/LayoutForm";
import Template from "./template";
import { HttpContext } from "../../store/http";

const schema = yup.object().shape({
  empresa: yup.object().shape({
    id: yup.number(),
    cnpj: yup.string(),
    nome_razao: yup.string(),
    nome_fantasia: yup.string(),
    cnae: yup.string(),
  }),
});

const Empresa = () => {
  const { get, post, http_delete, put } = useContext(HttpContext);
  const basePath = "api/empresa";
  const title = "Empresa";
  const prop = {
    name: "empresa",
    id: "id",
    desc: "nome_razao",
  };
  const lookupColumns = [
    { name: "ID", value: "id" },
    { name: "Nome", value: "nome_fantasia" },
    { name: "Razão social", value: "nome_razao" },
    { name: "CNPJ", value: "cnpj" },
  ];
  const initialState = {
    id: 0,
    nome_razao: "",
    cnpj: "",
    nome_fantasia: "",
    cnae: "",
  };
  const [form, setForm] = useState(initialState);
  const [insert, setInsert] = useState(true);

  async function getId(id) {
    const res = await get(basePath + "/" + id);
    if (res) {
      setForm(res);
      setInsert(false);
    }
  }
  async function getempresa() {
    const res = await get(basePath);
    if (res) {
      return res;
    }
  }
  async function onDelete() {
    if (form.id > 0) {
      const res = await http_delete(basePath + "/" + form.id);
      if (res) {
        setForm(initialState);
        return res;
      }
    }
  }

  async function onSubmit(data) {
    delete data.res;
    let res = {};
    if (!insert) {
      res = await put(basePath + "/" + data.id, data);
    } else {
      res = await post(basePath, data);
    }
    if (res) {
      setForm(res);
      setForm(initialState);
    }
  }

  function onChange(field) {
    let value = field.target.value;
    let name = field.target.name;
    let res = { ...(form[name] = value) };
    setForm({ ...form, res });
  }

  useEffect(() => {
    if (form.id > 0) {
      setInsert(false);
    } else {
      setInsert(true);
      setForm(initialState);
    }
  }, []);

  return (
    <div>
      <LayoutForm
        title={title}
        validationSchema={schema}
        onSubmit={onSubmit}
        onChange={onChange}
        onDelete={onDelete}
        initialValues={form}
        values={form}
        prop={prop}
        getId={getId}
        getData={getempresa}
        lookupColumns={lookupColumns}
        template={Template}
        multiLevel={true}
        insert={insert}
        readOnly={!insert}
      />
    </div>
  );
};

export default Empresa;
