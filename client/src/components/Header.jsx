// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
// import MenuItem from "@mui/material/MenuItem";
// import { Avatar } from "@mui/material";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../AuthContext";
// import { useContext } from "react";
// import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
// import { useRef } from "react";

// const pages = ["Home", "Create Blog", "Sign Up", "Login"];
// const loggedInPages = ["Home", "Create Blog", "Logout"];
// const Header = () => {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [isNavExpand, setIsNavExpand] = React.useState(false);
//   const [isLoggedIn, setIsLoggedIn] = React.useState(false);
//   const { isLogged, logout } = useContext(AuthContext);
//   const navButton = useRef(null);
//   React.useEffect(() => {
//     // const authToken = localStorage.getItem("authToken");
//     // if (authToken) {
//     //   setIsLoggedIn(true);
//     // }
//     setIsLoggedIn(isLogged);
//   }, [isLogged]);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleExpandNav = (e) => {
//     setIsNavExpand((prev) => !prev);
//     console.log(e);
//     console.log(navButton);

//     // console.log("clicked");
//   };

//   React.useEffect(() => {
//     const classListAdd = "w-24 transition-all duration-500 ease-in-out";
//     const classListArr = classListAdd.split(" ");
//     classListArr.map((el) => {
//       navButton.current.classList.add(`${el}`);
//     });
//     // navButton.current.classList.add();
//   }, [isNavExpand]);

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };
//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     // <AppBar position="static">
//     //   <Container
//     //     maxWidth="xl"
//     //     sx={{ backgroundColor: "#B7AC44", color: "black" }}
//     //   >
//     //     <Toolbar disableGutters>
//     //       <Typography
//     //         variant="h6"
//     //         noWrap
//     //         component="a"
//     //         href="#"
//     //         sx={{
//     //           mr: 2,
//     //           display: { xs: "none", md: "flex" },
//     //           fontFamily: "monospace",
//     //           fontWeight: 700,
//     //           letterSpacing: ".3rem",
//     //           color: "inherit",
//     //           textDecoration: "none",
//     //         }}
//     //       >
//     //         LOGO
//     //       </Typography>

//     //       <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//     //         <IconButton
//     //           size="large"
//     //           aria-label="account of current user"
//     //           aria-controls="menu-appbar"
//     //           aria-haspopup="true"
//     //           onClick={handleOpenNavMenu}
//     //           color="inherit"
//     //         >
//     //           <MenuIcon />
//     //         </IconButton>
//     //         <Menu
//     //           id="menu-appbar"
//     //           anchorEl={anchorElNav}
//     //           anchorOrigin={{
//     //             vertical: "bottom",
//     //             horizontal: "left",
//     //           }}
//     //           keepMounted
//     //           transformOrigin={{
//     //             vertical: "top",
//     //             horizontal: "left",
//     //           }}
//     //           open={Boolean(anchorElNav)}
//     //           onClose={handleCloseNavMenu}
//     //           sx={{ display: { xs: "block", md: "none" } }}
//     //         >
//     //           {pages.map((page) => (
//     //             <MenuItem key={page} onClick={handleCloseNavMenu}>
//     //               <Typography sx={{ textAlign: "center" }}>
//     //                 <Link
//     //                   to={`/${page.toLowerCase()}`}
//     //                   className="text-black no-underline"
//     //                 >
//     //                   {page}
//     //                 </Link>
//     //               </Typography>
//     //             </MenuItem>
//     //           ))}
//     //         </Menu>
//     //       </Box>

//     //       <Typography
//     //         variant="h5"
//     //         noWrap
//     //         component="a"
//     //         href="#"
//     //         sx={{
//     //           mr: 2,
//     //           display: { xs: "flex", md: "none" },
//     //           flexGrow: 1,
//     //           fontFamily: "monospace",
//     //           fontWeight: 700,
//     //           letterSpacing: ".3rem",
//     //           color: "inherit",
//     //           textDecoration: "none",
//     //         }}
//     //       >
//     //         LOGO
//     //       </Typography>

