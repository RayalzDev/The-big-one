import { Container } from "react-bootstrap";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";


export default function Layout() {
 
  return (
    <Container fluid className="p-0 bg-secondary ">
      <Navbar />
      <Outlet />
    </Container>
  );
}
