import Link from "next/link";
import { Container } from "react-bootstrap";
import classes from "./MainNavigation.module.css";
import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";

function MainNavigation() {
  return (
    <div>
      <Navbar bg="light" variant={"light"} expand="lg">
        <Container>
          <Navbar.Brand>
            <Link href="/">
              <p className={classes.link}>Xtreme Tracking</p>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link href="/">
                <p className={classes.link}>Home</p>
              </Link>
              <Link href="/social">
                <p className={classes.link}>Social</p>
              </Link>
              <Link href="/">
                <p className={classes.link}>Tracking</p>
              </Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <NavDropdown
              title={
                <span>
                  <i className="fad fa-newspaper"></i> Profile
                </span>
              }
              id="collasible-nav-dropdown"
            >
              <Link href="/login">
                <p className={classes.dropdownLink}>Log In</p>
              </Link>
              <Link href="/register">
                <p className={classes.dropdownLink}>Register</p>
              </Link>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MainNavigation;
