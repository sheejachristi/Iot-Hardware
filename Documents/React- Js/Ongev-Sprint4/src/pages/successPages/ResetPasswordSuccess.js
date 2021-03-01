import React from 'react'
import {useIntl} from 'react-intl'
import PreAuthPage from '../PreAuthPage'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 'auto',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        color: theme.palette.grey.dark,
        textAlign: 'center',
        [theme.breakpoints.up(620 + theme.spacing(6))]: {
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(4)}px ${theme.spacing(12)}px ${theme.spacing(6)}px`,
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(6)}px ${theme.spacing(2)}px ${theme.spacing(6)}px`,
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    },
    dashboardButton: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2, 0),
        fontSize: '24px',
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1, 0),
            fontSize: '16px',
        },
    },
    text: {
        paddingBottom: theme.spacing(4)
    },
    icon: {
        fontSize: '40px!important',
        [theme.breakpoints.down('xs')]: {
            fontSize: '24px!important',
        },
    }
}))

const ResetPasswordSuccess = () => {
    const intl = useIntl()
    const classes = useStyles();

    const history = useHistory()

    return (
        <PreAuthPage pageTitle={intl.formatMessage({id: 'dashboard_title'})}>
            <Paper className={clsx(classes.paper)} elevation={2}>
                <Typography component={'h1'} variant={'h1'} className={classes.text}>
                    Password Reset Successful
                </Typography>
                <Typography component={'h3'} variant={'h3'} className={classes.text}>
                    Your password has been successfully reset to your new password. Click the link below to go to sign in.
                </Typography>
                <Button 
                    type={"button"} 
                    fullWidth 
                    className={classes.dashboardButton} 
                    variant={"contained"}
                    color='primary'
                    startIcon={<AssessmentRoundedIcon className={classes.icon}/>}
                    onClick={() => history.push('/signin')}
                    >
                        Sign In
                </Button>
            </Paper>
        </PreAuthPage>
    )
}

export default ResetPasswordSuccess