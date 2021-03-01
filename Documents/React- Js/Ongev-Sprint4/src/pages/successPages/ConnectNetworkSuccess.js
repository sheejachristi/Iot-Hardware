import React, {  useEffect, useContext } from 'react'
import { UserContext} from "../../context/user-context";
import axios from '../../utils/axios'
import {useIntl} from 'react-intl'
import PreAuthPage from '../PreAuthPage'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddIcon from '@material-ui/icons/Add';

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
        padding: `${theme.spacing(6)}px ${theme.spacing(12)}px ${theme.spacing(6)}px`,
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(6)}px ${theme.spacing(2)}px ${theme.spacing(6)}px`,
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        marginBottom: theme.spacing(3),
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
    connectButton: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(10),
        alignSelf: 'flex-start'
    },
    text: {
        paddingBottom: theme.spacing(4)
    },
    icon: {
        fontSize: '36px!important',
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px!important',
        },
    },
    network: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderBottomStyle: 'solid',
        borderWidth: '1px',
        borderColor: theme.palette.grey.main,
        paddingBottom: theme.spacing(4),
        marginTop: theme.spacing(4)
    },
    networkIcon: {
        color: theme.palette.secondary.main,
        height: '4.6875rem',
        width: '4.6875rem'
    },
    networkName: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.spacing(2)
    }
}))

const ConnectNetworkSuccess = () => {
    const intl = useIntl()
    const classes = useStyles();
    const history = useHistory()
    const [profile, dispatch] = useContext(UserContext);

    useEffect(() => {



    var val = window.location.href
    var response = val.substring(val.indexOf("&state="));
    response = response.slice(7);


    let newString = atob(response);




        const patientUrl = process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/patient/'



    axios.post(patientUrl + profile.patientID + '/add-healthcare-system', newString, {
            'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` }
        })
        .then((resp) => {

        if(resp.data.success){
        axios.get(patientUrl + profile.patientID + '/extract-fhir-data', {
            'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` }
        })

    }

})
.catch(error => {
        console.log(error)
})



        axios.get(patientUrl + profile.patientID + '/healthcare-system')
        .then((resp) => {
            const networks = resp.data['healthcare-systems'].map(network => {
                return network['healthcare_systems']
            })
            const uniqueNetworks = [...new Set(networks.map(network => network.id))].map(id => networks.find(network => network.id === id))
            dispatch({type: 'update networks', payload: { networks: uniqueNetworks}})
        })
        .catch(error => {
            console.log(error)
        })




    }, [dispatch, profile.patientID])

    const renderNetwork = (network) => {
        return (
            <div className={classes.network}>
                <div className={classes.networkIcon}>
                    <CheckCircleOutlineIcon style={{height: '100%', width: '100%'}}/>
                </div>

                <div className={classes.networkName}>
                    <Typography variant='h2'>
                        {network.name}
                    </Typography>
                </div>
            </div>
        )
    }

    return (
        <PreAuthPage pageTitle={intl.formatMessage({id: 'dashboard_title'})}>
            <Paper className={clsx(classes.paper)} elevation={2}>
                <Typography component={'h1'} variant={'h1'} className={classes.text}>
                    Health Record Added!
                </Typography>
                <Typography component={'h3'} variant={'h3'} className={classes.text}>
                    You’ve successfully added your health record from the organization listed below. If you’d like to add more from other resources (such as specialists, hospitals, insurers, etc), click “Add New Connection”
                </Typography>

                {profile.networks.map(network => renderNetwork(network))}

                <Button
                    color='secondary'
                    variant='outlined'
                    className={classes.connectButton}
                    startIcon={<AddIcon/>}
                    onClick={() => history.push('/patient/healthcare/register')}>
                    Add New Connection
                </Button>

                <Button 
                    type={"button"} 
                    fullWidth 
                    className={classes.dashboardButton} 
                    variant={"contained"}
                    color='primary'
                    endIcon={<ArrowForwardIosIcon className={classes.icon}/>}
                    onClick={() => history.push(profile.interests && profile.interests.length > 0 ? '/dashboard' : '/patient/interests/add')}>
                        Continue To Next Step
                </Button>
            </Paper>
        </PreAuthPage>
    )
}

export default ConnectNetworkSuccess
