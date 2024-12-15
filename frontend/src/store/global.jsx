import React, {createContext, useState} from "react";

export const GlobalContext = createContext();

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });
    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.log(error);
        }
    };
    return [storedValue, setValue];
}

const GlobalProvider = ({children}) => {
    const initialState = {
        user: "",
        password: "",
        token: "",
        tokenRefresh: "",
        token_level: "",
        login: false,
        loginTela: false,
        lookupModal: true,
        valide: "",
        sideMenu: true,
        navTitle: "Venda",
        modal: {
            view: false,
            component: "",
        },
        venda: {},
        alertToast: {
            show: false,
            title: "Vendas",
            msg: "",
        },
    };
    const [global, setGlobal] = useLocalStorage("globalStore", initialState);

    const saveGlobal = (todo) => {
        setGlobal({...global, ...todo});
    };
    const setLogout = () => {
        setGlobal(initialState);
    };
    const setLogoutTela = (todo = false) => {
        setGlobal({...global, loginTela: todo});
    };
    const setLookupModal = (todo = false) => {
        setGlobal({...global, lookupModal: todo});
    };
    const setAlertToast = (todo) => {
        setGlobal({...global, alertToast: todo});
    };
    const setModal = (todo) => {
        setGlobal({...global, modal: todo});
    };
    const setSideMenu = (todo) => {
        setGlobal({...global, sideMenu: todo});
    };
    const setNavTitle = (todo) => {
        setGlobal({...global, navTitle: todo})
    }

    const setVenda = (todo) => {
        setGlobal({...global, venda: todo})
    }

    const resetVenda = () => {
        setGlobal({...global, venda: initialState.venda})
    }

    return (
        <GlobalContext.Provider
            value={{
                global,
                saveGlobal,
                setLogout,
                setLogoutTela,
                setLookupModal,
                setAlertToast,
                setModal,
                setSideMenu,
                setNavTitle,
                setVenda,
                resetVenda
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
