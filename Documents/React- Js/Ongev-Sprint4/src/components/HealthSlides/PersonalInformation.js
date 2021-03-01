import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
import {ReactComponent as BirthdaySrc} from '../icons/icon_birthday.svg'
import {ReactComponent as GenderSrc} from '../icons/icon_gender.svg'
import {ReactComponent as EthnicitySrc} from '../icons/icon_ethnicity.svg'
import {ReactComponent as HeightSrc} from '../icons/icon_height.svg'
import {ReactComponent as WeightSrc} from '../icons/icon_weight.svg'
import {ReactComponent as FamilySrc} from '../icons/icon_family.svg'
import { KeyboardDatePicker } from "@material-ui/pickers";
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
    genderSelector: {
        width: '100%',
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(5),
        }
    },
    weightInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'baseline'
    },
    heightInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    heightInput: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '45%',
        alignItems: 'baseline'
    },
    uom: {
        fontSize: '1rem',
        marginLeft: theme.spacing(1)
    },
    heightHelperText: {
        width: '200%'
    },
}))

const PersonalInformation = ({values, errors, touched, isSubmitting, birthday, handleChange, handleBlur, handleDateChangeBirthday, setFieldValue}) => {
    const classes = useStyles();

    useEffect(() => {
        if (values.feet || values.inches) {
            const newHeight = `${values.feet}' ${values.inches}"`
            setFieldValue('height', newHeight)
        }
    }, [values.feet, values.inches, setFieldValue])

    return (
        <div className={classes.root}>
            <Typography variant={'h5'} className={classes.titleText}>
                Personal Information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Box className={classes.box}>
                        <BirthdaySrc className={classes.icon}/>
                        <div className={classes.bottomContainer}>
                            <Divider className={classes.divider} variant={'middle'}/>
                            <Typography variant={'h5'}>
                                Your Birthday
                            </Typography>
                        </div>
                    </Box>
                    <KeyboardDatePicker
                        id="birthday"
                        disableFuture
                        error={touched.birthday && errors.birthday}
                        helperText={(touched.birthday && errors.birthday) ? errors.birthday : ""}
                        inputVariant="outlined"
                        format="MM/dd/yyyy"
                        className={classes.birthday}
                        fullWidth
                        value={birthday}
                        onChange={date => handleDateChangeBirthday(date)}
                        placeholder="MM/DD/YYYY"
                        onBlur={handleBlur}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Box className={classes.box}>
                        <GenderSrc className={classes.icon}/>
                        <div className={classes.bottomContainer}>
                            <Divider className={classes.divider} fullWidth variant={'middle'}/>
                            <Typography variant={'h5'}>
                                Your Gender
                            </Typography>
                        </div>
                    </Box>
                    <FormControl variant="outlined" id='gender' placeholder='choose' className={classes.genderSelector}>
                        <Select
                        id="gender"
                        error={touched.gender && errors.gender}
                        helperText={(touched.gender && errors.gender) ? errors.gender : ""}
                        value={values.gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='gender'
                        >
                            <MenuItem value={""} disabled>
                                Choose:
                            </MenuItem>
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                            <MenuItem value={'Undefined'}>Decline to Answer</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Box className={classes.box}>
                        <EthnicitySrc className={classes.icon}/>
                        <div className={classes.bottomContainer}>
                            <Divider className={classes.divider} fullWidth variant={'middle'}/>
                            <Typography variant={'h5'}>
                                Ethnicity
                            </Typography>
                        </div>
                    </Box>
                    <FormControl variant="outlined" id='ethnicity' placeholder='choose' className={classes.genderSelector}>
                        <Select
                        id="ethnicity"
                        error={touched.ethnicity && errors.ethnicity}
                        helperText={(touched.ethnicity && errors.ethnicity) ? errors.ethnicity : ""}
                        value={values.ethnicity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={'(e.g. Latino)'}
                        name='ethnicity'
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
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Box className={classes.box}>
                        <HeightSrc className={classes.icon}/>
                        <div className={classes.bottomContainer}>
                            <Divider className={classes.divider} fullWidth variant={'middle'}/>
                            <Typography variant={'h5'}>
                                Your Height
                            </Typography>
                        </div>
                    </Box>
                    <div className={classes.heightInputContainer}>
                        <div className={classes.heightInput}>
                            <TextField
                                variant="outlined"
                                error={(touched.feet || touched.inches) && errors.height}
                                placeholder={0}
                                value={values.feet}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={((touched.feet || touched.inches) && errors.height) ? errors.height : ""}
                                FormHelperTextProps={{
                                    className: classes.heightHelperText
                                }}
                                fullWidth
                                name="feet"
                                id="feet"
                            />
                            <Typography className={classes.uom} variant={'body1'}>ft</Typography>
                        </div>

                        <div className={classes.heightInput}>
                            <TextField
                                variant="outlined"
                                error={(touched.feet || touched.inches) && errors.height}
                                placeholder={0}
                                value={values.inches}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                fullWidth
                                name="inches"
                                id="inches"
                            />
                            <Typography className={classes.uom} variant={'body1'}>in</Typography>
                        </div>

                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4} >
                    <Box className={classes.box}>
                        <WeightSrc className={classes.icon}/>
                        <div className={classes.bottomContainer}>
                            <Divider className={classes.divider} fullWidth variant={'middle'}/>
                            <Typography variant={'h5'}>
                                Your Weight
                            </Typography>
                        </div>
                    </Box>
                    {/* <TextField
                        value={values.weight}
                        error={touched.weight && errors.weight}
                        helperText={(touched.weight && errors.weight) ? errors.weight : ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        required
                        fullWidth
                        name="weight"
                        id="weight"
                        placeholder={'(e.g. 185lbs)'}
                        /> */}
                    <div className={classes.weightInputContainer}>
                        <TextField
                            value={values.weight}
                            error={touched.weight && errors.weight}
                            helperText={(touched.weight && errors.weight) ? errors.weight : ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            required
                            fullWidth
                            name="weight"
                            id="weight"
                            placeholder={'(e.g. 185)'}
                        />
                        <Typography className={classes.uom} variant={'body1'}>lbs</Typography>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Box className={classes.box}>
                        <FamilySrc className={classes.icon}/>
                        <div className={classes.bottomContainer}>
                            <Divider className={classes.divider} fullWidth variant={'middle'}/>
                            <Typography variant={'h5'}>
                                Family History
                            </Typography>
                        </div>
                    </Box>
                    <TextField
                        value={values.familyHistory}
                        error={touched.familyHistory && errors.familyHistory}
                        helperText={(touched.familyHistory && errors.familyHistory) ? errors.familyHistory : ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        required
                        fullWidth
                        name="familyHistory"
                        id="familyHistory"
                        placeholder={'(e.g. High Blood Pressure)'}
                        />
                </Grid>

            </Grid>
            
        </div>
    )
}

export default PersonalInformation