//     //       <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//     //         <Button
//     //           onClick={handleCloseNavMenu}
//     //           sx={{ my: 2, color: "white", display: "block" }}
//     //         >
//     //           <Link to={"/home"} className="text-white no-underline">
//     //             home
//     //           </Link>
//     //         </Button>
//     //         <Button
//     //           onClick={handleCloseNavMenu}
//     //           sx={{ my: 2, color: "white", display: "block" }}
//     //         >
//     //           <Link to={"/post/create"} className="text-white no-underline">
//     //             Create Blog
//     //           </Link>
//     //         </Button>
//     //         {!isLoggedIn && (
//     //           <Button
//     //             onClick={handleCloseNavMenu}
//     //             sx={{ my: 2, color: "white", display: "block" }}
//     //           >
//     //             <Link to={"/user/register"} className="text-white no-underline">
//     //               Sign Up
//     //             </Link>
//     //           </Button>
//     //         )}
//     //         {isLoggedIn ? (
//     //           <Button
//     //             onClick={handleCloseNavMenu}
//     //             sx={{ my: 2, color: "white", display: "block" }}
//     //           >
//     //             <Link
//     //               to={"/home"}
//     //               className="text-white no-underline"
//     //               onClick={handleLogout}
//     //             >
//     //               Logout
//     //             </Link>
//     //           </Button>
//     //         ) : (
//     //           <Button
//     //             onClick={handleCloseNavMenu}
//     //             sx={{ my: 2, color: "white", display: "block" }}
//     //           >
//     //             <Link to={"/login"} className="text-white no-underline">
//     //               Login
//     //             </Link>
//     //           </Button>
//     //         )}
//     //       </Box>
//     //       {localStorage.getItem("name") && (
//     //         <Box
//     //           sx={{ flexGrow: 1 }}
//     //           className="flex justify-end align-baseline"
//     //         >
//     //           <Typography
//     //             className="font-bold text-white mx-4"
//     //             sx={{
//     //               display: "flex",
//     //               alignItems: "center",
//     //               margin: "0 1rem 0 auto",
//     //             }}
//     //           >
//     //             {" "}
//     //             Welcome! &nbsp;
//     //             {localStorage.getItem("name")}
//     //           </Typography>
//     //           <Avatar
//     //             alt={`${localStorage.getItem("name")}`}
//     //             src={`${localStorage.getItem("profileImg")}`}
//     //           />
//     //         </Box>
//     //       )}
//     //     </Toolbar>
//     //   </Container>
//     // </AppBar>
//     <header>
//       <div
//         className="fixed top-4 right-4 text-[#21decb] z-50 h-12 w-12 rounded-full cursor-pointer"
//         onClick={handleExpandNav}
//       >
//         <div
//           className="h-full w-full bg-white opacity-70 rounded-full relative flex justify-center items-center hover:opacity-100 transition-opacity duration-500 ease-in-out custom-expl"
//           ref={navButton}
//         >
//           <ArrowBackIosRoundedIcon />
//           {/* {isNavExpand && (
//             <div className="absolute top-0 left-0 h-12 w-40 bg-white -translate-x-40 transition-all delay-500 ease-in-out transform">
//               nav opened
//             </div>
//           )} */}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import * as React from "react";
import { useRef, useState, useEffect } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Button } from "@mui/material";

const Header = () => {
  const [isNavExpand, setIsNavExpand] = useState(true);
  const navButton = useRef(null);

  const handleExpandNav = (e) => {
    console.log("clikcedddddddddd");
    e.stopPropagation();
    setIsNavExpand((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (navButton.current && !navButton.current.contains(event.target)) {
      console.log("outside...........");
      setIsNavExpand(false);
    }
  };
  useEffect(() => {
    const id = setTimeout(() => {
      setIsNavExpand(false);
    }, 10000);
    return () => clearTimeout(id);
  }, [isNavExpand]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header>
      {/* <div className="h-[80vh] w-[100vw] relative"> */}
      <div className="fixed top-0 left-0 h-[100vh] w-12 items-center justify-evenly outline-dotted outline-white outline-1 bg-gray-950 flex flex-col text-white text-3xl z-50">
        <span>
          <i class="fa-brands fa-square-facebook"></i>
        </span>
        <span>
          <i class="fa-brands fa-square-instagram"></i>
        </span>
        <span>
          <i class="fa-brands fa-square-x-twitter"></i>
        </span>
      </div>
      <div className="fixed top-4 right-4 text-[#21decb] z-50 h-12 w-12 rounded-full cursor-pointer ">
        <div
          ref={navButton}
          onClick={handleExpandNav}
          className={`h-full bg-white rounded-xl relative flex items-center hover:opacity-100 transition-all duration-700 ease-in-out outline outline-[#21decb]
           ${isNavExpand ? " custom-radius" : "hover:rounded-xl"}        
           
          `}
        >
          <div
            className={`absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2  transition-all duration-500 ease-in-out
           ${isNavExpand ? "rotate-0" : "rotate-45"}        

            `}
          >
            <i className="fa-solid fa-bars"></i>
          </div>

          <div
            className={`absolute w-72 -left-2 h-auto rounded-2xl flex items-center  bg-slate-50 shadow-lg transition-all duration-500 ease-in ${
              isNavExpand ? "opacity-100 -translate-x-72" : "opacity-0 "
            }`}
          >
            <ul className=" flex flex-row items-center justify-evenly w-full py-3 px-2 font-bold">
              <li className="custom-nav-link-hover">Create Blog</li>
              <li className="custom-nav-link-hover">Sign Up</li>
              <li>
                <Button
                  variant="contained"
                  size="sm"
                  style={{ backgroundColor: "#218891" }}
                >
                  Login
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* </div> */}
    </header>
  );
};

export default Header;
