import {useEmpresasContext} from "../../Contexts/EmpresasContext"
import {useState} from "react";
import ListaMarketplace from "../../Components/ListaMarketplace"
import {Container, Row} from "react-bootstrap"
export default function Marketplace (){

    const {listaEmpresas} = useEmpresasContext();
    const [arrayFiltro, setArrayFiltro] = useState(listaEmpresas);

    return(

        <Container fluid>

        <Row className="justify-content-center mt-5">
            <ListaMarketplace lista={arrayFiltro}/>
        </Row>

        </Container>
    )
}