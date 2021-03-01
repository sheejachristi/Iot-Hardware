import { useIntl } from 'react-intl'
import Page from './Page'
import React, {useState, useContext, useEffect} from 'react';
// import Auth from '../utils/auth';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import {useHistory} from 'react-router-dom'
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import RepeatIcon from '@material-ui/icons/Repeat';
import PersonIcon from '@material-ui/icons/Person';
import {Formik, isEmptyArray} from 'formik';
import * as Yup from 'yup';
import IconButton from "@material-ui/core/IconButton";
import { UserContext} from "../context/user-context";
import CakeIcon from '@material-ui/icons/Cake';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PinDropIcon from '@material-ui/icons/PinDrop';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import axios from "../utils/axios";
import ErrorMessage from '../components/ErrorMessage'
import { KeyboardDatePicker } from "@material-ui/pickers";
import { format, isValid } from 'date-fns'
import Modal from '@material-ui/core/Modal';
import Icon from "@material-ui/core/Icon";
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {updateUser} from '../utils/userActions'

const useStyles = makeStyles((theme) => ({
        root: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            alignContent: "center",
            justifyContent: "center",

        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: theme.palette.grey.dark,
        },
        avatar: {
            margin: theme.spacing(1),
            width: 192,
            height: 192,
            color: theme.palette.secondary.main,
        },
        form: {
            marginTop: theme.spacing(1),
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.up('md')]: {
                flexDirection: 'row',
            },
            justifyContent: 'space-between',
            marginBottom: theme.spacing(20),
        },
        submit: {
            width: '66%',
            height: '80px',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                marginBottom: theme.spacing(2),
            },
            [theme.breakpoints.down('xs')]: {
                height: '60px'
            },
        },
        delete: {
            width: '100%',
            borderWidth: '2px',
            height: '80px',
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main,
            '&:hover': {
                backgroundColor: theme.palette.error.light,
                color: theme.palette.error.dark,
                borderColor: theme.palette.error.dark,
            },
            [theme.breakpoints.up('md')]: {
                width: '31%',
            },
            [theme.breakpoints.down('xs')]: {
                height: '60px'
            },
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: `100%`,
            width: '90%',
            maxWidth: '75rem'
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
        passwordContainer: {
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.up(620 + theme.spacing(6))]: {
                flexDirection: 'row',
            },
            justifyContent: 'space-between',
            borderBottomStyle: 'solid',
            borderColor: theme.palette.grey.light,
            borderWidth: '2px',
        },
        password: {
            width: '100%',
            [theme.breakpoints.up(620 + theme.spacing(6))]: {
                width: '49%',
            },
        },
        margin: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2),
        },
        confirmPasswordField: {
            paddingBottom: theme.spacing(4),
            marginBottom: theme.spacing(4),
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderBottomColor: theme.palette.grey.light,
        },
        icons: {
            color: theme.palette.grey.main,
            fontSize: '40px',
        },
        emailField: {
            paddingBottom: theme.spacing(4),
            marginBottom: theme.spacing(4),
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderBottomColor: theme.palette.grey.light,
        },
        genderSelector: {
            width: '100%',
            marginBottom: theme.spacing(4),
            [theme.breakpoints.up(800)]: {
                width: '31%',
                marginBottom: 0,
            },
        },
        birthday: {
            width: '100%',
            [theme.breakpoints.up(800)]: {
                width: '31%',
            },
        },
        zipcode: {
            width: '100%',
            [theme.breakpoints.up(800)]: {
                width: '100%',
            },
        },
        formBottom: {
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.up(800)]: {
                flexDirection: 'row',
            },
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
        modalPaper: {
            width: '68%',
            backgroundColor: 'white',
            outline: 0,
            [theme.breakpoints.down('sm')]: {
                width: '85%'
            }
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 0,
            border: '0px'
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
            textAlign: 'center',
        },
        deleteButton: {
            marginRight: theme.spacing(2),
        },
        modalText: {
            marginBottom: theme.spacing(4),
            width: '90%',
            textAlign: 'left',
            margin: 'auto',
        },
        modalTitle: {
            marginBottom: theme.spacing(4),
            width: '60%',
            textAlign: 'center',
            margin: 'auto',
        },
        modalButtons: {
            width: '90%',
            textAlign: 'left',
            margin: 'auto',
            marginBottom: theme.spacing(4),
        }
    }))


