import React, {createContext, useContext} from "react";
import {GlobalContext, useLocalStorage} from "./global";

export const HttpContext = createContext();
const HttpProvider = ({children}) => {
    const {global, setLogoutTela, setLogout, setAlertToast} =
        useContext(GlobalContext);
    const initialState = {
        host: "localhost",
        port: 8000,
        token: "",
    };
    const [http, setHttp] = useLocalStorage("httpStore", initialState);

    const preparyUrl = () => {
        return `http://${http.host}:${http.port}/`;
    };

    const saveHttp = (todo) => {
        setHttp({...http, ...todo});
    };

    const clearHttp = () => {
        setHttp(initialState);
    };

    const showAlert = (msg) => {
        setAlertToast({
            show: true,
            title: "Vendas Gerencial",
            msg: msg,
        });
    };


    const request = ({
                         metodo = "GET",
                         path = null,
                         body = null,
                         token = true,
                         logout = true,
                     }) => {
        if (path === undefined) {
            return "path vazio";
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if (token) {
            myHeaders.append("Authorization", "Bearer " + global.token);
        }
        let url = preparyUrl() + path;
        let settings = {
            method: metodo,
            headers: myHeaders,
            crossDomain: true,
        };

        if (body) {
            settings.body = JSON.stringify(body);
            settings.crossDomain = true;
        }
        try {
            let response = fetch(url, settings)
                .then((res) => res)
                .then((res) => {
                    if (res.status == 401 || res.status == 403) {
                        setLogout();
                    } else if (global.loginTela && logout) {
                        setLogoutTela(false);
                    } else if (res.status == 404) {
                        showAlert("Não encontrado!!");
                    } else if (res.status == 400) {
                        res.json().then((errorObj) => showAlert(errorObj.message));
                    } else {
                        return res.json();
                    }
                })
                .catch((error) => {
                });
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const get = (path, body = null, logout = true) => {
        try {
            let data = request({
                path: path,
                logout: logout,
            });
            return data;
        } catch (error) {
            return error;
        }
    };

    const http_delete = (path, logout = true) => {
        try {
            let data = request({
                metodo: "DELETE",
                path: path,
                logout: logout,
            });
            return data;
        } catch (error) {
            return error;
        }
    };

    const post = (path, body = null) => {
        try {
            let data = request({
                metodo: "POST",
                path: path,
                body: body,
            });
            return data;
        } catch (error) {
            return error;
        }
    };

    const put = (path, body = null) => {
        try {
            let data = request({
                metodo: "PUT",
                path: path,
                body: body,
            });
            return data;
        } catch (error) {
            return error;
        }
    };

    const login = async (values) => {
        try {
            let data = await request({
                metodo: "POST",
                token: false,
                path: "api/token/",
                body: {
                    username: values.user,
                    password: values.password,
                },
            });
            if (data) {
                if (data.access_token != "") {
                    setHttp({...http, token: data.access_token});
                    return data;
                }
            } else {
                return false;
            }
        } catch (error) {
            return error;
        }
    };

    return (
        <HttpContext.Provider
            value={{
                request,
                get,
                post,
                put,
                login,
                http,
                saveHttp,
                clearHttp,
                http_delete,
            }}
        >
            {children}
        </HttpContext.Provider>
    );
};

export default HttpProvider;
