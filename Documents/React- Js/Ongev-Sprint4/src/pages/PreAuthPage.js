import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/user-context";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CreateIcon from "@material-ui/icons/Create";
import SearchIcon from "@material-ui/icons/Search";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import BarChartIcon from "@material-ui/icons/BarChart";
import HistoryIcon from "@material-ui/icons/History";
import SchoolIcon from "@material-ui/icons/School";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import theme from "../theme/Ongev";
import axios from "../utils/axios";
import PageCompany from "./PageCompany";

const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            width: "100%",
        },
        titleHeader: {
            width: "100%",
            backgroundColor: theme.palette.primary.pale,
            height: "425px",
        },
        titleImage: {
            height: "auto",
            width: "17.5rem",
            "&:hover": {
                cursor: "pointer",
            },
            [theme.breakpoints.down("xs")]: {
                width: "12rem",
            },
        },
        titleContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "75%",
            margin: "auto",
            height: "175px",
            paddingTop: theme.spacing(3),
        },
        content: {
            marginTop: "-300px",
        },
        footer: {
            textAlign: "center",
            marginBottom: theme.spacing(6),
            marginTop: theme.spacing(10),
        },
        copyrightText: {
            fontSize: "12px",
            lineHeight: "14px",
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
        menuButton: {
            fontSize: "60px",
            padding: 0,
            height: "fit-content",
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
    }));

const PreAuthPage = ({ children, pageTitle, onBackClick, isLoading }) => {
    const classes = useStyles();
    const history = useHistory();
    const [profile, dispatch] = useContext(UserContext);
    const logo = (
        <img
    className={classes.titleImage}
    onClick={() => history.push("/dashboard")}
    src={"/logos/ongev_L_clr.png"}
    alt={"Ongev Logo"}
        />
);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const drawerAnchor = "left";

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch({ type: "logout", payload: {} });
        handleClose();
    };

    useEffect(() => {
        if (profile.code && !profile.logoURL) {
        axios
            .get(
                process.env.REACT_APP_ONGEV_API_BASEURL +
                "/api/" +
                process.env.REACT_APP_ONGEV_API_VERSION +
                "/employer/" +
                profile.code
            )
            .then((resp) => {
            dispatch({
                type: "set logo url",
                payload: { logoURL: resp.data.employer.logo },
    });
    })
    .catch((error) => {
            console.log(error);
    });
    }
});

    if (profile.code) {
        return <PageCompany logoUrl={profile.logoURL}>{children}</PageCompany>;
    }
    console.log("Profile onboarded:", profile.onboarded);
    console.log("Profile PreAuth:", profile);
    return (
        <div className={classes.root}>
<div className={classes.titleHeader}>
<div className={classes.titleContainer}>
<React.Fragment key={drawerAnchor}>
    {profile.firstName ? (
    <IconButton onClick={handleMenu} className={classes.menuButton}>
<MenuIcon
    edge={"start"}
    className={classes.menuIcon}
    aria-label={"menu"}
        />
        </IconButton>
) : (
    <div />
)}
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

    {/* fixed jira:-187 {profile.onboarded === undefined ? (
     <>
     {profile.networks.length > 0 ? <div>show all menu</div> : <div>less menu</div>}
     </>
     ) : null } */}
    {profile.onboarded === undefined || profile.onboarded === null ? null : (
    <>
    {profile.networks.length>0 ? (
    <>
    <div className={classes.menuMid}>
    <MenuItem
        onClick={() => history.push("/account/update")}
        className={classes.menuItem}
    >
    <CreateIcon className={classes.menuItemIcon} /> Your
        Account
        </MenuItem>
        <MenuItem
        onClick={() => history.push("/health/details")}
        className={classes.menuItem}
    >
    <LocalHospitalIcon className={classes.menuItemIcon} />{" "}
        Your Health Details
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
        History
        </MenuItem>
        <MenuItem
        onClick={() => history.push("/trial/treatment-search")}
        className={classes.menuItem}
    >
    <SearchIcon className={classes.menuItemIcon} /> Search
        Clinical Trials
    </MenuItem>
    {/* <MenuItem className={classes.menuItem}><BookmarkIcon className={classes.menuItemIcon}/> Saved Trials</MenuItem> */}
    <MenuItem
        onClick={() => history.push("/diagnosis/information")}
        className={classes.menuItem}
    >
    <SchoolIcon className={classes.menuItemIcon} /> Learn
        About Diagnosis
    </MenuItem>
    </div>
    </>
    ) :(
    <div>
    <div className={classes.menuMid}>
    <MenuItem
        onClick={() => history.push("/account/update")}
        className={classes.menuItem}
    >
    <CreateIcon className={classes.menuItemIcon} /> Your
        Account
        </MenuItem>
        <MenuItem
        onClick={() => history.push("/health/details")}
        className={classes.menuItem}
    >
    <LocalHospitalIcon className={classes.menuItemIcon} />{" "}
        Your Health Details
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
    <SchoolIcon className={classes.menuItemIcon} /> Learn
        About Diagnosis
    </MenuItem>
    </div>
    </div>
    )}
    </>
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
    noWrap
    >
    {logo}
    </Typography>
    <div></div>
    </div>
    </div>
    <main className={classes.content}>{children}</main>
    <div className={classes.footer}>
<Typography variant={"body1"} className={classes.copyrightText}>
    Ongev is a registered trademark of Ongev, Inc. ©2020 Ongev Inc.
    </Typography>
    </div>
    </div>
);
};

export default PreAuthPage;