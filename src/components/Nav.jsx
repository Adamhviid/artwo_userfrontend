import React, { useEffect, useState } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    Drawer,
    List,
    ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

import lognobackground from "../images/ARTWOlogoNoBackgroundNoCenterholeV2.png";

const Nav = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [logginedIn, setLogginedIn] = useState(false);
    const { state, logout } = useAuth();

    const settings = [
        { label: "Mine posts", url: "profile/posts" },
        { label: "Profil", url: state.user.username },
    ];
    const pages = [
        { label: "Brugere", url: "/users" },
        
        { label: "Søgning", url: "/search" },
    ];

    const navigate = useNavigate();

    useEffect(() => {
        if (state.user) {
            setLogginedIn(true);
        }
    }, [state.user]);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        logout();
        setLogginedIn(false);
        navigate("/");
    };

    const drawer = (
        <div style={{ backgroundColor: "rgb(97, 180, 76)", height: "100%" }}>
            <List>
                {pages.map((page) => (
                    <ListItem key={page.label}>
                        <Link
                            to={page.url}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Button
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page.label}
                            </Button>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <AppBar sx={{ backgroundColor: "rgb(97, 180, 76)" }}>
            <Container maxWidth="xl">
                <Toolbar
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <img
                            className="logo"
                            src={lognobackground}
                            alt="Logo"
                            style={{
                                height: "50px",
                                marginTop: "5px",
                                cursor: "pointer",
                            }}
                        />
                    </Link>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Link
                                key={page.url}
                                to={page.url}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <Button
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    {page.label}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <div style={{ float: "right" }}>
                        {logginedIn ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar alt="Remy Sharp" src="" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <Link
                                            key={setting.url}
                                            to={setting.url}
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                        >
                                            <MenuItem
                                                key={setting}
                                                onClick={handleCloseUserMenu}
                                            >
                                                <Typography textAlign="center">
                                                    {setting.label}
                                                </Typography>
                                            </MenuItem>
                                        </Link>
                                    ))}
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center">
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <Button
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </Toolbar>
            </Container>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};
export default Nav;
