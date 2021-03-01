import React, { useContext, useState } from "react";
import UserContext from "../context/user-context";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CreateIcon from "@material-ui/icons/Create";
import SearchIcon from "@material-ui/icons/Search";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import BarChartIcon from "@material-ui/icons/BarChart";
import HistoryIcon from "@material-ui/icons/History";
// import BookmarkIcon from '@material-ui/icons/Bookmark';
import SchoolIcon from "@material-ui/icons/School";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import theme from "../theme/Ongev";

const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        appBar: {
            backgroundColor: theme.palette.primary.pale,
            height: "150px",
            justifyContent: "center",
            // alignItems: 'center',
        },
        toolBar: {
            margin: "auto",
            maxWidth: "75rem",
            width: "90%",
        },
        menuButton: {
            fontSize: "60px",
            padding: 0,
            textAlign: "center",
            // marginLeft: theme.spacing(11),
            "@media (max-width: 1100px)": {
                fontSize: "40px",
            },
            "@media (max-width: 600px)": {
                fontSize: "32px",
            },
        },
        menuIcon: {
            fontSize: "60px",
            color: theme.palette.primary.dark,
        },
        title: {
            // flexGrow: 1,
            textAlign: "center",
            // height: '100%',
            width: "100%",
            // marginLeft: theme.spacing(-20),
            "@media (max-width: 1100px)": {
                marginLeft: theme.spacing(1),
            },
        },
        logo: {
            width: "200px",
            marginLeft: "-60px",
            "&:hover": {
                cursor: "pointer",
            },
        },
        content: {
            flex: 1,
            overflow: "auto",
        },
        menu: {},
        menuAvatar: {
            marginBottom: theme.spacing(2),
            height: "80px",
            width: "80px",
            color: theme.palette.primary.dark,
        },
        avatarIcon: {
            backgroundColor: "white",
            height: "100%",
            width: "100%",
        },
        menuTop: {
            marginTop: theme.spacing(2),
            paddingLeft: theme.spacing(4),
            paddingBottom: theme.spacing(2),
            borderBottomStyle: "solid",
            borderBottomWidth: "1px",
            borderBottomColor: theme.palette.grey.light,
        },
        menuMid: {
            marginTop: theme.spacing(4),
            paddingLeft: theme.spacing(4),
            paddingBottom: theme.spacing(2),
            borderBottomStyle: "solid",
            borderBottomWidth: "1px",
            borderBottomColor: theme.palette.grey.light,
        },
        menuBottom: {
            marginTop: theme.spacing(4),
            paddingLeft: theme.spacing(4),
            paddingBottom: theme.spacing(2),
            borderBottomStyle: "solid",
            borderBottomWidth: "1px",
            borderBottomColor: theme.palette.grey.light,
        },
        menuItemIcon: {
            paddingRight: theme.spacing(2),
        },
        menuItem: {
            fontSize: "18px",
            fontWeight: "400",
            width: "90%",
            color: theme.palette.grey.dark,
            "&:hover": {
                color: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.pale,
            },
        },
        logoutButton: {
            width: "90%",
            textTransform: "none",
            marginLeft: "5%",
            marginTop: theme.spacing(2),
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main,
            fontWeight: 700,
            "&:hover": {
                backgroundColor: theme.palette.error.main,
                color: "white",
                borderColor: "white",
            },
        },
    }));
