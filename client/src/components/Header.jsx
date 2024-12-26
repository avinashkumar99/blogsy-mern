import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

const pages = ["Home", "Create Blog", "Sign Up", "Login"];
const loggedInPages = ["Home", "Create Blog", "Logout"];
const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { isLogged, logout } = useContext(AuthContext);
  React.useEffect(() => {
    // const authToken = localStorage.getItem("authToken");
    // if (authToken) {
    //   setIsLoggedIn(true);
    // }
    setIsLoggedIn(isLogged);
  }, [isLogged]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleLogout = () => {
    // localStorage.removeItem("authToken");
    // localStorage.removeItem("name");

    // localStorage.removeItem("profileImg");

    logout();
    // setIsLoggedIn(false);
  };

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "#B7AC44", color: "black" }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    <Link
                      to={`/${page.toLowerCase()}`}
                      className="text-black no-underline"
                    >
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to={"/home"} className="text-white no-underline">
                home
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to={"/post/create"} className="text-white no-underline">
                Create Blog
              </Link>
            </Button>
            {!isLoggedIn && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to={"/user/register"} className="text-white no-underline">
                  Sign Up
                </Link>
              </Button>
            )}
            {isLoggedIn ? (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  to={"/home"}
                  className="text-white no-underline"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </Button>
            ) : (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to={"/login"} className="text-white no-underline">
                  Login
                </Link>
              </Button>
            )}
          </Box>
          {localStorage.getItem("name") && (
            <Box
              sx={{ flexGrow: 1 }}
              className="flex justify-end align-baseline"
            >
              <Typography
                className="font-bold text-white mx-4"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 1rem 0 auto",
                }}
              >
                {" "}
                Welcome! &nbsp;
                {localStorage.getItem("name")}
              </Typography>
              <Avatar
                alt={`${localStorage.getItem("name")}`}
                src={`${localStorage.getItem("profileImg")}`}
              />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
