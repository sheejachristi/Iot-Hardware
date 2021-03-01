import React from 'react';
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
import {ReactComponent as BloodTypeSrc} from '../icons/icon_blood-type.svg'
import {ReactComponent as MedicationSrc} from '../icons/icon_medication.svg'
import {ReactComponent as DiseaseSrc} from '../icons/icon_disease.svg'
import {ReactComponent as IllnessSrc} from '../icons/icon_illness.svg'
import {ReactComponent as AllergySrc} from '../icons/icon_allergy.svg'
import {ReactComponent as ProceduresSrc} from '../icons/icon_procedures.svg'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    box: {
        height: '18rem',
        backgroundColor: theme.palette.primary.light,
        padding: '3.125rem 1.875rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.primary.dark,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleText: {
        color: theme.palette.primary.dark,
        marginBottom: theme.spacing(4),
    },
    divider: {
        backgroundColor: theme.palette.primary.contrastText,
        height: '3px',
        marginBottom: '.75rem'
    },
    icon: {
        fill: theme.palette.primary.dark+' !important',
        paddingBottom: '2.1875rem',
        height: '60%',
        maxWidth: '80%'
    },
    bottomContainer: {
        width: '100%',
        textAlign: 'center'
    },
    selector: {
        width: '100%',
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(5),
        }
    },
}))

const HealthInformation = ({values, errors, touched, isSubmitting, handleChange, handleBlur}) => {
    const classes = useStyles();

    const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']

    return (
        <div className={classes.root}>
            <Typography variant={'h5'} className={classes.titleText}>
                Health Information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Box className={classes.box}>
                        <BloodTypeSrc className={classes.icon}/>
                        <div className={classes.bottomContainer}>
                            <Divider className={classes.divider} variant={'middle'}/>
                            <Typography variant={'h5'}>
                                Blood Type
                            </Typography>
                        </div>
                    </Box>
                    <FormControl variant="outlined" id='bloodType' className={classes.selector}>
                        <Select
                        id="bloodType"
                        className={classes.input}
                        value={values.bloodType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='bloodType'
                        placeholder={'(e.g. AB)'}
                        error={touched.bloodType && errors.bloodType}
                        helperText={(touched.bloodType && errors.bloodType) ? errors.bloodType : ""}
                        >
                            {bloodTypes.map(type => <MenuItem value={type}>{type}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Box className={classes.box}>
                        <MedicationSrc className={classes.icon}/>
                        <div className={classes.bottomContainer}>
                            <Divider className={classes.divider} fullWidth variant={'middle'}/>
                            <Typography variant={'h5'}>
                                Medications(s)
                            </Typography>
                        </div>
                    </Box>
                    <TextField
                        value={values.medications}
                        error={touched.medications && errors.medications}
                        helperText={(touched.medications && errors.medications) ? errors.medications : ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        required
                        fullWidth
                        name="medications"
                        id="medications"
                        placeholder={'(e.g. Tamoxofen)'}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Box className={classes.box}>
                        <DiseaseSrc className={classes.icon}/>
                        <div className={classes.bottomContainer}>
                            <Divider className={classes.divider} fullWidth variant={'middle'}/>
                            <Typography variant={'h5'}>
                                Chronic Disease(s)
                            </Typography>
                        </div>
                    </Box>
                    <TextField
                        value={values.diagnosis}
                        error={touched.diagnosis && errors.diagnosis}
                        helperText={(touched.diagnosis && errors.diagnosis) ? errors.diagnosis : ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        required
                        fullWidth
                        name="diagnosis"
                        id="diagnosis"
                        placeholder={'(e.g. Heart Disease)'}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Box className={classes.box}>
                        <IllnessSrc className={classes.icon}/>
                        <div className={classes.bottomContainer}>
                            <Divider className={classes.divider} fullWidth variant={'middle'}/>
                            <Typography variant={'h5'}>
                                Medical Condition(s)
                            </Typography>
                        </div>
                    </Box>
                    <TextField
                        value={values.conditions}
                        error={touched.conditions && errors.conditions}
                        helperText={(touched.conditions && errors.conditions) ? errors.conditions: ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        required
                        fullWidth
                        name="conditions"
                        id="conditions"
                        placeholder={'(e.g. arthritis, herniated disc)'}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4} >
                    <Box className={classes.box}>
                        <AllergySrc className={classes.icon}/>
                        <div className={classes.bottomContainer}>
                            <Divider className={classes.divider} fullWidth variant={'middle'}/>
                            <Typography variant={'h5'}>
                                Allergies 
                            </Typography>
                        </div>
                    </Box>
                    <TextField
                        value={values.allergies}
                        error={touched.allergies && errors.allergies}
                        helperText={(touched.allergies && errors.allergies) ? errors.allergies : ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        required
                        fullWidth
                        name="allergies"
                        id="allergies"
                        placeholder={'(e.g. pet dander, nuts)'}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Box className={classes.box}>
                        <ProceduresSrc className={classes.icon}/>
                        <div className={classes.bottomContainer}>
                            <Divider className={classes.divider} fullWidth variant={'middle'}/>
                            <Typography variant={'h5'}>
                                Procedures
                            </Typography>
                        </div>
                    </Box>
                    <TextField
                        value={values.procedures}
                        error={touched.procedures && errors.procedures}
                        helperText={(touched.procedures && errors.procedures) ? errors.procedures : ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        required
                        fullWidth
                        name="procedures"
                        id="procedures"
                        placeholder={'(e.g. hip replacement, tonsils)'}
                    />
                </Grid>

            </Grid>
            
        </div>
    )
}

export default HealthInformation