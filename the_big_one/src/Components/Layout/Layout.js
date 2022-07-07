import { Container } from "react-bootstrap";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { EMPRESAS } from "../../config/settings";

export default function Layout() {
  const [buscarEmpresa, setBuscarEmpresa] = useState({ name: "" });
  const [lista, setLista] = useState();

  useEffect(
    function () {
      async function fetchApi() {
        //Creamos una funcion asincrona para llamar a la API
        const response = await fetch(
          //Adaptamos la direccion de la API para busquedas personalizadas
          `${EMPRESAS}?name=${buscarEmpresa}`
        );
        const json = await response.json(); //Metemos la respuesta de la API en una variable (json)
        console.log (json)
        setLista(json); //Y establecemos que la lista de personajes (list) sea el .results de la respuesta de la API (json)

      }
      fetchApi(); //Usamos la funcion que llama a la API
    },
    [buscarEmpresa] //Aqui indicamos que llame a la API cada vez que esos dos parametros cambien
  );
  return (
    <Container fluid>
      <Navbar setBuscarEmpresa={setBuscarEmpresa}/>
      <Outlet lista={lista} setLista={setLista}/>
    </Container>
  );
}
