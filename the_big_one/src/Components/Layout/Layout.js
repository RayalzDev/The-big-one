import { Container } from "react-bootstrap";
import Navbar from "../Navbar";
import Footer from "../Footer"
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Container fluid>
      <Navbar />
      <Outlet />
    </Container>
  );
}