const Header = () => {
    const classes = useStyles();
    const [profile, dispatch] = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {

        setAnchorEl(event.currentTarget);
    };
    const drawerAnchor = "left";
    const history = useHistory();
    const logo = (
        <img
    src={"/logos/ongev_S_clr.png"}
    alt={"Ongev Logo"}
    onClick={() => history.push("/dashboard")}
    className={classes.logo}
/>
);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch({ type: "logout", payload: {} });
        handleClose();
    };



    return (
        <AppBar
    title={logo}
    position={"static"}
    className={classes.appBar}
    elevation={0}
        >
        <Toolbar className={classes.toolBar} disableGutters={true}>
        <React.Fragment key={drawerAnchor}>
        <IconButton
    title="Menu"
    onClick={handleMenu}
    className={classes.menuButton}
>
<MenuIcon
    edge={"start"}
    className={classes.menuIcon}
    aria-label={"menu"}
        />
        </IconButton>
        {/* <Drawer anchor={drawerAnchor} open={drawerOpen} onClose={toggleDrawer(false)}>
         <DrawerMenu />
         </Drawer> */}
        <Menu
    id="menu-appbar"
    anchorEl={anchorEl}
    anchorOrigin={{
        vertical: "bottom",
            horizontal: "center",
    }}
    keepMounted
    transformOrigin={{
        vertical: "top",
            horizontal: "left",
    }}
    open={open}
    onClose={handleClose}
    PaperProps={{
        style: {
            // height: '78vh',
            width: "23.75rem",
                marginTop: "40px",
                padding: theme.spacing(2),
        },
    }}
>
<div className={classes.menuTop}>
<Avatar className={classes.menuAvatar}>
<AccountCircleIcon className={classes.avatarIcon} />
</Avatar>
    <Typography variant={"h4"}>
    {profile.lastName != undefined
        ? profile.firstName + " " + profile.lastName
        : profile.firstName}
</Typography>
    </div>
    {/* fixed jira:-187 */}
    {profile.networks.length > 0 ? (
    <div>
    <div className={classes.menuMid}>
    <MenuItem
        onClick={() => history.push("/account/update")}
        className={classes.menuItem}
    >
    <CreateIcon className={classes.menuItemIcon} /> Your Account
    </MenuItem>
    <MenuItem
        onClick={() => history.push("/health/details")}
        className={classes.menuItem}
    >
    <LocalHospitalIcon className={classes.menuItemIcon} /> Your
        Health Details
    </MenuItem>
    </div>

    <div className={classes.menuBottom}>
    <MenuItem
        onClick={() => history.push("/dashboard")}
        className={classes.menuItem}
    >
    <BarChartIcon className={classes.menuItemIcon} /> Your
        Dashboard
        </MenuItem>

        <MenuItem
        onClick={() => history.push("/patient/interests/add")}
        className={classes.menuItem}
    >
    <BarChartIcon className={classes.menuItemIcon} /> Health Interest
    </MenuItem>


        <MenuItem
        onClick={() => history.push("/health-timeline")}
        className={classes.menuItem}
    >
    <HistoryIcon className={classes.menuItemIcon} /> Health
        Journey
        </MenuItem>
        <MenuItem
        onClick={() => history.push("/trial/treatment-search")}
        className={classes.menuItem}
    >
    <SearchIcon className={classes.menuItemIcon} /> Search
        Clinical Trials
    </MenuItem>

    <MenuItem
        onClick={() => history.push("/diagnosis/information")}
        className={classes.menuItem}
    >
    <SchoolIcon className={classes.menuItemIcon} /> Learn About
        Diagnosis
        </MenuItem>
        </div>
        </div>
    ) : (
    <div>
    <div className={classes.menuMid}>
    <MenuItem
        onClick={() => history.push("/account/update")}
        className={classes.menuItem}
    >
    <CreateIcon className={classes.menuItemIcon} /> Your Account
    </MenuItem>
    <MenuItem
        onClick={() => history.push("/health/details")}
        className={classes.menuItem}
    >
    <LocalHospitalIcon className={classes.menuItemIcon} /> Your
        Health Details
    </MenuItem>
    </div>

    <div className={classes.menuBottom}>
    <MenuItem
        onClick={() => history.push("/dashboard")}
        className={classes.menuItem}
    >
    <BarChartIcon className={classes.menuItemIcon} /> Your
        Dashboard
        </MenuItem>


        <MenuItem
        onClick={() => history.push("/patient/interests/add")}
        className={classes.menuItem}
    >
    <BarChartIcon className={classes.menuItemIcon} /> Health Interest
    </MenuItem>

        <MenuItem
        onClick={() => history.push("/trial/treatment-search")}
        className={classes.menuItem}
    >
    <SearchIcon className={classes.menuItemIcon} /> Search
        Clinical Trials
    </MenuItem>

    <MenuItem
        onClick={() => history.push("/diagnosis/information")}
        className={classes.menuItem}
    >
    <SchoolIcon className={classes.menuItemIcon} /> Learn About
        Diagnosis
        </MenuItem>

        </div>
        </div>
    )}


<Button
    onClick={handleLogout}
    className={classes.logoutButton}
    fullWidth
    type={"button"}
    variant={"outlined"}
    startIcon={<ExitToAppIcon />}
>
    Log Out
    </Button>
    </Menu>
    </React.Fragment>
    <Typography
    className={classes.title}
    component={"h1"}
    color={"inherit"}
        >
        {logo}
        </Typography>
        </Toolbar>
        </AppBar>
);
};

export default Header;