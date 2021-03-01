import React, {useContext, useEffect} from 'react'
import {injectIntl} from 'react-intl'
import Page from './Page'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import { UserContext} from "../context/user-context";
import getEHRPatient from '../utils/ehrRecord';
import getFullRecords from '../utils/fullRecords';
import HealthInfo from '../components/dashboard/HealthInfo'
import ArticleMatches from '../components/dashboard/ArticleMatches'
import TrialBanner from '../components/dashboard/TrialBanner'
// import HWComparison from '../components/dashboard/HWComparison'
import HealthStats from '../components/dashboard/HealthStats'
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        alignContent: "center",
        justifyContent: "center",
        
    },
    paper: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
        alignItems: "center",
        color: theme.palette.grey.dark,
    },
    container: {
        width: '90%',
        maxWidth: '75rem',
        margin: 'auto',
    },
    title: {
        paddingBottom: theme.spacing(4),
    },
    titleBody: {
        '@media (max-width: 1100px)': {
            fontSize: '20px'
        },
        marginBottom: theme.spacing(6),
    },
    trialMatches: {
        flexDirection: "row",
        justify: "center",
        alignItems: "center",
        marginBottom: theme.spacing(4),
    },
    matchesLeft: {
        backgroundColor: theme.palette.secondary.main,
        paddingLeft: '6%',
        height: '350px',
        color: theme.palette.secondary.contrastText,
    },
    numMatches: {
        fontSize: '128px',
        fontWeight: 100,
        marginTop: theme.spacing(6),
    },
    loadingSpinner: {
        color: theme.palette.secondary.contrastText,
    },
    dividerLine: {
        width: '80%',
        borderBottomStyle: 'solid',
        marginBottom: theme.spacing(2),
    },
    matchesRight: {
        backgroundColor: theme.palette.secondary.pale,
        height: '350px',
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    matchesRightDisabled: {
        backgroundColor: theme.palette.secondary.pale,
        height: '350px',
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        opacity: 0.2,
    },
    matchedTrialsContainer: {
        height: '60%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(8),
    },
    match: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: theme.palette.secondary.contrastText,
        paddingBottom: theme.spacing(1.5),
        paddingTop: theme.spacing(2),
    },
    skeletonMatch: {
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: theme.palette.secondary.contrastText,
        paddingBottom: theme.spacing(1.5),
        paddingTop: theme.spacing(2),
    },
    trialStatus: {
        color: theme.palette.secondary.main,
        fontSize: '11px',
        fontWeight: 900,
    },
    trialName: {
        fontSize: '16px',
        fontWeight: 900,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '80%',
        whiteSpace: 'nowrap',
    },
    matchesButton: {
        fontSize: '16px',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        }
    },
    healthInfo: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(6),
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
    },
    createIcon: {
        float: 'right',
        padding: '20px',
        paddingBottom: '0px',
        '&:hover': {
            color: theme.palette.primary.light,
            cursor: 'pointer',
        }
    },
    healthInfoLabel: {
        color: theme.palette.primary.light,
        fontWeight: '16px',
    },
    healthInfoTop: {
        marginBottom: theme.spacing(2),
    },
    healthInfoTopItem: {
        paddingLeft: theme.spacing(6),
    },
    healthInfoTopMain: {
        paddingBottom: theme.spacing(3),
        '@media (max-width: 1100px)': {
            fontSize: '24px',
        }
    },
    healthInfoTopItemMiddle: {
        borderColor: theme.palette.primary.light,
        borderLeftWidth: "2px",
        borderLeftStyle: 'solid',
        borderRightWidth: "2px",
        borderRightStyle: 'solid',
        paddingLeft: theme.spacing(6),
        '@media (max-width: 500px)': {
            paddingLeft: theme.spacing(0),
            marginLeft: theme.spacing(6),
            borderStyle: 'none',
            paddingBottom: theme.spacing(2),
            paddingTop: theme.spacing(2),
            borderTopWidth: "2px",
            borderTopStyle: 'solid',
            borderBottomWidth: "2px",
            borderBottomStyle: 'solid',
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
        }
    },
    healthInfoBottom: {
        borderTopWidth: "1px",
        borderTopColor: theme.palette.primary.contrastText,
        borderTopStyle: 'solid',
        color: theme.palette.primary.contrastText,
    },
    healthInfoBottomItem: {
        paddingLeft: theme.spacing(6),
        paddingTop: theme.spacing(4),
        backgroundColor: theme.palette.primary.main,
        height: '150px',
    },
    card: {
        color: theme.palette.grey.dark,
        backgroundColor: theme.palette.primary.pale,
        textAlign: 'center',
        height: '80%',
        padding: theme.spacing(3),
    },
    cardConnect: {
        color: theme.palette.grey.dark,
        backgroundColor: theme.palette.primary.contrastText,
        textAlign: 'center',
        borderColor: theme.palette.primary.main,
        borderStyle: 'solid',
        height: '80%',
        padding: theme.spacing(3),
    },
    cardContent: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: 'center',
        height: '100%',
    },
    help: {
        marginBottom: theme.spacing(4)
    },
    helpButton: {
        width: '90%',
        marginTop: theme.spacing(3),
    },
    helpIcon: {
        color: theme.palette.primary.main,
        fontSize: '62px',
        marginBottom: theme.spacing(2),
    },
    helpText: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    noDataTop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '200px',
        flexDirection: 'column'
    },
    noDataText: {
        color: theme.palette.primary.contrastText,
        fontWeight: 700,
        marginBottom: theme.spacing(2)
    },
    noDataButton: {
        backgroundColor: theme.palette.primary.main,
        textTransform: 'none',
        color: theme.palette.primary.contrastText,
        width: '20%',
        fontSize: '20px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    healthInfoTopHalf: {
        height: '60%'
    }
}))

