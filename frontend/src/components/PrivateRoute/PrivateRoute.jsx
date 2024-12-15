import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GlobalContext } from "../../store/global"

export default function PrivateRoute({ children }) {
  const { global } = useContext(GlobalContext);
  const { login } = global;
  return login ? children : <Navigate to="/login" />;
}
