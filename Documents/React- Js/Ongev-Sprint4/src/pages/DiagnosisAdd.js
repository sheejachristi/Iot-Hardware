import {useHistory} from 'react-router-dom'
import {useIntl} from 'react-intl'
import PreAuthPage from './PreAuthPage'
import React, {useContext, useState, useEffect} from 'react';
import { UserContext} from "../context/user-context";
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import {Formik} from "formik";
import * as Yup from "yup";
import { format, isValid } from 'date-fns'
import { onboardManual } from '../utils/userActions';
import PersonalInformation from '../components/HealthSlides/PersonalInformation'
import HealthInformation from '../components/HealthSlides/HealthInformation'
import Interests from '../components/HealthSlides/Interests'
import Alert from '@material-ui/lab/Alert';
import axios from "../utils/axios";

const useStyles = makeStyles((theme) => ({
        paper: {
            width: 'auto',
            [theme.breakpoints.up(620 + theme.spacing(6))]: {
                width: '80%',
                marginLeft: 'auto',
                marginRight: 'auto'
            },
            marginTop: theme.spacing(10),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: theme.palette.grey.dark,
            padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
            marginBottom: theme.spacing(3),
        },
        avatar: {
            margin: theme.spacing(1),
            width: 192,
            height: 192,
            color: theme.palette.secondary.main,
        },
        form: {
            marginTop: theme.spacing(1),
            width: '90%'
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            padding: theme.spacing(2, 0),
            backgroundColor: theme.palette.tertiary.main,
            color: theme.palette.tertiary.contrastText,
            fontSize: '24px',
            marginBottom: theme.spacing(4),
            '&:hover': {
                backgroundColor: theme.palette.tertiary.dark,
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '18px',
            }
        },
        submitIcon: {
            marginRight: theme.spacing(1),
            fontSize: '40px',
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: `100%`,
            width: '100%'
        },
        iconButton: {
            color: "#ffff",
        },
        textField: {
            marginBottom: theme.spacing(6),
        },
        title: {
            marginBottom: theme.spacing(4),
            marginTop: theme.spacing(4),
        },
        titleBody: {
            width: '85%',
            textAlign: 'center',
            marginBottom: theme.spacing(4),
        },
        icons: {
            color: theme.palette.grey.main,
            fontSize: '36px',
        },
        formBottom: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: theme.spacing(6),
            borderTopStyle: 'solid',
            borderColor: theme.palette.grey.light,
            borderWidth: '1px',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            }
        },
        genderSelector: {
            width: '100%',
            marginTop: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                marginBottom: theme.spacing(5),
            }
        },
        birthday: {
            width: '100%',
        },
        lowerContainer: {
            width: '45%',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            }
        },
        formLabels: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: '14px'
        },
        slideButtons: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: theme.spacing(6),
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
                height: '12rem'
            },
            [theme.breakpoints.up('xl')]: {
                width: '94%',
                margin: 'auto',
            },
        },
        slideButton: {
            height: '5rem',
            width: '20rem',
            fontSize: '1.5rem',
            [theme.breakpoints.down('xs')]: {
                width: 'auto',
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
    }))

