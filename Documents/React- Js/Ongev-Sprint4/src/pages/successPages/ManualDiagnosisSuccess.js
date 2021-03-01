import React from 'react'
import {useIntl} from 'react-intl'
import PreAuthPage from '../PreAuthPage'
import{
    Paper,
    Avatar,
    Typography,
    Button,
    Grid
} from '@material-ui/core/'
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useHistory } from 'react-router-dom';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import {ReactComponent as SuccessSrc} from '../../components/icons/icon_color_congrats.svg'

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
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },
    },
    dashboardButton: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2, 0),
        fontSize: '24px',
        [theme.breakpoints.up('xl')]: {
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
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
            fontSize: '20px!important',
        },
    },
    avatar: {
        width: '20rem',
        height: '20rem',
        backgroundColor: theme.palette.secondary.light,
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            width: '10rem',
            height: '10rem',
        },
        [theme.breakpoints.down('xs')]: {
            width: '7rem',
            height: '7rem',
        },
    },
    privacyContainer: {
        background: 'linear-gradient(180deg, rgba(230,243,209,0.2), rgba(230,243,209,0.5))',
        padding: '3.125rem',
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up('xl')]: {
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        [theme.breakpoints.down('xs')]: {
            padding: '1.5rem'
        },
    },
    pledge: {
        textAlign: 'left',
        marginBottom: theme.spacing(2),
    },
    privacyBody: {
        textAlign: 'left',
        fontSize: '1rem',
        lineHeight: '1.5rem'
    },
    privacyIcon: {
        width: '60%'
    },
    privacyAvatar: {
        backgroundColor: theme.palette.primary.main,
        width: '12.5rem',
        height: '12.5rem',
        [theme.breakpoints.down('lg')]: {
            margin: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            width: '8rem',
            height: '8rem',
        },
    },
    avatarContainer: {
        
    }
}))

const ManualDiagnosisSuccess = () => {
    const intl = useIntl()
    const classes = useStyles();
    const history = useHistory()


    return (
        <PreAuthPage pageTitle={intl.formatMessage({id: 'dashboard_title'})}>
            <Paper className={clsx(classes.paper)} elevation={2}>
                <Avatar className={classes.avatar}>
                    <SuccessSrc style={{width: '70%', height: '100%'}}/>
                </Avatar>
                <Typography component={'h1'} variant={'h1'} className={classes.text}>
                    Congratulations
                </Typography>
                <Typography component={'h3'} variant={'h3'} className={classes.text}>
                    You have successfully added all your personal and health details and created your Ongev account.
                </Typography>
                <Grid container className={classes.privacyContainer}>
                    <Grid item  lg={3} xs={12} className={classes.avatarContainer}>
                        <Avatar className={classes.privacyAvatar}>
                            <img src={'/logos/icon_privacy-pledge.png'} alt='privacy icon' className={classes.privacyIcon}/>
                        </Avatar>
                    </Grid>

                    <Grid item  lg={9} xs={12} >
                        <Typography variant='h3' className={classes.pledge}>
                            Privacy Pledge
                        </Typography>

                        <Typography className={classes.privacyBody}>
                            Data is currency. Nowhere is that more apparent than with your healthcare data. The trouble is that many in the industry want to profit from your data. And unless they reside in California, they can do so WITHOUT your knowledge or approval. At Ongev, we believe that’s wrong. We want to make this abundantly clear: <strong>under no circumstance will we offer, sell, or transfer your data to any third party.</strong><br/><br/>

                            This is more than a policy at Ongev, it’s our <strong>PRIVACY PLEDGE</strong> to you. This is at the core of our mission: You. Own. Your. Data. We will never compromise our respect for your privacy. The healthcare data that you provide, and is stored on our site, will be for your benefit. We will only use your data to help Ongev customize your offerings, content, insights, services, products, and therapeutics (including clinical trial matching). We will only allow our third party service providers to use your data for authorized purposes that are intended to support the services we provide to you. In other words, your data will help us improve our benefits to you. Any other use of your data is exclusively at your discretion. No exceptions to this rule. You have the right to access your data. If you want to license your data, we will help you navigate the transaction. We are an advocate on behalf of you and your wellness. We achieve that by simplifying your healthcare journey.<br/><br/>

                            If you have any questions related to our Privacy Pledge, please <a href='mailto:dev@pixelrecess.com' rel="noopener noreferrer" target="_blank">contact us</a>. Thank you for trusting us to work on your behalf.
                        </Typography>
                    </Grid>

                </Grid>
                <Button 
                    type={"button"} 
                    fullWidth 
                    className={classes.dashboardButton} 
                    variant={"contained"}
                    color='primary'
                    startIcon={<AssessmentRoundedIcon className={classes.icon}/>}
                    onClick={() => history.push('/dashboard')}>
                        Go To Your Dashboard
                </Button>
            </Paper>
        </PreAuthPage>
    )
}

export default ManualDiagnosisSuccess