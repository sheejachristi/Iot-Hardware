import React from 'react'
import {injectIntl} from 'react-intl'
import Page from './Page'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {grey, blue, teal, red} from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import Avatar from '@material-ui/core/Avatar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const useStyles = makeStyles((theme) => ({ 
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        alignContent: "center",
        justifyContent: "center",
        maxWidth: '100%'
    },
    paper: {
        paddingLeft: theme.spacing(6),
        // paddingRight: theme.spacing(6),
        paddingTop: theme.spacing(4),
        [theme.breakpoints.up(620 + theme.spacing(6))]: {
            width: "100%",
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        alignItems: "center",
        color: grey[700]
    },
    notifications: {
        width: '90%'
    },
    title: {
        marginBottom: theme.spacing(4)
    },
    notification: {
        paddingBottom: theme.spacing(8),
    },
    notifInfo: {
        paddingBottom: theme.spacing(8),
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: grey[300],
        width: '90%'
    },
    notifDate: {
        color: grey[500],
        fontSize: '22px'
    },
    notifTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: theme.spacing(2),
    },
    notifDesc: {
        paddingBottom: theme.spacing(2),
        width: '70%',
    },
    viewAllButton: {
        textTransform: 'none',
        color: blue[500],
        borderColor: blue[500],
        width: '45%'
    },
    notifAvatar: {
        textAlign: 'center',
        width: '100px',
        height: '100px'
    },
    icon: {
        width: '60%',
        height: '60%',
        color: grey[700]
    },
    avatarContainer: {
        width: '150px'
    },
    notifButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '70%'
    },
    acceptButton: {
        textTransform: 'none',
        color: teal[500],
        borderColor: teal[500],
        width: '45%'
    },
    rejectButton: {
        textTransform: 'none',
        color: red[500],
        borderColor: red[500],
        width: '45%'
    }
}))

const Notifications = ({intl}) => {

    const classes = useStyles();

    const dummyNotifications = [{
            number: 27,
            type: 'match',
            trialHolderNames: ['The Cancer Society'],
            date: new Date()
        },
        {
            fullName: 'Dr. Joseph Allen',
            shortName: 'Dr. Allen',
            email: 'allen.joseph.r@healthname.org',
            type: 'request',
            date: new Date()
        },
        {
            number: 27,
            type: 'match',
            trialHolderNames: ['The Cancer Society'],
            date: new Date()
        },
        {
            fullName: 'Dr. Joseph Allen',
            shortName: 'Dr. Allen',
            email: 'allen.joseph.r@healthname.org',
            type: 'request',
            date: new Date()
        }
]

    console.log(dummyNotifications[0].date)

    const renderNotification = (notification) => {
        if (notification.type === 'match') {
            return renderMatchNotification(notification)
        } else {
            return renderConnectionNotification(notification)
        }
    }

    const renderMatchNotification = (notification) => {
        return (
            <Grid container direction={"row"} spacing={5} wrap="nowrap" className={classes.notification}>
                <Grid item xs={2} className={classes.avatarContainer}>
                    <Avatar className={classes.notifAvatar}>
                        <NotificationsIcon className={classes.icon}/>
                    </Avatar>
                </Grid>
                <Grid item sx={10} className={classes.notifInfo}>
                    <div className={classes.notifTop}>
                        <Typography component={"h1"} variant={"h4"} className={classes.notifTitle}>
                            {notification.number} New Trial Matches
                        </Typography>
                        <Typography component={"h1"} variant={"h4"} className={classes.notifDate}>
                            {notification.date.toString().split(' ').slice(0, 5).join(' ')}
                        </Typography>
                    </div>
                    <Typography component={"p"} variant={"h6"} className={classes.notifDesc}>
                        We found some new trials that match your diagnosis and health profile, from institutes including {notification.trialHolderNames.join(', ')}, and many more. Click the button below to view them all.
                    </Typography>
                    <div className={classes.notifButtons}>
                        <Button
                            type={"button"}
                            variant="outlined" 
                            className={classes.viewAllButton}
                            startIcon={<SearchIcon/>}
                            >
                                View All Matches
                        </Button>
                    </div>
                </Grid>
            </Grid>
        )
    }

    const renderConnectionNotification = (notification) => {
        return (
            <Grid container direction={"row"} spacing={5} wrap="nowrap" className={classes.notification}>
                <Grid item xs={2} className={classes.avatarContainer}>
                    <Avatar className={classes.notifAvatar}>
                        <PersonAddIcon className={classes.icon}/>
                    </Avatar>
                </Grid>
                <Grid item sx={10} className={classes.notifInfo}>
                    <div className={classes.notifTop}>
                        <Typography component={"h1"} variant={"h4"} className={classes.notifTitle}>
                            Connection request from {notification.shortName}
                        </Typography>
                        <Typography component={"h1"} variant={"h4"} className={classes.notifDate}>
                            {notification.date.toString().split(' ').slice(0, 5).join(' ')}
                        </Typography>
                    </div>
                    <Typography component={"p"} variant={"h6"} className={classes.notifDesc}>
                        You have a request to connect your information from {notification.fullName} (email: {notification.email}). If you recognize this request, click accept below, and you can then determine what information you are willing to share. If you do not recognize this request, click reject, and access to your information will be refused.
                    </Typography>
                    <div className={classes.notifButtons}>
                        <Button
                            type={"button"}
                            variant="outlined" 
                            className={classes.acceptButton}
                            startIcon={<CheckCircleIcon/>}
                            >
                                I know who this is, I accept
                        </Button>
                        <Button
                            type={"button"}
                            variant="outlined" 
                            className={classes.rejectButton}
                            startIcon={<NotInterestedIcon/>}
                            >
                                I do not know who this is, I reject
                        </Button>
                    </div>
                </Grid>
            </Grid>
        )
    }

    return (
        <Page pageTitle={intl.formatMessage({id: 'dashboard_title'})}>
            <Paper className={clsx(classes.paper)} elevation={6}>
                <Typography component={"h1"} variant={"h4"} className={classes.title}>
                    Notifications
                </Typography>
                <div className={classes.notifications}>
                    {dummyNotifications.map(notification => renderNotification(notification))}
                </div>
            </Paper>
        </Page>
    )

}

export default injectIntl(Notifications)