import {useHistory} from 'react-router-dom'
import {useIntl} from 'react-intl'
import PreAuthPage from '../PreAuthPage'
import React, {useEffect, useContext, useState} from 'react';
import { UserContext} from "../../context/user-context";
import Auth from '../../utils/auth';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {Formik} from "formik";
import * as Yup from "yup";
import InputAdornment from "@material-ui/core/InputAdornment";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {Redirect} from "react-router-dom";
import EmailIcon from '@material-ui/icons/Email';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ErrorMessage from '../../components/ErrorMessage'
import Modal from '@material-ui/core/Modal';
import Icon from "@material-ui/core/Icon";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import axios from '../../utils/axios'

const useStyles = makeStyles((theme) => ({
        paper: {
            width: 'auto',
            marginLeft: theme.spacing(3),
            color: theme.palette.grey.dark,
            marginRight: theme.spacing(3),
            [theme.breakpoints.up(620 + theme.spacing(6))]: {
                width: '55%',
                marginLeft: 'auto',
                marginRight: 'auto'
            },
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: `5%`,
            [theme.breakpoints.down('xs')]: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1)
            },
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
            fontSize: '1.5rem',
            [theme.breakpoints.down('sm')]: {
                fontSize: '1.25rem',
                lineHeight: 'normal'
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '1.125rem',
                height: '3.5rem',
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
            '&:hover': {
                cursor: 'pointer',
            },
        },
        checkControl: {
            color: theme.palette.secondary.main,
            fontWeight: 700,
            fontSize: '1.125rem',
            '@media (max-width:600px)': {
                fontSize: '0.875rem'
            },
        },
        checkBox: {
            color: theme.palette.secondary.main,
        },
        passwordField: {
            marginBottom: theme.spacing(4),
        },
        modalPaper: {
            width: '980px',
            height: '28rem',
            backgroundColor: 'white',
            outline: 0,
            [theme.breakpoints.down('md')]: {
                width: '640px',
                height: '660px',
            },
            [theme.breakpoints.down('xs')]: {
                width: '320px',
                height: '500px',
            },
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
            textAlign: 'center',
            padding: theme.spacing(6),
            paddingTop: theme.spacing(4),
            color: theme.palette.grey.dark,
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(3),
            },
        },
        modalButtons: {
            textAlign: 'left',
        },
        modalSubmit: {
            marginRight: theme.spacing(2),
        },
        modalCancel: {
            borderWidth: '2px',
            '&:hover': {
                borderWidth: '2px',
            }
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

const SignIn = () => {
    const classes = useStyles()
    const intl = useIntl()
    const history = useHistory()
    const [profile, dispatch] = useContext(UserContext);
    const [remember, setRemember] = useState(false)
    const [error, setError] = useState(profile.tokenExpired ? {message: 'Sign in expired. Sign back in to regain access.'} : false)
    const auth =new Auth();
    const [open, setOpen] = useState(false)
    const [passwordError, setPasswordError] = useState('')

    const [login, setLogin] = useState({
        username: localStorage.getItem('email'),
        password: localStorage.getItem('password'),

    })
    const [username,setusername] = useState('')

    const [password,setpassword] = useState('')

   useEffect(() => {
       if(localStorage.getItem('rememberlogin')){
           setusername(localStorage.getItem('username'))
           setpassword(localStorage.getItem('password'))

        //setRemember(true)
           //alert(password)
           //alert(username)
       }



})


    const handleRememberChange = () => {

        setRemember(!remember)
    }




    const handleCloseError = () => {
        setError(false)
    }

    if (profile.tokenExpired) {
        setTimeout(dispatch({type: 'toggle expired'}), 5000)
    }

    const openModal = () => {
        setOpen(true)
    }

    return (
    (profile.authenticated ? <Redirect to={"/dashboard"} /> :
<PreAuthPage pageTitle={intl.formatMessage({id: 'sign_in'})} errors={error}>
        <Paper className={classes.paper} elevation={1}>
        <div className={classes.container}>

<Typography component="h1" variant="h1" className={classes.title}>
    {intl.formatMessage({id: 'sign_in'})}
</Typography>
    <Formik
    initialValues={{
        email: localStorage.getItem('username'),
            password: localStorage.getItem('password'),
            showPassword: false,
            remember:localStorage.getItem('rememberlogin')
    }}
    validationSchema={Yup.object().shape({
        email: Yup.string()
            .email()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
    })}
    onSubmit={(values, {setSubmitting}) => {
        setSubmitting(true);
        if(remember){
            localStorage.setItem('username',values.email);
            localStorage.setItem('password',values.password)
            localStorage.setItem('rememberlogin',true)

                    }

        else
        {
            localStorage.setItem('username','');
            localStorage.setItem('password','')
            localStorage.setItem('rememberlogin',false)

        }
        auth.login(values.email, values.password)
            .then((profile) => {
            dispatch({type: 'login', payload: profile});
        console.log("sign in prof"+profile.physName)
        if (history.location.state && history.location.state.ongevRoute ) {
            try {
                history.push(history.location.state.ongevRoute)
            } catch {
                history.push("/dashboard")
            }
        } else {

            history.push("/dashboard")
        }
    })
    .catch((error) => {
            if (error.response.status === 409) {
            history.push('/verify/email', {email: values.email})
        } else {
            console.log('Error in signin, ', error)
            setError({message: 'Incorrect Email or Password'})
        }
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
        return (
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <ErrorMessage errors={error} handleClose={handleCloseError}/>
            <div className={classes.formLabels}>
    <Typography variant="subtitle2" >
            Your Email
        </Typography>
        {/* <Typography component="h1" variant="body1" >
         Forgot your email? <span className={classes.fakeLink}>Click here</span>
         </Typography> */}
        </div>
        <TextField
        value={values.email}
        defaultValue={username}
        error={touched.email && errors.email}
        helperText={(touched.email && errors.email) ? errors.email : ""}

        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        className={classes.textInput}
        required
        fullWidth
        placeholder='(e.g.yourname@mail.com)'
        id="email"
        name="email"
        autoComplete="username"
        InputProps={{
            startAdornment:
                <InputAdornment position={"start"} >
                <EmailIcon className={classes.icons}/>
        </InputAdornment>,
                style: {
                fontSize: '24px'
            }
        }}
    />
    <div className={classes.formLabels}>
    <Typography variant="subtitle2" >
            Your Password
        </Typography>
        <Typography variant="body1" >
            Forgot your password? <span onClick={openModal} className={classes.fakeLink}>Click here</span>
        </Typography>
        </div>
        <TextField
        value={values.password}
        error={touched.password && errors.password}
        helperText={(touched.password && errors.password) ? errors.password : ""}
        onChange={(e) => {handleChange(e)}}
        onBlur={handleBlur}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        className={classes.passwordField}
        placeholder='Password'
        name="password"
        type={values.showPassword ? "text" : "password"}
        id="password"
        autoComplete="current-password"
        InputProps={{
            startAdornment:
                <InputAdornment position={"start"}>
                <VpnKeyIcon className={classes.icons}/>
        </InputAdornment>,
                endAdornment:
        <InputAdornment
            position={"end"}
            edge={"end"}
            aria-label={"Toggle password visibility"}
                >
                <IconButton
            onClick={() => setFieldValue("showPassword", !values.showPassword)}

            color={"inherit"}>{values.showPassword ? <Visibility className={classes.iconsPassword}/> : <VisibilityOff className={classes.iconsPassword}/>}
        </IconButton>
            </InputAdornment>,
                style: {
                fontSize: '24px'
            },
        }}
    />
    <FormControlLabel
        control={<Checkbox checked={remember} onChange={handleRememberChange} className={classes.checkBox} name="remember" color='secondary' />}
        label="Remember my login information"
        className={classes.checkBox}
        classes={{ label: classes.checkControl}}
    />
        {isSubmitting ?
        <Button
            // Loading button with animated pulsing dots
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}>
        <span className={classes.loading}><span>&bull;</span><span>&bull;</span><span>&bull;</span></span>
        </Button>
        :
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}>
        <ExitToAppIcon className={classes.submitIcon}/>
            Log In
        </Button>
        }
    </form>);
    }}
</Formik>
    </div>
    </Paper>

    {/* Forgotten password modal */}
    <Modal
    disableEnforceFocus
    open={open}
    onClose={() => setOpen(false)}
    className={classes.modal}
>
<div className={classes.modalPaper}>
<div className={classes.modalHeader}>
<Icon><CloseIcon className={classes.modalIcon} onClick={() => setOpen(false)}/></Icon>
    </div>
    <div className={classes.modalBody}>
<Typography component={"h1"} variant={"h1"}>
        Password Reset
    </Typography>

    <Typography component={"h4"} variant={"h4"} className={classes.modalText}>
    Lost your password? Enter your email address below to request an email to reset your password.
    </Typography>

    <Formik
    initialValues={{
        email: "",
    }}
    validationSchema={Yup.object().shape({
        email: Yup.string()
            .email()
            .required('Required'),
    })}
    onSubmit={(values, {setSubmitting}) => {
        setSubmitting(true);
        axios.post(process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/auth/forgot-password/' + values.email)
            .then((resp) => {
            history.push("/password/sent", {email: values.email});
    })
    .catch((error) => {
            setPasswordError(true)
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
        <div className={classes.formLabels}>
    <Typography component="h1" variant="subtitle2" >
            Your Email
        </Typography>
        </div>
        <TextField
        value={values.email}
        error={touched.email && errors.email}
        helperText={(touched.email && errors.email) ? errors.email : ""}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        className={classes.textInput}
        required
        fullWidth
        placeholder={'(e.g.yourname@mail.com)'}
        id="email"
        name="email"
        autoComplete="username"
        InputProps={{
            startAdornment:
                <InputAdornment position={"start"} >
                <EmailIcon className={classes.icons}/>
        </InputAdornment>,
                style: {
                fontSize: '24px'
            }
        }}
    />
    <div className={classes.modalButtons}>
    <Button
        type="submit"
        disabled={isSubmitting}
        variant="contained"
        className={classes.modalSubmit}
        color="secondary"
        startIcon={<CheckIcon/>}
    >
        Send Email
        </Button>
        <Button
        type={"button"}
        variant="outlined"
        color= 'primary'
        className={classes.modalCancel}
        startIcon={<CloseIcon/>}
        onClick={() => setOpen(false)}
    >
        Cancel
        </Button>
        </div>
        </form>
    )
    }}
</Formik>
    {passwordError ?
    <Typography component={'h6'} variant={'h6'} color='error'>
        Unable to send email
    </Typography>
:
    null}
</div>
    </div>
    </Modal>

    <div className={classes.bottomPaper} >
<div className={classes.container}>
<form className={classes.bottomForm}>
<Typography  component="h1" variant="h2">
        {intl.formatMessage({id: 'no_login_prompt'})}
</Typography>
    <Button
    type={"button"}
    fullWidth
    variant={"outlined"}
    color={"primary"}
    href={"/register"}
    className={classes.submit}
>
<PersonAddIcon className={classes.submitIcon}/>
    {intl.formatMessage({id: 'create_account'})}
</Button>
    </form>
    </div>
    </div>

    </PreAuthPage>)
)
}

export default SignIn
