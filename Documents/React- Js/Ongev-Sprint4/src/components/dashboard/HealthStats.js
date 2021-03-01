import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import{
    Card,
    CardContent,
    CardActions,
    Grid,
    Avatar,
    Typography,
    SvgIcon
} from '@material-ui/core/'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {ReactComponent as ProceduresIcon} from '../icons/icon_procedures.svg'
import {ReactComponent as MedicationIcon} from '../icons/icon_medication.svg'
import {ReactComponent as OfficeVisitsIcon} from '../icons/icon_office-visits.svg'
import {ReactComponent as LabIcon} from '../icons/icon_lab.svg'
import axios from '../../utils/axios'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
    },
    cardTop: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    cardBottom: {
        backgroundColor: theme.palette.secondary.dark,
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        '&:hover': {
            cursor: 'pointer'
        }
    }, 
    cardBottomText: {
        fontSize: '0.875rem',
        fontWeight: 900
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        marginLeft: theme.spacing(1),
        fontSize: '60px',
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.dark
    },
    count: {
        fontSize: '3rem'
    },
    countText: {
        fontSize: '1.125rem',
    }
}))

const HealthStats = ({profile}) => {
    const classes = useStyles();
    const history = useHistory()
    const [count, setCount] = useState({
        medications: '-',
        visits: '-',
        procedures: '-',
        tests: '-'
    })

    useEffect(() => {
        const source = axios.CancelToken.source()
        
        axios.get(process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/patient/' + profile.patientID + '/ehr/resources',
        { 
            'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } ,
            cancelToken: source.token,
        })
        .then(resp => {
            const resources = resp.data.resources
            setCount({
                medications: resources.medications ? resources.medications.length : 0,
                visits: resources.medications ? resources.office_visits.length : 0,
                procedures: resources.medications ? resources.procedures.length : 0,
                tests: resources.medications ? resources.lab_tests.length : 0
            })
        })
        .catch(err => {
            console.log(err)
        })

        return () => {
            source.cancel()
        }
    }, [profile.patientID])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container className={classes.cardTop}>
                            <Grid item xs={6}>
                                <Avatar className={classes.avatar}>
                                    <SvgIcon fontSize={'inherit'}>
                                        <MedicationIcon/>
                                    </SvgIcon>
                                </Avatar>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant={'h1'} className={classes.count}>
                                    {count.medications}
                                </Typography>
                                <Typography variant={'h6'} className={classes.countText}>
                                    Medications
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardActions className={classes.cardBottom} onClick={() => history.push('/health-timeline',  {healthstatview: 'Medication'})}>
                        <Typography className={classes.cardBottomText}>
                            View All
                        </Typography>
                        <ChevronRightIcon/>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container className={classes.cardTop}>
                            <Grid item xs={6}>
                                <Avatar className={classes.avatar}>
                                    <SvgIcon fontSize={'inherit'}>
                                        <OfficeVisitsIcon/>
                                    </SvgIcon>
                                </Avatar>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant={'h1'} className={classes.count}>
                                    {count.visits}
                                </Typography>
                                <Typography variant={'h6'} className={classes.countText}>
                                    Office Visits
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardActions className={classes.cardBottom} onClick={() => history.push('/health-timeline', {healthstatview: 'Encounter'})}>
                        <Typography className={classes.cardBottomText}>
                            View All
                        </Typography>
                        <ChevronRightIcon/>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container className={classes.cardTop}>
                            <Grid item xs={6}>
                                <Avatar className={classes.avatar}>
                                    <SvgIcon fontSize={'inherit'}>
                                        <ProceduresIcon/>
                                    </SvgIcon>
                                </Avatar>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant={'h1'} className={classes.count}>
                                    {count.procedures}
                                </Typography>
                                <Typography variant={'h6'} className={classes.countText}>
                                    Procedures
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardActions className={classes.cardBottom} onClick={() => history.push('/health-timeline', {healthstatview: 'Procedure'})}>
                        <Typography className={classes.cardBottomText}>
                            View All
                        </Typography>
                        <ChevronRightIcon/>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container className={classes.cardTop}>
                            <Grid item xs={6}>
                                <Avatar className={classes.avatar}>
                                    <SvgIcon fontSize={'inherit'}>
                                        <LabIcon/>
                                    </SvgIcon>
                                </Avatar>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant={'h1'} className={classes.count}>
                                    {count.tests}
                                </Typography>
                                <Typography variant={'h6'} className={classes.countText}>
                                    Lab Tests
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardActions className={classes.cardBottom} onClick={() => history.push('/health-timeline', {healthstatview: 'DiagnosticReport'})}>
                        <Typography className={classes.cardBottomText}>
                            View All
                        </Typography>
                        <ChevronRightIcon/>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default HealthStats