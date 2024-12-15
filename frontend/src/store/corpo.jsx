import React, {createContext, useState} from "react";
import * as Pages from "../pages/pages";

export const CorpoContext = createContext();
const CorpoProvider = ({children}) => {
    const initialState = {
        component: <Pages.Comissoes/>,
    };
    const [corpo, setCorpo] = useState(initialState);

    const saveCorpo = (todo) => {
        setCorpo({...corpo, component: todo});
    };

    return (
        <CorpoContext.Provider value={{corpo, saveCorpo}}>
            {children}
        </CorpoContext.Provider>
    );
};

export default CorpoProvider;
