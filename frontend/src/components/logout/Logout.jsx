import React, { useContext } from 'react'
import { GlobalContext } from "../../store/global"
import Button from 'react-bootstrap/Button';

export default function Logout() {
  const { setLogout } = useContext(GlobalContext);
  return (
    <Button onClick={setLogout}>Sair</Button>
  )
}
