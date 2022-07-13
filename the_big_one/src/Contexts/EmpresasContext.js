import { useContext, createContext, useState, useMemo, useEffect } from "react";
import useFetch from "../hooks/useFetch"
import {EMPRESAS} from "../config/settings"

const EmpresasContext = createContext({

    listaEmpresas: [],
    setListaEmpresas: () => {}
});

export default function EmpresasContextProvider({children}){

    const [listaEmpresas, setListaEmpresas] = useState([]);

    useEffect(function(){

        async function fetchEmpresas(){

            const response = await fetch(EMPRESAS)
            if(response.status === 200){
                const json = await response.json();
                setListaEmpresas(json)
            }
        }

        fetchEmpresas()

    }, [])

    const value = useMemo(
        () => ({
            listaEmpresas, 
            setListaEmpresas
        }),
        [listaEmpresas, setListaEmpresas]
    );

    return <EmpresasContext.Provider value={value}>{children}</EmpresasContext.Provider>
}

export function useEmpresasContext(){
    return useContext(EmpresasContext)
}