const DashboardAccount = ({intl}) => {

    const classes = useStyles();
    const [profile, dispatch] = useContext(UserContext);
    // gets the doctors name if we can, and it isn't already entered
    useEffect(() => {


         var x =Object.keys(profile.careProvider).length;
         if (x===0) {
            //getEHRPatient(profile.uid)
            getFullRecords(profile.patientID)
            .then((response) => {
                if (response) {
                  // alert(response.patient[0].careProvider[0].display);
                    if (response.patient[0].careProvider) {
                       // alert(response.patient[0].careProvider[0].display);
                        const user = profile
                        const doctor = response.patient[0].careProvider[0].display.split(', ')
                        const doctorName = "Dr. " + [doctor[1], doctor[0]].join(' ')
                        user.careProvider = {name: doctorName, contact: null}
                        dispatch({type: 'update care provider', payload: user})
                    }
                }
            })
            .catch((error) => {
                console.log('Error', error)
            })

        }
    }, [ ])


    return(
        <Page pageTitle={intl.formatMessage({id: 'dashboard_title'})} >
            <Paper className={clsx(classes.paper)} elevation={6}>
                <div className={classes.container}>

                    {/* Intro/ header */}
                    <Typography component={"h1"} variant={"h1"} className={classes.title}>
                        Hello, {profile.firstName}
                    </Typography>
                    <Typography variant={'h4'} className={classes.titleBody}>
                        Welcome back. Below are quick ways for you to find, refine, or save your personal, health, and research information. At any time you can update or change these details. As always, we thrive on your feedback and insights to make this experience better and more useful to you.
                    </Typography>

    {localStorage.getItem('status')==="Processing" ? <div><CircularProgress size={150} /></div> : null}

                    <HealthStats profile={profile}/>


                    <HealthInfo profile={profile} dispatch={dispatch}/>

                    {/* <HWComparison profile={profile}/> */}

                    <ArticleMatches profile={profile}/>

                    <TrialBanner/>

                </div>
            </Paper>
        </Page>
    )
}

export default injectIntl(DashboardAccount)
