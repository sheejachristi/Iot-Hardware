import React from 'react'
import Page from './Page'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useHistory} from 'react-router-dom'
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles((theme) => ({ 
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        alignContent: "center",
        justifyContent: "center",
        
    },
    paper: {
        [theme.breakpoints.up(620 + theme.spacing(6))]: {
            width: "100%",
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        alignItems: "center",
        color: theme.palette.grey.dark,
    },
    subheader: {
        padding: theme.spacing(4, 0, 4),
        backgroundColor: theme.palette.grey.pale,
        marginBottom: theme.spacing(3),
    },
    container: {
        width: '90%',
        maxWidth: '75rem',
        margin: 'auto'
    },
    noNetworkContainer: {
        width: '100%',
        marginTop: '12.375rem',
        paddingBottom: '12.5rem'
    },
    noNetworkBox: {
        width: '100%',
        height: '33.25rem',
        background: 'linear-gradient(180deg, rgba(230,243,209,0.2), rgba(230,243,209,0.5))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    connectImage: {
        width: '30%',
        marginTop: '-6.25rem',
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        }
    },
    connectText: {
        width: '60%',
        textAlign: 'center',
    },
    connectButton: {
        marginBottom: '3.125rem',
        width: '18.75rem',
        height: '3.75rem',
        fontSize: '1.125rem',
        [theme.breakpoints.down('sm')]: {
            width: '12rem',
            fontSize: '1rem',
        }
    },
    connectIcon: {
        marginRight: theme.spacing(1),
    },
}))

const NoMatchPage = () => {

    const classes = useStyles();
    const history = useHistory()

    return(
        <Page >
            <Paper className={classes.paper} elevation={6}>
                <div className={classes.subheader}>
                    <div className={classes.container}>
                        <Typography component={"h1"} variant={"h1"} className={classes.title}>
                            Page Not Found
                        </Typography>
                    </div>
                </div>

                <div className={classes.container}>
                    <div className={classes.noNetworkContainer}>
                        <div className={classes.noNetworkBox}>
                            <img src={"/error-icons/image_health-history.png"} className={classes.connectImage} alt='connect network'/>
                            <Typography variant='h3' className={classes.connectText}>
                                Unable to find the requested page. Click the button to return to the dashboard
                            </Typography>
                            <Button
                            className={classes.connectButton}
                            color='primary'
                            variant='contained'
                            onClick={() => history.push("/dashboard")}>
                                <LinkIcon className={classes.connectIcon}/>
                                To Dashboard
                            </Button>
                        </div>
                    </div>

                </div>
            </Paper>
        </Page>
    )
}

export default NoMatchPage