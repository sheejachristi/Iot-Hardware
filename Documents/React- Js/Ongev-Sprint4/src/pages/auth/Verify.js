import {useHistory, useParams} from 'react-router-dom'
import {useIntl} from 'react-intl'
import PreAuthPage from './../PreAuthPage'
import React, {useContext, useState} from 'react';
import { UserContext} from "../../context/user-context";
import Auth from '../../utils/auth';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Formik} from "formik";
import * as Yup from "yup";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Redirect} from "react-router-dom";
import EmailIcon from '@material-ui/icons/Email';
import ErrorMessage from '../../components/ErrorMessage';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';



const useStyles = makeStyles((theme) => ({
    paper: {
        width: 'auto',
        marginLeft: theme.spacing(3),
        color: theme.palette.grey.dark,
        marginRight: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            width: '60%',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        [theme.breakpoints.up('lg')]: {
            width: '40%',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `5%`,

    },
    bottomPaper: {
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(4),
        color: theme.palette.grey.dark,
        [theme.breakpoints.up(620 + theme.spacing(6))]: {
            width: '55%',
            marginLeft: 'auto',
            marginRight: 'auto'
        },

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
    bottomForm: {
        marginTop: theme.spacing(1),
        width: '85%',
        textAlign: 'center',
        marginBottom: theme.spacing(8),
    },
    submit: {
        margin: theme.spacing(4, 0, 2),
        height: '5rem',
        fontSize: '24px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.25rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.125rem',
            marginTop: theme.spacing(1),
            height: '3.75rem',
        },
    },
    submitIcon: {
        fontSize: '2.5rem',
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem',
        },
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: `100%`,
        width: '100%',
    },
    iconButton: {
        color: "#ffff",
    },
    icons: {
        color: theme.palette.grey.main,
        fontSize: '2.5rem',
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem',
        },
    },
    iconsPassword: {
        color: theme.palette.grey.main,
        fontSize: '2.5rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem',
        },
    },
    title: {
        marginBottom: theme.spacing(4),
        textAlign: 'center'
    },
    formLabels: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: '14px'
    },
    fakeLink: {
        textDecoration: 'underline',
        color: theme.palette.primary.main,
    },
    checkControl: {
        color: theme.palette.secondary.main,
        fontWeight: 700,
    },
    checkBox: {
        color: theme.palette.secondary.main,
    },
    passwordField: {
        marginBottom: theme.spacing(4),
    }
}))

const Verify = () => {
    const classes = useStyles()
    const intl = useIntl()
    const history = useHistory()
    const { code } = useParams()
    const email = history.location.state ? history.location.state.email : false
    const [profile, dispatch] = useContext(UserContext);
    const [error, setError] = useState(profile.tokenExpired ? {message: 'Sign in expired. Sign back in to regain access.'} : false)
    const auth =new Auth();

    const handleCloseError = () => {
        setError(false)
    }

    if (profile.tokenExpired) {
        setTimeout(dispatch({type: 'toggle expired'}), 5000)
    }

    const sendVerification = () => {
        history.push("/verification/sent", {email: email})
    }

    return (
        (profile.authenticated ? <Redirect to={"/dashboard"} /> :
        <PreAuthPage pageTitle={intl.formatMessage({id: 'sign_in'})} errors={error}>
            <Paper className={classes.paper} elevation={1}>
                <div className={classes.container}>

                    <Typography component="h1" variant="h1" className={classes.title}>
                        Email is not yet verified
                    </Typography>
                    <Formik
                        initialValues={{
                            verification: code || '',
                        }}
                        validationSchema={Yup.object().shape({
                                verification: Yup.string()
                                    .required('Required'),
                            })}
                        onSubmit={(values, {setSubmitting}) => {
                            setSubmitting(true);
                            auth.verifyUser(values.email, values.password, values.verification)
                                .then(() => {
                                    history.push("/signin")
                                })
                                .catch((error) => {
                                    if (!error.response) {
                                        setError({message: 'Unable to connect to server'})
                                    }
                                    else {
                                        setError({message: 'Incorrect Email, Password or Code'})
                                    }
                                    console.log('Error in verification, ', error)
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
                        } = props;
                        return (
                            <form className={classes.form} onSubmit={handleSubmit} noValidate>
                                <ErrorMessage errors={error} handleClose={handleCloseError}/>

                                <div className={classes.formLabels}>
                                    <Typography component="h1" variant="subtitle2" >
                                        Verification Code
                                    </Typography>
                                </div>
                                <TextField
                                    value={values.verification}
                                    error={touched.verification && errors.verification}
                                    helperText={(touched.verification && errors.verification) ? errors.verification : ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    variant="outlined"
                                    className={classes.textInput}
                                    required
                                    fullWidth
                                    placeholder={'Code from your email'}
                                    id="verification"
                                    name="verification"
                                    InputProps={{
                                        startAdornment:
                                            <InputAdornment position={"start"} >
                                                <VerifiedUserIcon className={classes.icons}/>
                                            </InputAdornment>,
                                        style: {
                                            fontSize: '24px'
                                        }
                                    }}
                                />
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}>

                                    <ExitToAppIcon className={classes.submitIcon}/>
                                    Verify
                                </Button>
                            </form>);
                    }}
                    </Formik>
                </div>
            </Paper>

            {email ? 
            <div className={classes.bottomPaper} >
                <div className={classes.container}>
                    <form className={classes.bottomForm}>
                        <Typography  component="h1" variant="h2">
                            Need a new verification email?
                        </Typography>
                        <Button
                            type={"button"}
                            fullWidth
                            variant={"outlined"}
                            color={"primary"}
                            className={classes.submit}
                            onClick={sendVerification}
                            >
                            <EmailIcon className={classes.submitIcon}/>
                            Send Verification Email
                        </Button>
                    </form>
                </div>
            </div>
            : null}
            
        </PreAuthPage>)
    )
}

export default Verify