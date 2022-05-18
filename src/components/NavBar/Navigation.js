import { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

import logo from "../../../../public/gp-color-logo.png";
import { AuthContext } from "../../../store/auth-context";

import classes from "./Navbar.module.scss";
import AuthNavbar from "./AuthNavbar";

const Navigation = (props) => {
  const authCtx = useContext(AuthContext);
  let history = useHistory();
  const logoutHandler = () => {
    authCtx.logout();
    history.push("/");
  };

  return (
    <Navbar
      bg="primary"
      expand="lg"
      variant="dark"
      className={classes.header__menu}
    >
      <Container>
        <Navbar.Brand className={classes["header__logo-link"]} href="/">
          <img
            src={logo}
            alt="GP Color"
            className={classes["header__logo-img"]}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="top-navbar-nav" />
        <Navbar.Collapse id="top-navbar-nav">
          <Nav className="me-auto">
            {authCtx.user && (
              <AuthNavbar classMenu={classes["header__menu-link"]} />
            )}
            {!authCtx.user && (
              <>
                <NavLink to="/login" className={classes["header__menu-link"]}>
                  SIGN IN
                </NavLink>
                <NavLink
                  to="/register"
                  className={classes["header__menu-link"]}
                >
                  SIGN UP
                </NavLink>
              </>
            )}
            <NavLink to="/search" className={classes["header__menu-link"]}>
              SEARCH
            </NavLink>
            {authCtx.user && (
              <Button
                size="small"
                style={{
                  color: "#fff",
                  fontSize: "1.4rem",
                  marginRight: "10px",
                }}
                onClick={logoutHandler}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
