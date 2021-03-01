import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        appBar: {
            backgroundColor: theme.palette.primary.darkest,
            minHeight: '200px',
            width: '100vw',
            justifyContent: 'center',
        },
        content: {
            margin: 'auto',
            width: '90%',
            paddingTop: '60px',
            color: theme.palette.primary.light,
            maxWidth: '75rem',
        },
        links: {
            display: 'flex',
            flexDirection: 'row',
            fontSize: '18px',
            marginBottom: theme.spacing(1),
            maxWidth: '100%',
            '@media (max-width: 500px)': {
                flexDirection: 'column',
                marginBottom: theme.spacing(2),
            }
        },
        subSection: {
            display: 'flex',
            flexDirection: 'row',
        },
        linkText: {
            marginRight: theme.spacing(1),
            borderBottomStyle: 'solid',
            borderColor: theme.palette.primary.dark,
            borderWidth: '2px',
            '&:hover': {
                cursor: 'pointer',
            },
        },
        dot: {
            marginRight: theme.spacing(1),
        },
        middledot: {
            marginRight: theme.spacing(1),
            '@media (max-width: 500px)': {
                display: 'none',
            }
        },
        info: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: '16px',
            marginBottom: theme.spacing(3),
            maxWidth: '100%'
        },
        infoText: {
            marginRight: theme.spacing(1),
            color: theme.palette.primary.light,
            textDecoration: 'none',
        },
        copyrightText: {
            color: theme.palette.primary.contrastText,
            fontSize: '12px',
            lineHeight: '14px',
        }
    }))

const Footer = () => {
    const classes = useStyles();
    const history = useHistory()

    return (
        <div className={classes.appBar} elevation={0}>
        <div className={classes.content}>
<div className={classes.links}>
<div className={classes.subSection}>
<Typography variant={'h6'} className={classes.linkText} onClick={() => history.push('/home')}>
    Home
    </Typography>
    <span className={classes.dot}>&#8226;</span>
    <Typography variant={'h6'} className={classes.linkText} onClick={() => history.push('/account/update')}>
    Your Account
    </Typography>
    <span className={classes.dot}>&#8226;</span>
    <Typography variant={'h6'} className={classes.linkText} onClick={() => history.push('/health/details')}>
    Your Health Details
    </Typography>
    <span className={classes.middledot}>&#8226;</span>
    </div>

    <div className={classes.subSection}>
<Typography variant={'h6'} className={classes.linkText} onClick={() => history.push('/trial/treatment-search')}>
    Clinical Trial Search
    </Typography>
    <span className={classes.dot}>&#8226;</span>
    <Typography variant={'h6'} className={classes.linkText} onClick={() => history.push('/health-timeline')}>
    Health Journey
    </Typography>
    <span className={classes.dot}>&#8226;</span>
    <Typography variant={'h6'} className={classes.linkText} onClick={() => history.push('/diagnosis/information')}>
    Diagnosis Information
    </Typography>
    </div>


    </div>

    <div className={classes.info}>
<Typography variant={'body1'} className={classes.infoText} >
    Contact Us
    </Typography>
    <span className={classes.dot}>&#8226;</span>
    <Typography variant={'body1'} className={classes.infoText}>
<a href='https://www.ongev.com/privacy-policy/' className={classes.infoText} rel="noopener noreferrer" target="_blank">Privacy Policy</a>
    </Typography>
    <span className={classes.dot}>&#8226;</span>
    <Typography variant={'body1'} className={classes.infoText}>
<a href='https://www.ongev.com/terms/' className={classes.infoText} rel="noopener noreferrer" target="_blank">Terms & Conditions</a>
        </Typography>
        </div>

        <div className={classes.copyright}>
<Typography variant={'body1'} className={classes.copyrightText}>
    Ongev is a registered trademark of Ongev, Inc. ©2020 Ongev Inc.
    </Typography>
    </div>
    </div>
    </div>
)
}

export default Footer