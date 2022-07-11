import { Container } from "react-bootstrap";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";


export default function Layout() {
 
  return (
    <Container fluid className="p-0 ">
      <Navbar/>
      <Outlet />
  
    </Container>
  );
}
