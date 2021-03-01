import React, {useEffect, useState, useContext} from 'react';
import {useIntl} from 'react-intl'
import PreAuthPage from './PreAuthPage'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import { FixedSizeList } from 'react-window'
import {Formik} from "formik";
import * as Yup from "yup";
import InputAdornment from "@material-ui/core/InputAdornment";
import LinkIcon from "@material-ui/icons/Link";
import SearchIcon from '@material-ui/icons/Search';
import { Avatar} from "@material-ui/core";
import getHealthcareNetworks from "../utils/healthcare";
import { UserContext} from "../context/user-context";
import axios from "../utils/axios";
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import KeyboardRoundedIcon from '@material-ui/icons/KeyboardRounded';
// import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import AnnouncementRoundedIcon from '@material-ui/icons/AnnouncementRounded';
import ErrorMessage from '../components/ErrorMessage'
import {useHistory} from 'react-router-dom'
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';


const useStyles = makeStyles((theme) => ({
        paper: {
            width: 'auto',
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            [theme.breakpoints.up(620 + theme.spacing(6))]: {
                width: '70%',
                marginLeft: 'auto',
                marginRight: 'auto'
            },
            marginTop: theme.spacing(10),
            marginBottom: theme.spacing(10),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: `${theme.spacing(2)}px ${theme.spacing(8)}px ${theme.spacing(2)}px`,
            [theme.breakpoints.down('xs')]: {
                padding: `${theme.spacing(1)}px ${theme.spacing(0)}px ${theme.spacing(1)}px`,
            },
            color: theme.palette.grey.dark,
            textAlign: 'center',
        },
        form: {
            marginTop: theme.spacing(1),
            width: '95%',
            textAlign: 'left',
            backgroundColor: theme.palette.grey.pale,
            boxSizing: 'border-box',
            padding: '3.125rem',
            marginBottom: theme.spacing(7),
            [theme.breakpoints.down('sm')]: {
                padding: '2rem'
            }
        },
        submit: {
            margin: theme.spacing(3, 0, 4),
            fontSize: '22px',
            padding: theme.spacing(3, 0),
            [theme.breakpoints.down('xs')]: {
                padding: theme.spacing(2, 0),
                margin: theme.spacing(3, 0, 2),
                fontSize: '18px',
            }
        },
        submitIcon: {
            fontSize: '40px',
            marginRight: theme.spacing(1),
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: `100%`
        },
        titleContainer: {
            width: '90%',
        },
        iconButton: {
            color: "#ffff",
        },
        changeButton: {
            padding: theme.spacing(1, 6),
            fontSize: '20px',
        },
        providerName: {
            maxWidth: '70%',
            maxHeight: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '&:hover': {
                overflow: 'visible',
                maxHeight: 'none',
            }
        },
        title: {
            paddingTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        subtitle: {
            fontWeight: 900
        },
        helpText: {
            padding: theme.spacing(2),
            paddingTop: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(2),
            },
        },
        searchField: {
            marginBottom: theme.spacing(2),
            backgroundColor: theme.palette.grey.contrastText
        },
        searchHeader: {
            marginTop: theme.spacing(4),
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        listItemText: {
            borderBottom: 'solid',
            borderBottomWidth: '2px',
            borderBottomColor: theme.palette.grey.light,
            height: '100px',
            display: 'flex',
            alignItems: 'center',
        },
        providerContainer: {
            height: theme.spacing(12),
            borderBottom: 'solid',
            borderBottomWidth: '1px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing(6),
            paddingBottom: theme.spacing(2),
            borderBottomColor: theme.palette.grey.main,
            color: theme.palette.grey.main,
        },
        icons: {
            color: theme.palette.grey.main,
            fontSize: '40px',
            marginRight: theme.spacing(1),
            [theme.breakpoints.down('xs')]: {
                fontSize: '30px',
            },
        },
        listAvatarContainer: {
            width: '5%',
            textAlign: 'center',
            minWidth: '30px',
            [theme.breakpoints.down('xs')]: {
                minWidth: '24px',
            },
        },
        listAvatar: {
            width: '30px',
            height: '30px',
            backgroundColor: theme.palette.grey.pale,
            [theme.breakpoints.down('xs')]: {
                width: '20px',
                height: '20px',
            },
        },
        listItem: {
            color: theme.palette.grey.main,
            '&:hover': {
                color: theme.palette.grey.dark,
                "& $icon": {
                    color: theme.palette.grey.dark,
                },
            },
        },
        selectedListItem: {
            color: theme.palette.grey.dark,
            "& $icon": {
                color: theme.palette.secondary.main,
            },
        },
        selectedIcon : {
            height: '100%',
            width: '100%',
            backgroundColor: theme.palette.grey.pale,
            color: theme.palette.secondary.main,
        },
        icon: {
            height: '100%',
            width: '100%',
            // backgroundColor: theme.palette.grey.main,
            color: theme.palette.grey.main,
        },
        bottomContainer: {
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: theme.spacing(6),
            color: theme.palette.secondary.darkest,
            marginTop: theme.spacing(4),
            backgroundColor: '#E6F3D1',
            width: '90%',
            // marginLeft: theme.spacing(11),
            // marginRight: theme.spacing(11),
            marginLeft: 'auto',
            marginRight: 'auto',
            [theme.breakpoints.up(620 + theme.spacing(6))]: {
                width: '75%',
            },
            // padding: `${theme.spacing(2)}px ${theme.spacing(8)}px ${theme.spacing(2)}px`,
            // [theme.breakpoints.down('sm')]: {
            //     padding: `${theme.spacing(1)}px ${theme.spacing(4)}px ${theme.spacing(1)}px`,
            // },
        },
        bottomInnerContainer: {
            height: '100%',
            width: '100%',
            margin: theme.spacing(2),
            borderStyle: 'solid',
            borderColor: theme.palette.secondary.main,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        bottomButton: {
            width: '75%',
            [theme.breakpoints.up(620 + theme.spacing(6))]: {
                width: '50%',
            },
            height: '75px',
            fontSize: '22px',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(4),
            [theme.breakpoints.down('xs')]: {
                fontSize: '16px',
            },
        },
        bottomText: {
            width: '80%',
            marginTop: theme.spacing(3),
        },
        bottomIcon: {
            fontSize: '40px',
            marginRight: theme.spacing(2),
            [theme.breakpoints.down('xs')]: {
                fontSize: '30px',
            },
        },
        '@keyframes opacity': {
            from: { opacity: 1 },
            to: { opacity: 0 },
        },
        loading: {
            textAlign: 'center',
            fontSize: '30px',
            // pulsing dots animation
            '& span:not(:last-child)': {
                marginRight: '10px'
            },
            '& span': {
                animationName: '$opacity',
                animationDuration: '1s',
                animationIterationCount: 'infinite',
            },
            '& span:nth-child(2)': {
                animationDelay: '100ms',
            },
            '& span:nth-child(3)': {
                animationDelay: '300ms',
            },
        },
        feedbackContainer: {
            display: 'flex',
            flexDirection: 'row',
            color: theme.palette.primary.main,
            justifyContent: 'space-between',
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            },
        },
        feedbackButton: {
            width: '30%',
            height: '60px',
            fontSize: '18px',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
        },
        boldBlue: {
            fontWeight: 700,
            color: theme.palette.primary.main
        },
        noContentContainer: {
            width: '100%',
            height: '21.875rem',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(8),
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomStyle: 'solid',
            borderColor: theme.palette.grey.light,
            borderWidth: '5px'
        },
        noContentIcon: {
            color: theme.palette.primary.main,
            height: '4.375rem',
            width: '4.375rem'
        },
        noContentText: {
            textAlign: 'center'
        },
        link: {
            color: theme.palette.primary.main,
            fontWeight: 700,
            '&:hover': {
                cursor: 'pointer'
            },
        },
        providerList: {
            borderBottomStyle: 'solid',
            borderColor: theme.palette.grey.light,
            borderWidth: '5px'
        }
    }))

const ConnectHealthcareNetwork = () => {
    const classes = useStyles()
    const intl = useIntl()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [fullList, setList] = useState([]);
    const [network, setNetwork] = useState(false)
    const [search, setSearch] = useState('')
    const [profile, dispatch] = useContext(UserContext);
    const [errors, setErrors] = useState(false)
    const [status, setStatus] = useState(false)
    const [ids, setIDs] = useState([])

    const findParagraph = <>Let’s begin by adding your medical provider so the Ongev engine can begin to personalize your health journey. You can either connect with your health care provider or <span className={classes.boldBlue}>add your health history manually</span> at the bottom of the page if you can’t find your health provider in our search engine.</>

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleCloseError = () => {
        setErrors(false)
    }

    const handleCloseTimeout = () => {
        setStatus(false)
    }

    // Get list of healthcare networks on load
    useEffect(() =>{
        getHealthcareNetworks()
        .then((networks) => {
        const networkList = networks.map(({ name, id, logo, links, api_version, Broker }) => ({ name, id, logo, links, api_version, Broker })).filter(network => network.name && network.id )
    const connectedIDs = profile.networks ? profile.networks.map(network => network.id) : []
    setIDs(connectedIDs)
    setList(networkList)
})
.catch((error) => {
        if (error.response && error.response.data === 'Token is expired') {
        console.log('Token is expired')
        dispatch(({type: 'token expired'}))
    }
    debugger
    console.log(error)
    setErrors({message: 'Unable to load healthcare networks'})
    setIsLoaded(true)
})
.finally(() => {
        setIsLoaded(true);
});
}, [dispatch, profile.networks]);

    // Everytime the search term changes, filter the list of networks
    useEffect(() => {
        if (fullList.length > 0) {
        setItems(fullList.filter(provider => provider.name.toLowerCase().includes(search.toLowerCase())));
    }
    // console.log('filtered')
}, [fullList, search, profile.networks])

    // Gets the OAUTH url
    const getUrl = (setSubmitting) => {
        const data = {
            id: network.id,
            name: network.name,
            api_version: network.api_version,
            broker_id: network.Broker.id
        }
        let url = process.env.REACT_APP_ONGEV_API_BASEURL + /api/ + process.env.REACT_APP_ONGEV_API_VERSION + "/patient/" + profile.patientID + "/healthcare-system"
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()

        // Function to cancel then restart the API call if it's slow
        const retry = () => {
            source.cancel('Canceled')
            setStatus({message: 'Retrying...'})
            getUrl(setSubmitting)
        }

        // Displays a message if API response is slow
        setTimeout(() => setStatus({message: 'Linking to your network is taking longer than expected, please be patient.', type:'timeOut', linkText: 'Click here to restart', handleLink: retry}), 10000)
        console.log(url)
        axios.post(url, data, {cancelToken: source.token, 'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` }})
            .then((response) => {
            if (!profile.networks.map(network => network.id).includes(network.id)) {
            dispatch({type: 'add network', payload: { network }})
        }


        // Redirects to OAUTH url on success
        window.location.assign(response.data.url)


    })
    .catch((error) => {
            if (error.response && error.response.data === 'Token is expired') {
            console.log('Token is expired')
            dispatch(({type: 'token expired'}))
            history.push("/signin", {ongevRoute: "/patient/healthcare/register"})
        }
        setSubmitting(false)
        console.log(error)
        if (error.message !== 'Canceled') {
            setErrors({message: 'Something went wrong on the backend. Could not get redirect url'})
        }
    })
    }

    // Function needed for virtual list. Displays each network as it scrolls into view
    const renderRow = ({ index, style }) => {
        const item = items[index]
        const connected = item ? ids.includes(item.id) : null
        const selected =  item ? !!network && network.id === item.id ? true : false : null
        return (isLoaded ?
            <ListItem style={style} className={connected || selected ? classes.selectedListItem : classes.listItem} onClick={(event) => setNetwork(item)} key={item.id} value={item.id}>
    <ListItemAvatar className={classes.listAvatarContainer}>
    <Avatar className={classes.listAvatar}>
        {
            selected ?
        <CheckCircleOutlineRoundedIcon className={classes.selectedIcon}/>
        : connected ?
        <LinkIcon className={classes.selectedIcon}/>
        :
        <RadioButtonUncheckedIcon className={classes.icon}/>
        }
    </Avatar>
        </ListItemAvatar>
        <ListItemText className={classes.listItemText} primary={
            <Typography component={'h4'} variant={'h4'}>
            {item.name}
    </Typography>
    }/>
    </ListItem>
    : <ListItem>Loading Network List... Start Typing To Search For Your Network</ListItem>)
    }

    return (
        <PreAuthPage pageTitle={intl.formatMessage({id: 'sign_in'})} >
<Paper className={classes.paper} elevation={2}>
        <div className={classes.container}>
    {/* Displays different information depending on if a network is selected or not */}
<div className={classes.titleContainer}>
<Typography variant="h1" className={classes.title}>
    Thank you for joining Ongev
    </Typography>
    <Typography variant="h3" className={classes.subtitle}>
    {"Find Your Health Network"}
</Typography>
    <Typography component="h4" variant="h4" className={classes.helpText}>
    {findParagraph}
</Typography>
    </div>
    <Formik
    initialValues={{
        healthcareNetworkId: '',
            clientId: "",
            clientSecret: ""
    }}
    validationSchema={Yup.object().shape({
        // healthcareNetworkId: Yup.number()
        //     .required('Required'),
    })}
    onSubmit={(values, {setSubmitting}) => {
        values.healthcareNetworkId = network.id
        setSubmitting(true)
        getUrl(setSubmitting)
    }}
>{(props) => {
        const {
            isSubmitting,
            handleBlur,
            handleSubmit,
            } = props;
        return (
            <form className={classes.form} onSubmit={handleSubmit} noValidate>

        <div className={classes.searchHeader}>
    <Typography component="h1" variant="subtitle2" >
            Type in the name of your network
        </Typography>
        <Tooltip arrow placement="top" disableFocusListener interactive title='If your network is not included, please leave us feedback at the bottom of the page.'>
            <HelpIcon color='secondary'/>
            </Tooltip>
            </div>
            <TextField
        value={search}
        onChange={handleSearchChange}
        onBlur={handleBlur}
        margin="normal"
        className={classes.searchField}
        id="search"
        placeholder="e.g. HSA Healthcare"
        name="search"
        variant="outlined"
        fullWidth
        InputProps={{
            startAdornment: (
            <InputAdornment position="start">
                <SearchIcon className={classes.icons}/>
        </InputAdornment>
        )
        }}
    />

    <ErrorMessage errors={errors} handleClose={handleCloseError}/>

        {
            isLoaded && items.length === 0 ?
    <div className={classes.noContentContainer}>
    <SentimentVeryDissatisfiedIcon className={classes.noContentIcon}/>
    <Typography variant='h4' className={classes.noContentText}>
        There are no results for “{search}”. But don’t worry, you can instead enter your health information manually by <span className={classes.link} onClick={() => history.push('/patient/diagnosis/edit')}>clicking here</span>.
    </Typography>
        </div>
    :
    <FixedSizeList height={350} width={'100%'} itemSize={100} itemCount={isLoaded ? items.length : 1} className={classes.providerList}>
        {renderRow}
    </FixedSizeList>
    }


        {isSubmitting ?
        <Button
            // Loading button with animated pulsing dots
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
        <span className={classes.loading}><span>&bull;</span><span>&bull;</span><span>&bull;</span></span>
        </Button>
        :
        <Button
            type="submit"
            disabled={isSubmitting || !network}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
        <LinkIcon className={classes.submitIcon}/>
            {"Connect Now"}
        </Button>
        }

    <div className={classes.feedbackContainer}>
    <Typography component="h2" variant="h3" className={classes.title}>
        Don't see your network? Let us know!
        </Typography>

        <Button
        type='button'
        variant='outlined'
        color='primary'
        href='mailto:dev@pixelrecess.com'
        className={classes.feedbackButton}
        target="_blank">
            <AnnouncementRoundedIcon className={classes.bottomIcon}/>
        Send Us Feedback
        </Button>
        </div>


        {status ?
            // Message display if API call is slow
        <ErrorMessage errors={status} color={'primary'} linkText={status.linkText} handleLink={status.handleLink} handleClose={handleCloseTimeout}/> : null}

    </form>);
    }}
</Formik>
    </div>
    </Paper>


    <div className={classes.bottomContainer}>
<div className={classes.bottomInnerContainer}>
<Typography variant='h2' className={classes.bottomText}>
    Not able to connect to your records? That's ok, we can manually add some of your health information.
    </Typography>

    <Button
    type='button'
    variant='outlined'
    color='secondary'
    className={classes.bottomButton}
    href={"/patient/diagnosis/edit"}>
        <KeyboardRoundedIcon className={classes.bottomIcon}/>
    Manually Input Info
    </Button>
    </div>
    </div>

    </PreAuthPage>
)
}

export default ConnectHealthcareNetwork