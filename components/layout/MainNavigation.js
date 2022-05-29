import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import classes from "./MainNavigation.module.css";
import { Navbar, NavDropdown, Button, Nav } from "react-bootstrap";
import { signOut } from "next-auth/client";
import { useStore } from "../../context";
import { getValue } from "../../utils/common";
import { authConstants } from "../../context/constants";
import { useRef } from "react";
import NavbarButton from "./layoutComponents/navbarButton";

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
      <Navbar bg="white" variant={"light"} expand="lg">
        <Container style={{ maxWidth: "1900px", width: "95%" }}>
          <Link href="/">
            <img
              className={classes.logo}
              src="/navbar/Xtreme Tracking Transparent.png"
            />
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <form
              className="d-flex"
              style={{ marginRight: "20px" }}
              onSubmit={handleSearch}
            >
              <input
                type="search"
                placeholder="Search User"
                className="me-2 "
                aria-label="Search"
                ref={searchInputRef}
              />
              {<button>Search</button>}
            </form>
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Row style={{ width: "150%" }}>
                <Col xs={12} lg={3}>
                  <NavbarButton link="/" imgsrc="/icons/home.png" text="Home" />
                </Col>
                <Col xs={12} lg={3}>
                  <NavbarButton
                    link="/social"
                    imgsrc="/icons/home.png"
                    text="Social"
                  />
                </Col>
                <Col xs={12} lg={3}>
                  <NavbarButton
                    link="/tracking"
                    imgsrc="/icons/home.png"
                    text="Tracking"
                  />
                </Col>
                <Col xs={12} lg={3}>
                  <NavbarButton
                    link="/"
                    imgsrc="/icons/home.png"
                    text="Contact Us"
                  />
                </Col>
              </Row>
            </Nav>
            <div style={{ marginLeft: "50px" }}>
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
                      className={classes.signOutButton}
                      onClick={() => {
                        signOut({ redirect: false }).then((result) => {
                          dispatch({ type: authConstants.LOGIN_FAILURE });
                          router.replace("/");
                        });
                      }}
                    >
                      Sign Out
                    </Button>
                  </NavDropdown>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MainNavigation;
