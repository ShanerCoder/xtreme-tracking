import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import classes from "./MainNavigation.module.css";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { signOut } from "next-auth/client";
import { useStore } from "../../context";
import { getValue } from "../../utils/common";
import { authConstants } from "../../context/constants";
import { useRef, useState, useEffect } from "react";
import NavbarButton from "./layoutComponents/navbarButton";
import UserIcon from "../ui/UserIcon";
import Collapse from "react-bootstrap";

function MainNavigation(props) {
  var [toggle, setToggle] = useState(false);
  const [state, dispatch] = useStore();
  const user = getValue(state, ["user"], null);
  const authenticated = getValue(state, ["user", "authenticated"], false);
  const searchInputRef = useRef();
  const router = useRouter();

  async function handleLoader(URL) {
    props.showLoader();
    await router.replace(URL);
    props.hideLoader();
  }

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
          <img
            className={classes.logo}
            src="/navbar/Xtreme Tracking Transparent.png"
            onClick={() => {
              handleLoader("/");
            }}
          />

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <img
              className={classes.icon}
              src="/icons/magnifyingGlass.png"
              onClick={() => {
                setToggle(!toggle);
                console.log(toggle);
              }}
            />
            {toggle && (
              <form
                className={"d-flex " + classes.searchForm}
                onSubmit={handleSearch}
              >
                <input
                  type="search"
                  placeholder="Search User"
                  className={"me-2 " + classes.searchUserText}
                  aria-label="Search"
                  ref={searchInputRef}
                />
                {<button>Search</button>}
              </form>
            )}

            <Nav
              className={"mr-auto my-2 my-lg-0 " + classes.navigationIcons}
              navbarScroll
            >
              <Row style={{ width: "150%" }}>
                <Col xs={12} lg={3}>
                  <NavbarButton
                    handleLoader={handleLoader}
                    link="/"
                    imgsrc="/icons/home.png"
                    text="Home"
                  />
                </Col>
                <Col xs={12} lg={3}>
                  <NavbarButton
                    handleLoader={handleLoader}
                    link="/social"
                    imgsrc="/icons/speechBubble.png"
                    text="Social"
                  />
                </Col>
                <Col xs={12} lg={3}>
                  <NavbarButton
                    handleLoader={handleLoader}
                    link="/tracking"
                    imgsrc="/icons/dumbbell.png"
                    text="Tracking"
                  />
                </Col>
                <Col xs={12} lg={3}>
                  <NavbarButton
                    handleLoader={handleLoader}
                    link="/contactUs"
                    imgsrc="/icons/human.png"
                    text="Contact Us"
                  />
                </Col>
              </Row>
            </Nav>
            <div className={classes.settingsFormatting}>
              {!authenticated ? (
                <NavDropdown
                  title={
                    <span>
                      <i className="fad fa-newspaper"></i> Sign In
                    </span>
                  }
                  className={classes.accountOptionsFormatting}
                  id="collasible-nav-dropdown"
                >
                  <div
                    onClick={() => {
                      handleLoader("/login");
                    }}
                  >
                    <p className={classes.dropdownLink}>Existing Account</p>
                  </div>
                  <div
                    onClick={() => {
                      handleLoader("/register");
                    }}
                  >
                    <p className={classes.dropdownLink}>New Account</p>
                  </div>
                </NavDropdown>
              ) : (
                <>
                  <Row>
                    <Col xs={3} lg={3} className={classes.userIconFormatting}>
                      <UserIcon username={user.username} navigation={true} />
                    </Col>
                    <Col xs={9} lg={9}>
                      <NavDropdown
                        title={
                          <span>
                            <i className="fad fa-newspaper"></i> {user.username}
                          </span>
                        }
                        className={classes.accountOptionsFormatting}
                        id="collasible-nav-dropdown"
                      >
                        <div
                          onClick={() => {
                            handleLoader("/userProfile/" + user.username);
                          }}
                        >
                          <p className={classes.dropdownLink}>View Profile</p>
                        </div>
                        <div
                          onClick={() => {
                            handleLoader("/viewMessages");
                          }}
                        >
                          <p className={classes.dropdownLink}>View Messages</p>
                        </div>
                        <button
                          className={classes.signOutButton}
                          onClick={() => {
                            signOut({ redirect: false }).then((result) => {
                              dispatch({ type: authConstants.LOGIN_FAILURE });
                              router.replace("/");
                            });
                          }}
                        >
                          Sign Out
                        </button>
                      </NavDropdown>
                    </Col>
                  </Row>
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
