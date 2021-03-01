import Page from './Page'
import React, { useContext, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import {Formik} from 'formik';
import * as Yup from 'yup';
import { UserContext} from "../context/user-context";
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from "@material-ui/core/InputAdornment";
import DateRangeIcon from '@material-ui/icons/DateRange';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import FormControl from '@material-ui/core/FormControl';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import CheckIcon from '@material-ui/icons/Check';
import axios from "../utils/axios";
import HealingIcon from '@material-ui/icons/Healing';
import ErrorMessage from '../components/ErrorMessage'
import Icon from "@material-ui/core/Icon";

import CloseIcon from '@material-ui/icons/Close';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { format, isValid } from 'date-fns'
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import CallIcon from '@material-ui/icons/Call';
import InfoIcon from '@material-ui/icons/Info';
import LinkIcon from '@material-ui/icons/Link';
import {addVitals as updateDiagnosis} from '../utils/userActions'
import Modal from '@material-ui/core/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';



import Chip from '@material-ui/core/Chip';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles((theme) => ({
        root: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            alignContent: "center",
            justifyContent: "center",

        },
        paper: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: theme.palette.grey.dark,
        },
        title: {
            backgroundColor: theme.palette.grey.pale,
            padding: theme.spacing(6, 0),
            width: '100%',
            marginBottom: theme.spacing(6),
        },
        titleText: {
            width: '90%',
            margin: 'auto',
            maxWidth: '75rem',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'center',
            },
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            height: `100%`,
            width: '90%',
            maxWidth: '75rem',
            justifyContent: 'center',
        },
        submit: {
            width: '60%',
            height: '80px',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                marginBottom: theme.spacing(4),
            },
        },
        submitFull: {
            height: '80px',
            [theme.breakpoints.down('sm')]: {
                height: '60px'
            },
        },
        delete: {
            width: '37%',
            borderWidth: '2px',
            height: '80px',
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main,
            '&:hover': {
                backgroundColor: theme.palette.error.light,
                color: theme.palette.error.dark,
                borderColor: theme.palette.error.dark,
            },
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
        },
        icons: {
            color: theme.palette.grey.main,
            fontSize: '40px',
        },
        formBottom: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(4),
        },
        buttonText: {
            fontSize: '24px',
            fontWeight: 700,
            marginLeft: theme.spacing(1),
            textTransform: 'none',
            [theme.breakpoints.down('xs')]: {
                fontSize: '1rem',
            },
        },
        buttonIcon: {
            fontSize: '40px',
            [theme.breakpoints.down('xs')]: {
                fontSize: '1.5rem',
            },
        },
        formLabels: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: '14px'
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: theme.spacing(20),
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            },
        },
        subSection: {
            width: '48%',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
        },
        physiciansubSection: {
            width: '100%',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
        },
        subContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            },
        },
        dividerLine: {
            width: '100%',
            borderBottomStyle: 'solid',
            borderColor: theme.palette.grey.light,
            borderWidth: '2px',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(8),
        },
        connectedAlert: {
            width: '100%',
            backgroundColor: theme.palette.secondary.pale,
            color: theme.palette.secondary.dark,
            padding: theme.spacing(2, 0),
            marginBottom: theme.spacing(4),
            alignContent: 'center',
        },
        successAlert: {
            width: '100%',
            backgroundColor: theme.palette.secondary.pale,
            color: theme.palette.secondary.dark,
            padding: theme.spacing(2, 0),
            marginBottom: theme.spacing(4),
            alignContent: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
        successClose: {
            fontSize: '30px',
            marginRight: theme.spacing(2),
        },
        alertText: {
            display: 'flex',
            alignItems: 'center',
            maxWidth: '80%'
        },
        connectIcon: {
            padding: 'auto',
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            fontSize: '30px',
        },
        unconnectedAlert: {
            width: '100%',
            backgroundColor: theme.palette.primary.pale,
            color: theme.palette.primary.dark,
            padding: theme.spacing(2, 0),
            marginBottom: theme.spacing(4),
            alignContent: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
                alignItems: 'center',
            },
        },
        unconnectedText: {
            width: '70%',
            fontWeight: 400,
            [theme.breakpoints.down('xs')]: {
                width: '80%',
                marginBottom: theme.spacing(1)
            },
        },
        unconnectedButton: {
            [theme.breakpoints.down('xs')]: {
                width: '80%'
            },
        },
        infoIcon: {
            fontSize: '40px',
            color: theme.palette.primary.main,
            [theme.breakpoints.down('xs')]: {
                alignSelf: 'flex-end'
            },
        },
        contactToggle: {
            fontSize: '1rem',
            color: theme.palette.primary.main,
            textDecoration: 'underline',
            '&:hover': {
                cursor: 'pointer',
            },
        },

        modalHeader: {
            width: '100%',
            height: theme.spacing(4),
            borderRadius: 0,
        },
        modalIcon: {
            float: 'right',
            color: theme.palette.secondary.main,
            margin: theme.spacing(1),
            fontSize: '36px',
        },
        modalBody: {
            padding: theme.spacing(6),
            color: theme.palette.grey.dark,
        },
        modalField: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            height: '100%'
        },
        modalPaper: {
            width: '68%',
            backgroundColor: 'white',
            outline: 0,
            width:'75%',
            height:'500px'
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 0,
            border: '0px',

        },
        disconnectButton: {
            marginBottom: theme.spacing(5),
            marginTop: theme.spacing(2),
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main,
            '&:hover': {
                backgroundColor: theme.palette.error.light,
                color: theme.palette.error.dark,
                borderColor: theme.palette.error.dark,
            },
        },
        networksContainer: {
            backgroundColor: theme.palette.secondary.pale,
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: theme.palette.secondary.main,
            padding: theme.spacing(2, 4),
        },
        networksTop: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
            },
        },
        networkText: {
            width: '75%',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
        networkTile: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        networksDivider: {
            width: '100%',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2),
            borderColor: theme.palette.secondary.light,
            borderWidth: '1px',
            borderTopStyle: 'solid'
        },
        networkTileTitle: {
            fontWeight: '900',
        },
        networkTileText: {
            color: theme.palette.secondary.dark,
        },
        disconnectNetwork: {
            color: theme.palette.error.main,
        },
        chip: {

            justifyContent: 'center',
            margin:'20px',
            borderRadius: '5px',

            '& > *': {
                margin: theme.spacing(0.5),
            },
            '&:checked': {
                backgroundColor: 'orange',
            },
        },

        activechip: {
            background:'white',
            width:'100px',
            height:'25px',
            '&:focus': {
                backgroundColor: 'orange',
            },
        },

        inactivechip: {
            background:'blue',
            width:'100px',
            height:'25px',
            '&:focus': {
                backgroundColor: '#eee',
            },
        },

        physicianTextField: {
            width: '100%',

        },



        clickable: {


        },

    }))