const DiagnosisAdd = () => {
    const classes = useStyles()
    const intl = useIntl()
    const history = useHistory()
    const [profile, dispatch] = useContext(UserContext);
    const parts = profile.birthday ? profile.birthday.split('-') : null
    const [birthday, handleChangeBirthday] = useState(parts ? new Date(parts[0], parts[1]-1, parts[2]) : null)
    const [slide, setSlide] = useState(1)
    const [interests, setInterests] = useState(profile.interests && profile.interests.length > 0 ? profile.interests : [])
    const [error, setError] = useState(false)

    const nextSlide = () => {
        //if (slide <= 2) {
            setSlide(slide + 2)
        //}
    }

    const lastSlide = () => {
        if (slide > 1) {
            setSlide(slide - 2)
        }
    }

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
        .then((resp) => {

        if(resp.data.fhir_manual_entry.manual_entry_data.length>0) {

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



        // setProcedureData(profile.procedures)


        //alert("sugi"+JSON.stringify(profile.diagnosis))


    }


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
}) }

})
.catch(err => console.log(err))

    return () => {
        source.cancel()
    }

}, []);





    const convertHeight = (string) => {

        if (typeof string === 'string' && string.split("'").length > 1) {
            let newHeight = string.split('"').join('')
            newHeight = newHeight.split("'")
            if (newHeight[0] === '') {newHeight[0] = '0'}
            if (newHeight[1] === '' || newHeight[1] === ' ') {newHeight[1] = '0'}
            newHeight = (parseInt(newHeight[0]) * 12) + parseInt(newHeight[1])
            return newHeight ? newHeight.toString() : newHeight
        } else {
            return  parseInt(string) ? parseInt(string).toString() : null
        }
    }

    const parseHeight = (height) => {
        if (height.split("'").length > 1 ) {
            return height
        } else {
            const feet = Math.floor(parseInt(height)/ 12)
            const inches = Math.floor(parseInt(height) % 12)
            return `${feet}' ${inches}"`
        }
    }

    const convertWeight = (string) => {
        return parseInt(string) ? parseInt(string).toString() : null
    }

    const helperText = slide === 3 ? 'Choose as many of the following topics as you wish related to your personal interests about your health.' : 'Fill out the information below so that we can find accurate and helpful clinical trial information that matches your health details.'

    return (

        <PreAuthPage pageTitle={intl.formatMessage({id: 'sign_in'})}>
<Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
<Typography component="h1" variant="h1" className={classes.title}>
    {slide === 3 ? "Add Your Health Interests"  : "Add Your Details"}
</Typography>
    <Typography component="h3" variant="h3" className={classes.titleBody}>
    {helperText}
</Typography>
    <Formik
    initialValues={{
        diagnosis: profile.diagnosis ? profile.diagnosis : null,
            medications:  profile.medications ? profile.medications : '',
            gender: profile.gender,
            birthday: profile.birthday,
            bloodType: profile.bloodType || '',
            ethnicity: profile.ethnicity || '',
            height: profile.height ? parseHeight(profile.height) : '',
            feet: profile.height ?  Math.floor(parseInt(profile.height)/ 12) : undefined,
            inches: profile.height ? Math.floor(parseInt(profile.height) % 12) : undefined,
            weight: profile.weight || '',
            familyHistory: profile.familyHistory || '',
            conditions: profile.conditions || '',
            allergies: profile.allergies || '',
            procedures: profile.procedures || '',
    }}
    validationSchema={Yup.object().shape({
        diagnosis: Yup.string()
            .nullable(),
        birthday: Yup.date()
            .nullable(),
        procedures: Yup.string()
            .nullable(),
        medications: Yup.string()
            .nullable(),
        gender: Yup.string()
            .nullable(),
        bloodType: Yup.string()
            .nullable(),
        ethnicity: Yup.string()
            .nullable(),
        height: Yup.string()
            .nullable()
            .test('test-name', 'Validation failure message',
                function(value) {
                    const height = parseInt(convertHeight(value))
                    const { path, createError } = this;
                    if ((height > 0 && height <= 108) || !value) {
                        return true
                    } else {
                        return createError({ path, message: 'Please set a valid height' });
                    }
                }),
        feet: Yup.string()
            .nullable(),
        inches: Yup.string()
            .nullable(),
        weight: Yup.string()
            .nullable()
            .test('test-name', 'Validation failure message',
                function(value) {
                    const weight = parseInt(convertWeight(value))
                    const { path, createError } = this;
                    if ((weight > 0 && weight <= 1200) || !value) {
                        return true
                    } else {
                        return createError({ path, message: 'Please set a valid weight' });
                    }
                }),
        familyHistory: Yup.string()
            .nullable(),
        conditions: Yup.string()
            .nullable(),
        allergies: Yup.string()
            .nullable(),
    })}
    onSubmit={(values, {setSubmitting}) => {
        setSubmitting(true);
        if (isValid(birthday)) {
            const diff_ms = Date.now() - new Date (values.birthday).getTime()
            const age_dt = new Date(diff_ms);
            values.age = Math.abs(age_dt.getUTCFullYear() - 1970)

        }
        values.height = convertHeight(values.height)
        values.weight = convertWeight(values.weight)
        var medications=[];
        //var diagnosis=[];
        var conditions=[];
        var allergies=[];
        var procedures=[];
        /*values.medications=[];
        values.diagnosis=[];
        values.conditions=[];
        values.allergies=[];
        values.procedures=[];*/

        if(profile.medications)
        {

            //medications.push({"medicine":values.medications});
            values.medications=profile.medications;
        }
        else{
            values.medications=[];
        }


        if(profile.conditions)
        {
            //conditions.push({"complaintname":values.conditions});
            values.conditions=conditions;
        }
        else{
            values.conditions=[];
        }
        if(profile.allergies)
        {
            //allergies.push({"allergyname":values.allergies});
            values.allergies=allergies;
        }
        else{
            values.allergies=[];
        }

        if(profile.allergies)
        {
            //allergies.push({"allergyname":values.allergies});
            values.allergies=allergies;
        }
        else{
            values.allergies=[];
        }
        if(profile.procedures)
        {
            //allergies.push({"allergyname":values.allergies});
            values.procedures=procedures;
        }
        else{
            values.procedures=[];
        }

        const user = {...profile, ...values, interests: interests}

        console.log("ddsd"+user)
        onboardManual(user, dispatch)
            .then(resp => {
            user.onboarded = resp.onboarded
        dispatch({type: 'onboard manual', payload: user})
        history.push('/patient/diagnosis/success')
    })
    .catch(err => {
            if (err.alert) {
            if (!err.response) {
                setError('Unable to connect to server')
            } else {

                switch (err.alert){
                    case 'interests':
                        if (err.response.status === 400) {
                            setError('There was an issue saving your interests. Please make sure you select at least one interest.')
                        } else {
                            setError('There was a server issue with saving your interests. Please try again.')
                        }
                        break
                    case 'onboarding':
                        setError('There was an issue onboarding your account. Please try again.')
                        break
                    case 'vitals':
                        if (err.response.status === 400) {
                            setError('There was an issue with how your health information was entered. Please try again.')
                        } else {
                            setError('There was a server issue with saving your health information. Please try again.')
                        }
                        break
                    default:
                        setError('There was an issue saving your information. Please try again.')
                        break
                }
            }
        } else {
            setError('There was a problem with saving your information')
        }
        console.log(err)
        setSubmitting(false)
    })
    }}
>{(props) => {
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
            } else {
                values.birthday = null
            }
            handleChangeBirthday(date)
        }

        const handleChangeInterest = (name) => {
            if (interests.includes(name)) {
                setInterests(interests.filter(interest => interest !== name))
            } else {
                const newInterests = interests.slice()
                newInterests.push(name)
                setInterests(newInterests)
            }
        }

        return (
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)} noValidate>
        {slide === 1 ?
    <PersonalInformation
        key='personal information'
        values={values}
        errors={errors}
        touched={touched}
        isSubmitting={isSubmitting}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        birthday={birthday}
        handleDateChangeBirthday={handleDateChangeBirthday}/>
    : slide === 2 ?
    <HealthInformation
        key='health information'
        values={values}
        errors={errors}
        touched={touched}
        isSubmitting={isSubmitting}
        handleChange={handleChange}
        handleBlur={handleBlur}
            />:
    <Interests
        key={interests}
        interests={interests}
        handleChangeInterest={handleChangeInterest}
            />
    }

    <div className={classes.slideButtons}>
    <Button
        className={classes.slideButton}
        disabled={slide === 1}
        variant='outlined'
        color='primary'
        onClick={lastSlide}>
            Previous Details
        </Button>

        {slide !== 3 ?
    <Button
        className={classes.slideButton}
        variant='contained'
        color='primary'
        disabled={(touched.birthday && errors.birthday) || (touched.height && errors.height) || (touched.weight && errors.weight)}
        onClick={nextSlide}>
            Next Details
        </Button>
    :
        isSubmitting ?
    <Button
        // Loading button with animated pulsing dots
        variant="contained"
        color="primary"
        className={classes.slideButton}>
    <span className={classes.loading}><span>&bull;</span><span>&bull;</span><span>&bull;</span></span>
        </Button>
    :

    <Button
        className={classes.slideButton}
        variant='contained'
        color='primary'
        onClick={handleSubmit}>
            Complete Profile
        </Button>

    }
    </div>

        {error ?
        <Alert
        severity="error"
        onClose={() => {
            setError(false)
        }}
    >
        {error}
    </Alert>

    : null}
    </form>)
    }}
</Formik>
    </div>
    </Paper>
    </PreAuthPage>
)
}

export default DiagnosisAdd