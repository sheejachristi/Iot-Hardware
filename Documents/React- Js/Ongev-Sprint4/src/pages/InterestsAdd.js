import {useHistory} from 'react-router-dom'
import PreAuthPage from './PreAuthPage'
import React, {useContext, useState, useEffect} from 'react';
import { UserContext} from "../context/user-context";
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Interests from '../components/HealthSlides/Interests'
import { addInterests, setOnboarded } from '../utils/userActions';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 'auto',
        [theme.breakpoints.up(620 + theme.spacing(6))]: {
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        [theme.breakpoints.up('xl')]: {
            width: '65%',
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
    }
}))

const InterestsAdd = () => {
    const classes = useStyles()
    const history = useHistory()
    const [profile, dispatch] = useContext(UserContext);
    const [interests, setInterests] = useState(profile.interests ? profile.interests : [])
    const [error, setError] = useState(false)
    const [submiting, setSubmiting] = useState(false)
    const [editinterest, setEditInterest] = useState(false)
    const [addinterest, setAddInterest] = useState(false)

    useEffect(() => {

        const userdetails = {...profile}
    if (userdetails.onboarded){
        setEditInterest(false)
        setAddInterest(true)
    }
    else {
        setEditInterest(true)
        setAddInterest(false)
    }

        },[])



    const handleChangeInterest = (name) => {
        if (interests.includes(name)) {
            setInterests(interests.filter(interest => interest !== name))
        } else {
            const newInterests = interests.slice()
            newInterests.push(name)
            setInterests(newInterests)
        }
    }

    const handleSubmit = () => {
        setSubmiting(true)

        if(interests == null){

        }

        const user = {...profile, interests: interests}
        console.log(user)
        addInterests(user)
        .then(resp => {
            if (user.onboarded) {
                dispatch({type: 'update interests', payload: user})
                history.push('/dashboard')
            } else {
                setOnboarded(user)
                .then(resp => {
                    user.onboarded = resp.onboarded
                    dispatch({type: 'update interests', payload: user})
                    history.push('/patient/diagnosis/success')
                })
            }
        })
        .catch(err => {
            setError(true)
            setSubmiting(false)
            console.log(err)
        })
    }

    const helperText = 'Choose as many of the following topics as you wish related to your personal interests about your health.'

    return (
        
        <PreAuthPage >
            <Paper className={classes.paper} elevation={6}>
                <div className={classes.container}>
                    <Typography component="h1" variant="h1" className={classes.title}>
                        Add Your Health Interests
                    </Typography>
                    <Typography component="h3" variant="h3" className={classes.titleBody}>
                        {helperText}
                    </Typography>
                        <form className={classes.form} onSubmit={(e) => handleSubmit(e)} noValidate>

                            <Interests
                                key={interests}
                                interests={interests}
                                handleChangeInterest={handleChangeInterest}
                            />

                            <div className={classes.slideButtons}>
                                <Button 
                                    className={classes.slideButton}
                                    variant='outlined'
                                    color='primary'
                                    onClick={() => history.push('/patient/healthcare/connect/success')}>
                                        Previous Details
                                </Button>

                                <span hidden ={addinterest}>
                                <Button 
                                    disabled={submiting}
                                    className={classes.slideButton}
                                    variant='contained'
                                    color='primary'
                                    onClick={handleSubmit}>
                                        Complete Profile
                                </Button></span>
                                <span hidden ={editinterest}>
                                <Button
                                disabled={submiting}
                                className={classes.slideButton}
                                variant='contained'
                                color='primary'
                                onClick={handleSubmit}>
                                    Edit Interest
                                </Button></span>
                            </div>
                            {error ?
                                <Alert 
    >
                                        Please select atleast one health interest.
                                </Alert>
                            
                            : null}

                        </form>
                </div>
            </Paper>
        </PreAuthPage>
    )
}

export default InterestsAdd