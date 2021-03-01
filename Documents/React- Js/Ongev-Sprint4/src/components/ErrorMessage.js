import React from "react";
import { makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    error: {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.dark,
    },
    errorIcon: {
        color: theme.palette.error.main,
        fontSize: '40px',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    paper: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: 'auto',
        marginBottom: theme.spacing(5),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    primary: {
        backgroundColor: theme.palette.primary.pale,
        color: theme.palette.primary.dark,
    },
    primaryIcon: {
        color: theme.palette.primary.main,
        fontSize: '40px',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    errorText: {
        // width: '80%'
        fontSize: '16px',
        marginLeft: theme.spacing(2),
    },
    linkText: {
        textDecoration: 'underline',
        fontWeight: 600,
        '&:hover': {
            cursor: 'pointer',
        },
    }
}))

const ErrorMessage = ({errors, handleClose, color='error', handleLink, icon}) => {
    const classes = useStyles();

    const error = ({message, linkText } ) => {
        return (
            <Paper elevation={1} className={clsx(classes.paper, classes[color])}>
                {icon ? 
                <InfoIcon className={color === 'primary' ? classes.primaryIcon : color === 'secondary' ? classes.secondaryIcon : classes.errorIcon}/>
                : null
            }
                <Typography component={"h6"} variant={'body1'} className={classes.errorText}>
                    {message} {linkText ? <span className={classes.linkText} onClick={handleLink}>{linkText}</span>: null}
                </Typography>
                <CloseIcon className={clsx(classes.errorIcon, classes[color])} onClick={handleClose}/>
            </Paper>
        )
    }

    if (errors) {
        return (
            error(errors)
        )
    } else {
        return null
    }
}

export default ErrorMessage