const AccountUpdate = () => {
    const classes = useStyles()
    const intl = useIntl()
    const history = useHistory()
    const [formErrors, ] = useState([]);
    const [open, setOpen] =useState(false)
    const [profile, dispatch] = useContext(UserContext);
    const [success, setSuccess] = useState(false)
    const [error, setErrors] = useState(false)
    // converts any saved birthday string to a date object for the date picker
    const parts = profile.birthday ? profile.birthday.split('-') : null
    const initialName=profile.lastName!=undefined?profile.firstName+' '+profile.lastName:profile.firstName
    const [birthday, handleChangeBirthday] = useState(parts ? new Date(parts[0], parts[1]-1, parts[2]) : '')

    const [fhirval, setFhirval] = useState([])


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
        //console.log("checkedItems: ", checkedItems);


        const source = axios.CancelToken.source()


        axios.get(patientUrl + profile.patientID + '/manual-entry',
        {
            'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } ,
            cancelToken: source.token,
        })
        .then((resp) => {var cloneArray = JSON.parse(JSON.stringify(resp.data));

    setFhirval(cloneArray);
    resp.data.fhir_manual_entry.manual_entry_data.forEach(vital => {
        const newVital = cleanVitalsKey(vital.key)
        console.log("key"+newVital);

    // profile[newVital] = vital.details[0].value
    //profile[newVital] = vital

    if(vital.key === "medications") {

        console.log("vital"+JSON.stringify(vital))

        //profile.medications = vital.details
        //console.log("daaaa" + JSON.stringify(profile.medications))
        const medication = [...new Set(vital.details)]
        profile['medications'] = medication


        //setMedicationData(profile.medications)
        //alert("sugi"+JSON.stringify(medicationdata))

    }

    if(vital.key === "diagnosis") {


        //profile.medications = vital.details
        //console.log("daaaa" + JSON.stringify(profile.medications))
        const diagnosis = [...new Set(vital.details)]
        profile['diagnosis'] = diagnosis



        //setDiagnosisData(profile.diagnosis)


        //alert("sugi"+JSON.stringify(profile.diagnosis))


    }



    if(vital.key === "procedures") {


        //profile.medications = vital.details
        //console.log("daaaa" + JSON.stringify(profile.medications))
        const procedure = [...new Set(vital.details)]
        profile['procedures'] = procedure





    }


    else  profile['procedures'] = []


    if(vital.key === "conditions") {


        //profile.medications = vital.details
        //console.log("daaaa" + JSON.stringify(profile.medications))
        const conditions = [...new Set(vital.details)]
        profile['conditions']= conditions



        //setIllnessData(profile.conditions)


        //alert("sugi"+JSON.stringify(profile.diagnosis))


    }
    if(vital.key === "allergies") {


        //profile.medications = vital.details
        //console.log("daaaa" + JSON.stringify(profile.medications))
        const allergies = [...new Set(vital.details)]
        profile['allergies']= allergies



        //setAllergiesData(profile.allergies)


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

    const handleCloseError = () => {
        setErrors(false)
    }

    const handleCloseConfirm = () => {
        setOpen(false)
    }

    const handleDeleteAccount = () => {
        axios.delete(process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/user/' + profile.uid,
            { 'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` }})
            .then(response => {
            if (response.data.success === true) {
            console.log('deleted')
            dispatch({type: 'logout'})
            history.push("/register")
        }
    })
    .catch((error) => {
            if (error.response && error.response.data === 'Token is expired') {
            console.log('Token is expired')
            dispatch(({type: 'token expired'}))
        }
        console.log('Error ', error)
        setErrors({message: 'Something went wrong deleting your account.', color: 'error', icon: true})
    })
    }

    return (
        <Page pageTitle={intl.formatMessage({ id: 'sign_in' })}>
<Paper className={classes.paper} elevation={6}>
        <div className={classes.title}>
<Typography component="h1" variant="h1" className={classes.titleText}>
    Your Account
    </Typography>
    </div>

    <div className={classes.container}>

    {/* Modal to ask for confirmation on deleting their account */}
<Modal
    open={open}
    onClose={handleCloseConfirm}
    disableEnforceFocus={true}
    className={classes.modal}
>
<div className={classes.modalPaper}>
<div className={classes.modalHeader}>
<Icon><CloseIcon className={classes.modalIcon} onClick={handleCloseConfirm}/></Icon>
        </div>
        <div className={classes.modalBody}>
<Typography component={"h1"} variant={"h1"} className={classes.modalTitle}>
    Are you sure you wish to delete your account?
</Typography>

    <Typography component={"h4"} variant={"h4"} className={classes.modalText}>
    You are about to permanently delete all your information and details. If you still wish to continue, then click "Yes, delete my account", if not just click "Cancel"
    </Typography>

    <div className={classes.modalButtons}>
<Button
    type={"button"}
    variant='contained'
    color='secondary'
    className={classes.deleteButton}
    startIcon={<DeleteForeverIcon/>}
    onClick={() => handleDeleteAccount()}
>
    Yes, delete my account
    </Button>
    <Button
    type={"button"}
    variant='outlined'
    color='primary'
    className={classes.cancelDeleteButton}
    startIcon={<CancelIcon/>}
    onClick={handleCloseConfirm}
        >
        Cancel
        </Button>
        </div>
        </div>
        </div>
        </Modal>

        <Typography component={"h1"}>
        {!isEmptyArray(formErrors) &&
    <Alert severity={"error"}>{formErrors[0]}</Alert>
}
</Typography>
    <Formik
    initialValues={{name: profile.lastName!=undefined?profile.firstName+' '+profile.lastName:profile.firstName,
        email: profile.email,
        password: "",
        confirmPassword: "",
        showPassword: false,
        gender: profile.gender,
        ethnicity: profile.ethnicity,
        birthday: profile.birthday ? profile.birthday : null,
        zipcode: profile.zipcode
    }}
    onSubmit={async (values, { setSubmitting }) => {
        setSuccess(false);

        values.birthday = format(birthday, 'yyyy-MM-dd')

        if (values.birthday && values.name  && values.email) {
            setSubmitting(true);
            const user = {
                firstName: (values.name.split(" "))[0],
                lastName: (values.name.split(" "))[1]!=undefined?(values.name.split(" "))[1]:null,
                email: values.email,
                password: values.password ? values.password : profile.password,
                gender: values.gender,
                ethnicity: values.ethnicity,
                birthday: values.birthday ? values.birthday : profile.birthday,
                zipcode: values.zipcode ? values.zipcode : profile.zipcode,
                //medications: values.medications? values.medications : values.medications=[],
                //diagnosis: values.diagnosis? values.diagnosis : values.diagnosis=[],
                //conditions: values.conditions? values.conditions : values.conditions=[],
                //allergies: values.allergies? values.allergies : values.allergies=[]
            }

            const diff_ms = Date.now() - new Date (user.birthday).getTime()
            const age_dt = new Date(diff_ms);
            user.age = Math.abs(age_dt.getUTCFullYear() - 1970)




            const account = {...profile, ...user}

            if(initialName!=values.name||profile.zipcode!=values.zipcode||profile.gender!=values.gender||profile.ethnicity!=values.ethnicity||profile.birthday!=values.birthday)
            {


                updateUser(account, dispatch)
                    .then(resp => {
                setSuccess({message: 'You have successfully updated your account'})
            })
            .catch(err => {
                setErrors({message: 'Something went wrong updating your account.', color: 'error', icon: true})
            })
                // try {
                //     await dispatch({type: 'update', payload: user});
                //     console.log('After dispatch')
                //     setSuccess({message: 'You have successfully updated your account'})
                // } catch {
                //     setErrors({message: 'Something went wrong updating your account.', color: 'error', icon: true})
                // }
            }
        }
        setSubmitting(false)
    }}
    validationSchema={Yup.object().shape({
        email: Yup.string()
            .email()
            .required('Required'),
        name: Yup.string()
            .required('Required'),
        password: Yup.string()
            .min(8, intl.formatMessage({id: 'password_minimum'})),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], intl.formatMessage({id: 'password_no_match'})),
        // .required(intl.formatMessage({id: 'confirm_password'}))
        birthday: Yup.date()
            .nullable()
            .required('Please give valid Date of birth!'),
        gender: Yup.string(),
        ethnicity: Yup.string()
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
            setFieldValue,
            } = props;

        const handleDateChangeBirthday = (date) => {
            if (isValid(date)) {
                values.birthday = format(date, 'yyyy-MM-dd')
                console.log('Valid date')
            } else {
                console.log('Invalid date')
                values.birthday = null
            }
            handleChangeBirthday(date)
        }

        return (
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            Your Full Name:
            </Typography>
        <Typography component="h1" variant="body1" >
            Required
            </Typography>
            </div>
            <TextField
        value={values.name}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        InputProps={{
            startAdornment: (
            <InputAdornment position={"start"} >
                <AccountCircle className={classes.icons}/>
        </InputAdornment>
        )
        }}
        name="name"
        autoComplete="name"
        error={errors.name && touched.name}
        helperText={(touched.name && errors.name) ? errors.name : "" }

    />

    <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            Your Email:
            </Typography>
        <Typography component="h1" variant="body1" >
            Required
            </Typography>
            </div>
            <TextField
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        margin="normal"
        disabled
        required
        fullWidth
        id="email"
        InputProps={{
            startAdornment: (
            <InputAdornment position={"start"} >
                <EmailIcon className={classes.icons}/>
        </InputAdornment>
        )
        }}
        name="email"
        autoComplete="email"
        error={errors.email && touched.email}
        helperText={(errors.email && touched.email) ? errors.email : ""}
    />

    <div className={classes.passwordContainer}>
    <div className={classes.password}>
    <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            Update Password:
            </Typography>
        </div>
        <TextField
        id="password"
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        error={errors.password && touched.password}
        helperText={(errors.password && touched.password) ? errors.password : ""}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        fullWidth
        InputProps={{
            startAdornment:
                <InputAdornment position={"start"} >
                <VpnKeyIcon className={classes.icons}/>
        </InputAdornment>,
                endAdornment:
        <InputAdornment
            position={"end"}
            className={classes.icons}
            edge={"end"}
            aria-label={"Toggle password visibility"}
                >
                <IconButton
            onClick={() => setFieldValue("showPassword", !values.showPassword)}

            color={"inherit"}>{values.showPassword ? <Visibility/> : <VisibilityOff/>}
        </IconButton>
            </InputAdornment>,
        }}
        autoComplete="current-password"
            />
            </div>

            <div className={classes.password}>
    <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            Repeat Password:
            </Typography>
        </div>
        <TextField
        id="confirmPassword"
        type={values.showPassword ? "text" : "password"}
        value={values.confirmPassword}
        error={errors.confirmPassword && touched.confirmPassword}
        helperText={(errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : "")}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        fullWidth
        name="confirmPassword"
        InputProps={{
            startAdornment:
                <InputAdornment position={"start"} >
                <RepeatIcon className={classes.icons}/>
        </InputAdornment>,
                endAdornment:
        <InputAdornment
            position={"end"}
            className={classes.icons}
            edge={"end"}
            aria-label={"Toggle password visibility"}
                >
                <IconButton
            onClick={() => setFieldValue("showPassword", !values.showPassword)}

            color={"inherit"}>{values.showPassword ? <Visibility/> : <VisibilityOff/>}
        </IconButton>
            </InputAdornment>,
        }}
    />
    </div>
        </div>

        <div className={classes.formBottom}>
    <div className={classes.birthday}>
    <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            Date of birth:
            </Typography>
        <Typography component="h1" variant="body1" >
            Required
            </Typography>
            </div>
            <KeyboardDatePicker
        id="birthday"
        inputVariant="outlined"
        format="MM/dd/yyyy"
        disableFuture
        error={touched.birthday && errors.birthday}
        helperText={(touched.birthday && errors.birthday) ? errors.birthday : ""}
        fullWidth
        value={birthday}
        onChange={handleDateChangeBirthday}
        placeholder="MM/DD/YYYY"
        onBlur={handleBlur}
        InputProps={{
            startAdornment: (
            <InputAdornment position={"start"} >
                <CakeIcon className={classes.icons}/>
        </InputAdornment>
        )
        }}
    />
    </div>

        <div className={classes.genderSelector}>
    <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            Gender:
    </Typography>
        </div>
        <FormControl variant="outlined" id='gender' fullWidth style={{marginTop: '8px'}}>
    <Select
        id="gender"
        value={values.gender}
        onChange={handleChange}
        onBlur={handleBlur}
        name='gender'
        fullWidth
        >
        <MenuItem value="">
            <em>None</em>
            </MenuItem>
            <MenuItem value={'Male'}>Male</MenuItem>
            <MenuItem value={'Female'}>Female</MenuItem>
            <MenuItem value={'Undefined'}>Decline to Answer</MenuItem>
        </Select>
        </FormControl>
        </div>


        <div className={classes.genderSelector}>
    <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            Ethnicity:
    </Typography>
        </div>
        <FormControl variant="outlined" id='ethnicity' placeholder='choose'  fullWidth style={{marginTop: '8px'}}>
    <Select
        id="ethnicity"
        value={values.ethnicity}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={'(e.g. Latino)'}
        name='ethnicity'
        fullWidth
        >
        <MenuItem value={""} disabled>
        (e.g. Latino)
        </MenuItem>
        <MenuItem value={'Hispanic  or Latino'}>Hispanic  or Latino</MenuItem>
        <MenuItem value={'American Indian or Alaska Native'}>American Indian or Alaska Native</MenuItem>
        <MenuItem value={'Asian'}>Asian</MenuItem>
            <MenuItem value={'Black or African American'}>Black or African American</MenuItem>
        <MenuItem value={'Native Hawaiian or Other Pacific Islander'}>Native Hawaiian or Other Pacific Islander</MenuItem>
        <MenuItem value={'White'}>White</MenuItem>
            <MenuItem value={'Undefined'}>Decline to Answer</MenuItem>
        <MenuItem value={'Others'}>Others</MenuItem>
            </Select>
            </FormControl>
            </div>

            </div>



            <div className={classes.zipcode}>
    <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            Zipcode:
    </Typography>
        </div>
        <TextField
        value={values.zipcode}
        error={touched.zipcode && errors.zipcode}
        helperText={(touched.zipcode && errors.zipcode) ? errors.zipcode : ""}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        margin="normal"
        fullWidth
        id="zipcode"
        name="zipcode"
        InputProps={{
            startAdornment: (
            <InputAdornment position={"start"} >
                <PinDropIcon className={classes.icons}/>
        </InputAdornment>
        )
        }}
    />
    </div>



        {/* Displays a success message on successful API call */}
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
        className={classes.submit}
        disabled={isSubmitting}
            >
            <PersonIcon className={classes.buttonIcon}/>
    <Typography variant={"button"} className={classes.buttonText}>
        Update Your Account
        </Typography>
        </Button>

        <Button
        type="button"
        fullWidth
        variant="outlined"
        className={classes.delete}
        disabled={isSubmitting}
        onClick={() => setOpen(true)}
    >
    <DeleteIcon className={classes.buttonIcon}/>
    <Typography variant={"button"} className={classes.buttonText}>
        Delete Account
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

export default AccountUpdate