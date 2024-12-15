import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import LayoutForm from "../../components/layoutForm/LayoutForm";
import Template from "./template";
import { HttpContext } from "../../store/http";
import DataTable from "../../components/dataTable/dataTable";
import { FamilyRestroomTwoTone } from "@mui/icons-material";

const schema = yup.object().shape({
  endpoint: yup.string(),
  date_init: yup.string(),
});

const map_text = {
  produto: "Produto",
  empresa: "Empresa",
  nota_fiscal: "Nota Fiscal",
};

export default function Relatorio() {
  const { get, post } = useContext(HttpContext);
  const [data, setData] = useState([]);
  const [dataOld, setDataOld] = useState([]);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState({ columns: "id", order: 1 });
  const [inputSearch, setInputSearch] = useState({
    columnSearch: "nome_razao",
    valueSearch: "",
  });
  const columns = [
    { headerName: "Cod.", field: "id" },
    { headerName: "Razão social", field: "nome_razao" },
    { headerName: "CNPJ", field: "cnpj" },
    { headerName: "Nome", field: "nome_fantasia" },
    { headerName: "CNAE", field: "cnae" },
  ];

  async function getEmpresa() {
    const res = await get("api/empresa?limit=25");
    if (res) {
      setData(res);
      return res;
    }
  }

  async function getEmpresaPaginate() {
    const res = await get("api/empresa?start=" + page + "&limit=25");
    if (res) {
      setData(res);
      return res;
    }
  }

  async function getPages() {
    const res = await get("api/empresa/pages");
    if (res) {
      setPages(res.pages);
      return res;
    }
  }

  function onChangeLookup(field) {
    let value = field.target.value;
    let name = field.target.name;
    setInputSearch({ ...inputSearch, [name]: value });
  }

  function compareValues() {
    return function (a, b) {
      if (
        !a.hasOwnProperty(order.columns) ||
        !b.hasOwnProperty(order.columns)
      ) {
        return 0;
      }

      const varA =
        typeof a[order.columns] === "string"
          ? a[order.columns].toUpperCase()
          : a[order.columns];
      const varB =
        typeof b[order.columns] === "string"
          ? b[order.columns].toUpperCase()
          : b[order.columns];

      let comparison = 0;

      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order.order == -1 ? comparison * -1 : comparison;
    };
  }

  function ordenation() {
    const sortedArray = data.slice().sort(compareValues());
    setData(sortedArray);
  }

  useEffect(() => {
    const res = async () => {
      await getEmpresa();
      await getPages();
    };
    res();
  }, []);

  useEffect(() => {
    const res = async () => {
      await getEmpresaPaginate();
    };
    res();
  }, [page]);

  useEffect(() => {
    ordenation();
  }, [order.order]);

  async function aplicarFiltro(payload) {
    if (dataOld.length == 0) {
      setDataOld(data);
    }
    const valueSearch = inputSearch.valueSearch.toLowerCase();
    const dadosFilter = data.filter((empresa) => {
      const empresaValue = empresa[inputSearch.columnSearch].toLowerCase();
      return empresaValue.includes(valueSearch);
    });
    if (dadosFilter.length > 0) {
      setData(dadosFilter);
    } else {
      await searchLookup(payload);
    }
  }

  async function searchLookup(payload) {
    const res = await post("api/lookup/filter?limit=100", payload);
    if (res) {
      setData(res);
    }
  }
  useEffect(() => {
    if (inputSearch.valueSearch.length > 0) {
      aplicarFiltro({ [inputSearch.columnSearch]: inputSearch.valueSearch });
    } else if (dataOld.length > 0) {
      setData(dataOld);
      setDataOld([]);
    }
  }, [inputSearch.valueSearch]);

  return (
    <div>
      <DataTable
        columns={columns}
        rows={data}
        pages={pages}
        page={page}
        setPage={setPage}
        getEmpresaPaginate={getEmpresaPaginate}
        inputSearch={inputSearch}
        onChangeLookup={onChangeLookup}
        order={order}
        setOrder={setOrder}
        dataOld={dataOld}
      />
    </div>
  );
}
