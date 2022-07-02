import { Container } from "react-bootstrap";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Container fluid>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </Container>
  );
}
