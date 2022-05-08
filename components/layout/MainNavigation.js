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
import { signOut } from "next-auth/client";
import { useStore } from "../../context";
import { getValue } from "../../utils/common";
import { authConstants } from "../../context/constants";
import { useRef } from "react";

function MainNavigation(props) {
  const [state, dispatch] = useStore();
  const user = getValue(state, ["user"], null);
  const authenticated = getValue(state, ["user", "authenticated"], false);
  const searchInputRef = useRef();
  const router = useRouter();

  function handleSearch(event) {
    event.preventDefault();
    const userToSearch = searchInputRef.current.value;
    router.push("/userProfile/" + userToSearch);
    searchInputRef.current.value = null;
  }

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
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="Search User"
                className="me-2"
                aria-label="Search"
                ref={searchInputRef}
              />
              {<button variant="outline-success">Search</button>}
            </form>
            {!authenticated ? (
              <NavDropdown
                title={
                  <span>
                    <i className="fad fa-newspaper"></i> Sign In
                  </span>
                }
                id="collasible-nav-dropdown"
              >
                <Link href="/login">
                  <p className={classes.dropdownLink}>Existing Account</p>
                </Link>
                <Link href="/register">
                  <p className={classes.dropdownLink}>New Account</p>
                </Link>
              </NavDropdown>
            ) : (
              <>
                <NavDropdown
                  title={
                    <span>
                      <i className="fad fa-newspaper"></i> Account Options
                    </span>
                  }
                  id="collasible-nav-dropdown"
                >
                  <Link href={"/userProfile/" + user.username}>
                    <p className={classes.dropdownLink}>View Profile</p>
                  </Link>
                  <Link href="/viewMessages">
                    <p className={classes.dropdownLink}>View Messages</p>
                  </Link>
                  <Button
                    variant="outline-danger"
                    className={classes.signOutButton}
                    onClick={() => {
                      signOut({ redirect: false }).then((result) => {
                        dispatch({ type: authConstants.LOGIN_FAILURE });
                        //router.replace("/");
                      });
                    }}
                  >
                    Sign Out
                  </Button>
                </NavDropdown>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MainNavigation;
