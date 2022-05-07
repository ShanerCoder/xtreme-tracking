import Link from "next/link";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";
import classes from "./MainNavigation.module.css";
import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import {
  checkIfUserIsAuthenticated,
  signUserOut,
} from "../../context/stateSession";
import { signOut } from "next-auth/client";
import { useStore } from "../../context";
import { getValue } from "../../utils/common";
import { authConstants } from "../../context/constants";

function MainNavigation(props) {
  const [state, dispatch] = useStore();
  const user = getValue(state, ["user"], null);
  const authenticated = getValue(state, ["user", "authenticated"], false);
  const router = useRouter();
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
              <Link href="/updates">
                <p className={classes.link}>Updates</p>
              </Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              {
                //<Button variant="outline-success">Search</Button>
              }
            </Form>
            {!authenticated ? (
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
            ) : (
              <>
                <Link href={"/userProfile/" + user.username}>
                  <p className={classes.link}>View Profile</p>
                </Link>
                <Button
                  variant="outline-success"
                  onClick={() => {
                    signOut({ redirect: false }).then((result) => {
                      dispatch({ type: authConstants.LOGIN_FAILURE });
                      router.replace("/");
                    });
                  }}
                >
                  Sign Out
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MainNavigation;
