import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import GlobalProvider from "./store/global";
import HttpProvider from "./store/http";
import CorpoProvider from "./store/corpo.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./components/login/Login";
import Layout from "./components/layout/Layout";

function App() {
    return (
        <GlobalProvider>
            <HttpProvider>
                <CorpoProvider>
                    <Router>
                        <div className="App">
                            <Routes>
                                <Route path="/login" element={<Login/>}/>
                                {/* <Route exact path="/" element={<Layout />} /> */}
                                <Route
                                    exact
                                    path="/layout"
                                    element={
                                        <PrivateRoute>
                                            <Layout/>
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="*"
                                    element={
                                        <PrivateRoute>
                                            <Layout/>
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </div>
                    </Router>
                </CorpoProvider>
            </HttpProvider>
        </GlobalProvider>
    );
}

export default App;
