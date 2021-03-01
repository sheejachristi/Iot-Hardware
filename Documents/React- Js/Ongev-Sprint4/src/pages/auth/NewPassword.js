import { useIntl } from 'react-intl'
import PreAuthPage from '../PreAuthPage'
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import RepeatIcon from '@material-ui/icons/Repeat';
import {Formik} from 'formik';
import * as Yup from 'yup';
import IconButton from "@material-ui/core/IconButton";
import {useHistory, useParams} from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import axios from '../../utils/axios'


const useStyles = makeStyles((theme) => ({
    paper: {
        width: 'auto',
        marginLeft: theme.spacing(3),
        color: theme.palette.grey.dark,
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(620 + theme.spacing(6))]: {
            width: '62%',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
    },
    title: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(4),
        textAlign: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        width: 192,
        height: 192,
        color: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(1),
        width: '100%',
    },
    submit: {
        margin: theme.spacing(4, 0, 6),
        height: '80px',
        fontSize: '1.5rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.25rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.125rem',
        },
    },
    submitIcon: {
        fontSize: '40px',
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
        width: '85%',
    },
    margin: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
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
    formLabels: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: '14px'
    },
    selectedCheckControl: {
        color: theme.palette.secondary.main,
        fontWeight: 700,
    },
    checkControl: {
        fontWeight: 700,
        color: theme.palette.grey.main,
    },
    selectedCheckBox: {
        color: theme.palette.secondary.main,
    },
    radios: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(2),
    },
    bottomForm: {
        marginTop: theme.spacing(0),
        width: '100%',
        textAlign: 'center',
        marginBottom: theme.spacing(0),
    },
    iframe: {
        borderStyle: 'none',
    }
}))


const NewPassword = (props) => {
    const classes = useStyles()
    const intl = useIntl()
    const history = useHistory()
    const [error, setError] = useState(false)

    const handleCloseError = () => {
        setError(false)
    }

    const { code } = useParams();
    console.log(code)

    return (
        <PreAuthPage pageTitle={intl.formatMessage({ id: 'sign_in' })}>
            <Paper className={classes.paper} elevation={1}>
                <div className={classes.container}>
                    <Typography component="h1" variant="h1" className={classes.title}>
                        Reset Your Password
                    </Typography>
                    <Formik
                        enableReinitialize
                        initialValues={{name: "",
                            password: "",
                            confirmPassword: "",
                            showPassword: false,
                            code: code
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            axios.post(process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/auth/reset-password', 
                            { password: values.password },
                            {'headers': { 'Authorization': `Bearer ${values.code}`}})
                                .then((resp) => {
                                    // Redirect to password reset success screen
                                    history.push('/password-success')
                                })
                                .catch((error) => {
                                    setError({message: 'Unable to reset password'})
                                    setSubmitting(false)
                                })
                            setSubmitting(true)
                        }}
                        validationSchema={Yup.object().shape({
                            password: Yup.string()
                                .min(8, intl.formatMessage({id: 'password_minimum'}))
                                .required('Required'),
                            confirmPassword: Yup.string()
                                .required(intl.formatMessage({id: 'confirm_password'}))
                                .oneOf([Yup.ref("password")], intl.formatMessage({id: 'password_no_match'}))
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
                            return (
                                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                                    <ErrorMessage errors={error} handleClose={handleCloseError} />
                                    <div className={classes.formLabels}>
                                        <Typography component="h1" variant="subtitle2" >
                                            Your New Password
                                        </Typography>
                                    </div>
                                    <TextField
                                        id="password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        error={errors.password && touched.password}
                                        helperText={(errors.password && touched.password) ? errors.password : ""}
                                        className={classes.textInput}
                                        placeholder='Must contain at least 8 characters'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="outlined"
                                        required
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

                                                        color={"inherit"}>{values.showPassword ? <Visibility className={classes.iconsPassword}/> : <VisibilityOff className={classes.iconsPassword}/>}
                                                        </IconButton>
                                                </InputAdornment>,
                                        }}
                                        autoComplete="current-password"
                                    />
                                    <div className={classes.formLabels}>
                                        <Typography component="h1" variant="subtitle2" >
                                            Repeat Password
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
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        className={classes.textInput}
                                        placeholder='Retype the password above'
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

                                                        color={"inherit"}>{values.showPassword ? <Visibility className={classes.iconsPassword}/> : <VisibilityOff className={classes.iconsPassword}/>}
                                                    </IconButton>
                                                </InputAdornment>,
                                            }}
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={isSubmitting}
                                    >
                                        Reset Password
                                    </Button>
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </Paper>
            
        </PreAuthPage>
    )
}

export default NewPassword