const HealthDetails = () => {
    const classes = useStyles()
    const [profile, dispatch] = useContext(UserContext);
    const history = useHistory()
    const [error, setErrors] = useState(false)
    const [success, setSuccess] = useState(false)
    const parts = profile.date ? profile.date.split('-') : null
    const [date, handleDate] = useState( parts ? new Date(parts[0], parts[1]-1, parts[2]) : null)
    const [openAdd, setOpenAdd] = useState(false)


    let [activechip, setActiveChip] = useState(false)

    const [medicationdata, setMedicationData] = useState([]);
    const [diagnosisdata, setDiagnosisData] = useState([]);
    const [conditiondata, setConditionData] = useState([]);
    const [proceduredata, setProcedureData] = useState([]);
    const [illnessdata, setIllnessData] = useState([])
    const [allergiesdata, setAllergiesData] = useState([])



    const [records, setRecords] = useState([]);

    /*var val = profile.careProvider.contact?profile.careProvider.contact:"email";
    var matches = val.match(/\d+/g);
    var current_contacttype;
    if (matches === null) {
        current_contacttype = "email"
    }

    else current_contacttype = "phone"

    var [contactType, setContactType] = useState(current_contacttype === "email" ? "email" : "phone")


    //alert(profile.careProvider.contact)
    //contactType = current_contacttype;*/



    const [checkedItems, setCheckedItems] = useState({}); //plain object as state

    const[selectItems,setSelectItems]=useState([]);



    const cleanVitalsKey = (key) => {
        const keys = key.split('-')
        if (keys.length === 1) {
            return key
        }
        const first = keys.shift()
        return first + keys.map(k => k.charAt(0).toUpperCase() + k.slice(1)).join('')
    }

    const patientUrl = process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/patient/'

    useEffect(() => {



    const source = axios.CancelToken.source()


        axios.get(patientUrl + profile.patientID + '/manual-entry',
        {
            'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } ,
            cancelToken: source.token,
        })
        .then((resp) => {
        resp.data.fhir_manual_entry.manual_entry_data.forEach(vital => {
        const newVital = cleanVitalsKey(vital.key)
        console.log("key"+newVital);
    if(vital.details[0])

        profile[newVital] = vital.details[0].value


    if(vital.key === "medications") {

        console.log("vital"+JSON.stringify(vital))

        //profile.medications = vital.details
        //console.log("daaaa" + JSON.stringify(profile.medications))
        const medication = [...new Set(vital.details)]
        profile['medications'] = medication


        setMedicationData(profile.medications)
        //alert("sugi"+JSON.stringify(medicationdata))

    }

    if(vital.key === "diagnosis") {


        //profile.medications = vital.details
        //console.log("daaaa" + JSON.stringify(profile.medications))
        const diagnosis = [...new Set(vital.details)]
        profile['diagnosis'] = diagnosis



        setDiagnosisData(profile.diagnosis)


        //alert("sugi"+JSON.stringify(profile.diagnosis))


    }


    if(vital.key === "procedures") {


        //profile.medications = vital.details
        //console.log("daaaa" + JSON.stringify(profile.medications))
        const procedure = [...new Set(vital.details)]
        profile['procedures'] = procedure



        setProcedureData(profile.procedures)


        //alert("sugi"+JSON.stringify(profile.diagnosis))


    }


    if(vital.key === "conditions") {


        //profile.medications = vital.details
        //console.log("daaaa" + JSON.stringify(profile.medications))
        const conditions = [...new Set(vital.details)]
        profile['conditions']= conditions



        setConditionData(profile.conditions)


        //alert("sugi"+JSON.stringify(profile.diagnosis))


    }
    if(vital.key === "allergies") {


        //profile.medications = vital.details
        //console.log("daaaa" + JSON.stringify(profile.medications))
        const allergies = [...new Set(vital.details)]
        profile['allergies']= allergies



        setAllergiesData(profile.allergies)


        //alert("sugi"+JSON.stringify(profile.allergies))


    }


    //console.log("prf val"+profile.physName);
})

})
.catch(err => console.log(err))

    return () => {
        source.cancel()
    }

}, []);








    const handleCloseSuccess = () => {
        setSuccess(false)
    }

    const mostCommonDiagn = ['Cancer', 'Diabetes', 'Heart Disease', 'Asthma']

    const disconnectNetwork = (network) => {
        axios.delete(process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/patient/' + profile.patientID + '/healthcare-system',
            { 'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` }})
            .then(response => {
            if (response.data.success) {
            console.log('disconnected')
            dispatch({type: 'disconnect network'})
        }
    })
    .catch((error) => {
            if (error.response && error.response.data === 'Token is expired') {
            console.log('Token is expired')
            dispatch(({type: 'token expired'}))
        }
        console.log('Error ', error)
        setErrors({message: 'Something went wrong disconnecting your health networks.', color: 'error', icon: true})
    })
        // dispatch({type: 'remove network', payload: { network }})
        // console.log("Disconnect network")
    }

    const handleCloseError = () => {
        setErrors(false)
    }

    const addNetwork = () => {
        history.push('/patient/healthcare/register')
    }

    const renderNetwork = (network) => {
        return (
            <div className={classes.networkTile} key={network.id}>
    <Typography variant='body1' className={classes.networkTileText}>
        You are connected to: <span className={classes.networkTileTitle}>{network.name}</span>
        </Typography>
        {/* <Button className={classes.disconnectNetwork} onClick={() => disconnectNetwork(network)}>
         Disconnect
         </Button> */}
        </div>
    )
    }


    return (
        <Page >
        <Paper className={classes.paper} elevation={6}>
        <div className={classes.title}>
<Typography component="h1" variant="h1" className={classes.titleText}>
    Your Health Details
    </Typography>
    </div>
    <div className={classes.container}>

    {profile.networks.length > 0 ?

    <>
    <div className={classes.networksContainer}>
    <Typography variant='h5' >
        Your Health Data Connection:
        </Typography>
    <div className={classes.networksTop}>
    <Typography variant='body1' className={classes.networkText}>
        You may have more than one doctor, network, or health insurer that holds your health information and data. You can add more by clicking the button "Add New Connection"
    </Typography>
    <Button
        variant='outlined'
        color='secondary'
        onClick={addNetwork}>
            Add New Connection
    </Button>
    </div>
    <div className={classes.networksDivider}></div>
    <div className={classes.networksBottom}>
        {profile.networks.map(network => renderNetwork(network))}
    </div>

    </div>

    <Button
        variant='outlined'
        className={classes.disconnectButton}
        onClick={disconnectNetwork}>
            Disconnect All Networks
    </Button>
    </>
    :

    <div className={classes.unconnectedAlert}>
    <InfoIcon className={classes.infoIcon}/>
    <Typography variant={'h5'} className={classes.unconnectedText}>
        We recommend that you connect to your health network in order to have more accurate health information.
    </Typography>
    <Button
        variant='contained'
        color='primary'
        href={"/patient/healthcare/register"}
        className={classes.unconnectedButton}>
    <LinkIcon className={classes.buttonIcon}/>
        Connect To Your Health Data
    </Button>
    </div>
    }

<Formik
    initialValues={{

            physName: profile.careProvider ? profile.careProvider.name ? profile.careProvider.name : '' : '',
            physEmail: profile.careProvider ? profile.careProvider.email ? profile.careProvider.email : '' : '',
            physContact: profile.careProvider ? profile.careProvider.contact ? profile.careProvider.contact : '' : '',
    }}
    onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);


       const careProvider = {
            // name: values.physName ? values.physName.trim() : profile.careProvider ? profile.careProvider.name : undefined,
            //contact: values.physContact ? values.physContact.trim() : profile.careProvider ? profile.careProvider.contact: undefined
            name: values.physName ? values.physName.trim() : '',
            email: values.physEmail ? values.physEmail.trim() : '',
            contact: values.physContact ? values.physContact.trim() : ''
        }


        const user = {
                ...profile,
            careProvider


    }


        updateDiagnosis(user, dispatch)
            .then(resp => {
            dispatch({type: 'update diagnosis', payload: user})
            setSuccess({message: 'You have successfully updated your account'})
        })
    .catch(err => {
            setErrors({message: 'Something went wrong updating your account.', color: 'error', icon: true})
        })


        setSubmitting(false)
    }}
    validationSchema={Yup.object().shape({

        physName: Yup.string()
            .nullable(),
        //physEmail: Yup.string().matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,'Enter valid email'),

    //physContact: Yup.string().matches(/^[789]\d{9}$/,'Enter Valid Phone Number')

})}
>
    {(props) => {
        const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            } = props;





        return (

            <form className={classes.form} onSubmit={handleSubmit} noValidate>




        {/*<div className={classes.formLabels}>


       <Typography component="h1" variant="subtitle2" >
            Select Your Diagnosis
        </Typography>

        <Typography component="h1" variant="body1" >
            Required
            </Typography>
            </div>
             <FormControl variant="outlined"
        id='diagnosis'
        fullWidth
        name='diagnosis'
        className={classes.textField}
        error={touched.diagnosis && errors.diagnosis}
    >
    <Autocomplete
        value={values.diagnosis}
        onChange={handleChange}
        onBlur={(e) => {
            handleBlur(e)
            handleChange(e)
        }}
        id="diagnosis"
        name='diagnosis'
        options={mostCommonDiagn}
        freeSolo
        renderInput={(params) => (
        <TextField
        error={touched.diagnosis && errors.diagnosis}
        helperText={(errors.diagnosis && touched.diagnosis) ? errors.diagnosis : ""}
        {...params}
        id="diagnosis"
        placeholder="Or type in your diagnosis if it's not listed"
        name='diagnosis'
        variant="outlined" required/>
    )}
    />
    </FormControl>

        <div className={classes.subContainer}>
    <div className={classes.subSection}>
    <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            Stage of disease:
            </Typography>
        </div>
        <TextField
        value={values.stage}
        error={touched.stage && errors.stage}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        margin="normal"
        required
        className={classes.textField}
        fullWidth
        name="stage"
        id="stage"
        InputProps={{
            startAdornment: (
            <InputAdornment position={"start"} >
                <HotelIcon className={classes.icons}/>
        </InputAdornment>
        )
        }}
    />
    </div>

        <div className={classes.subSection}>
    <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            The date of your diagnosis:
            </Typography>
        </div>
        <KeyboardDatePicker
        disableFuture
        value={date}
        onChange={date => handleDateChange(date)}
        error={touched.date && errors.date}
        onBlur={handleBlur}
        inputVariant="outlined"
        margin="normal"
        format="MM/dd/yyyy"
        placeholder="MM/DD/YYYY"
        fullWidth
        className={classes.textField}
        name="date"
        id="date"
        InputProps={{
            startAdornment: (
            <InputAdornment position={"start"}>
                <DateRangeIcon className={classes.icons}/>
        </InputAdornment>
        )
        }}
    />
    </div>
        </div>

        <div className={classes.subContainer}>
    <div className={classes.subSection}>
    <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            Your current treatment, if any:
    </Typography>
        <Tooltip arrow placement="top" disableFocusListener interactive title='Optional field. If this field does not apply to your current situation, or you are unsure what to put, feel free to leave this blank.'>
            <HelpIcon color='secondary'/>
            </Tooltip>
            </div>
            <TextField
        value={values.treatment}
        error={touched.treatment && errors.treatment}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        margin="normal"
        required
        className={classes.textField}
        fullWidth
        name="treatment"
        placeholder={'e.g. chemotherapy'}
        id="treatment"
        InputProps={{
            startAdornment: (
            <InputAdornment position={"start"} >
                <HotelIcon className={classes.icons}/>
        </InputAdornment>
        )
        }}
    />
    </div>

        <div className={classes.subSection}>
    <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            What medications are you taking?
    </Typography>
        <Tooltip arrow placement="top" disableFocusListener interactive title='Optional field. If this field does not apply to your current situation, or you are unsure what to put, feel free to leave this blank.'>
            <HelpIcon color='secondary'/>
            </Tooltip>
            </div>
            <TextField
        value={values.medications}
        error={touched.medications && errors.medications}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        margin="normal"
        required
        className={classes.textField}
        fullWidth
        name="medications"
        id="medications"
        placeholder={'e.g. Tamoxofen'}
        InputProps={{
            startAdornment: (
            <InputAdornment position={"start"} >
                <LocalPharmacyIcon className={classes.icons}/>
        </InputAdornment>
        )
        }}
    />
    </div>
        </div>

        <div className={classes.dividerLine}/>*/}

    <div className={classes.subContainer}>
    <div className={classes.physiciansubSection}>
    <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            Primary Physician:
            </Typography>
        </div>
        <TextField
        value={values.physName}
        error={touched.physName && errors.physName}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        margin="normal"
        required
        className={classes.physicianTextField}
        fullWidth
        name="physName"
        id="physName"
        InputProps={{
            startAdornment: (
            <InputAdornment position={"start"} >
                <PersonIcon className={classes.icons}/>
        </InputAdornment>
        )
        }}
    />
    </div>
</div>
        <div className={classes.subContainer}>
        <div className={classes.subSection}>

    <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            Contact Email:
            </Typography>

        </div>

        <TextField
        value={values.physEmail}
        error={touched.physEmail && errors.physEmail}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        margin="normal"
        required
        className={classes.textField}
        fullWidth
        name="physEmail"
        id="physEmail"
        InputProps={{
            startAdornment: (
            <InputAdornment position={"start"} >

        <EmailIcon className={classes.icons}/>

        </InputAdornment>
        )
        }}
    />




    </div>


        <div className={classes.subSection}>
    <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            Contact Phone:
    </Typography>

        </div>
        <TextField
        value={values.physContact}
        error={touched.physContact && errors.phyContact}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        margin="normal"
        required
        className={classes.textField}
        fullWidth
        name="physContact"
        id="physContact"
        InputProps={{
            startAdornment: (
            <InputAdornment position={"start"} >

        <CallIcon className={classes.icons}/>

        </InputAdornment>
        )
        }}
    />




    </div>





        </div>

        {success ?
        <div className={classes.successAlert}>
    <Typography variant='body1' className={classes.alertText}>
    <span><CheckIcon className={classes.connectIcon}/></span>
        {success.message}
    </Typography>
        <CloseIcon  onClick={handleCloseSuccess} className={classes.successClose}/>
    </div> : null }
    <ErrorMessage errors={error} handleClose={handleCloseError}/>

            <div className={classes.buttonContainer}>
    <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submitFull}
        disabled={isSubmitting}
            >
            <HealingIcon className={classes.buttonIcon}/>
    <Typography variant={"button"} className={classes.buttonText}>
        Update Your Health Details
        </Typography>
        </Button>

        </div>

        </form>
    );
    }}
</Formik>
    </div>
    </Paper>
    </Page>
)
}

export default HealthDetails