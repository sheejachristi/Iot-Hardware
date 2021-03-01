import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
import CheckCircleIcon from '@material-ui/icons/CheckCircleRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(4),
    },
    item: {
        justifyContent: 'center',
        display: 'flex',
    },
    box: {
        height: '18rem',
        backgroundColor: theme.palette.secondary.light,
        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.secondary.dark,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    boxSelected: {
        height: '18rem',
        backgroundColor: theme.palette.secondary.dark,
        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.secondary.contrastText,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    divider: {
        backgroundColor: theme.palette.secondary.contrastText,
        height: '3px',
        marginBottom: '.75rem'
    },
    icon: {
        maxWidth: 'calc(100% - 32px)',
        height: 'auto',
        overflowY: 'hidden',
        padding: theme.spacing(2),
        objectFit: 'cover',
    },
    bottomContainer: {
        width: '100%',
        textAlign: 'center',
        padding: '0rem 1.875rem 1.25rem',
    },
    checkIcon: {
        zIndex: '800',
        display: 'inline',
        color: theme.palette.secondary.light,
        backgroundColor: theme.palette.secondary.contrastText,
        height: '3.75rem',
        width: '3.75rem',
        marginLeft: '-.3125rem',
        marginTop: '-.3125rem'
    },
    cropper: {
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '50%',
        height: '3.125rem',
        width: '3.125rem',
    },
    iconPositioner: {
        position: 'absolute',
        top: '-8px',
        left: '-8px',
    },
    boxContainer: {
        maxWidth: '400px', 
        position: 'relative'
    }
}))

const Interests = ({interests, handleChangeInterest}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4} style={{position: 'relative'}} className={classes.item}>
                    <div className={classes.boxContainer} >
                        {interests.includes('nutrition') ?
                        <div className={classes.iconPositioner}>
                            <div className={classes.cropper}>
                                <CheckCircleIcon className={classes.checkIcon}/> 
                            </div>
                        </div>
                        
                        : null}
                        <Box 
                        className={interests.includes('nutrition') ? classes.boxSelected : classes.box}
                        onClick={(name) => handleChangeInterest('nutrition')}
                        >
                            <img src='/interests-images/nutrition.png' alt='Nutrition' className={classes.icon}/>
                            <div className={classes.bottomContainer}>
                                <Divider className={classes.divider} variant={'middle'}/>
                                <Typography variant={'h5'}>
                                    Nutrition
                                </Typography>
                            </div>
                        </Box>
                    </div>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4} style={{position: 'relative'}} className={classes.item}>
                    <div className={classes.boxContainer}>
                        {interests.includes('exercise') ?
                        <div className={classes.iconPositioner}>
                            <div className={classes.cropper}>
                                <CheckCircleIcon className={classes.checkIcon}/> 
                            </div>
                        </div>
                        
                        : null}
                        <Box 
                        className={interests.includes('exercise') ? classes.boxSelected : classes.box}
                        onClick={(name) => handleChangeInterest('exercise')}>
                            <img src='/interests-images/exercise.png' alt='Exercise' className={classes.icon}/>
                            <div className={classes.bottomContainer}>
                                <Divider className={classes.divider} fullWidth variant={'middle'}/>
                                <Typography variant={'h5'}>
                                    Exercise
                                </Typography>
                            </div>
                        </Box>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4} style={{position: 'relative'}} className={classes.item}>
                    <div className={classes.boxContainer}>
                        {interests.includes('stress') ?
                        <div className={classes.iconPositioner}>
                            <div className={classes.cropper}>
                                <CheckCircleIcon className={classes.checkIcon}/> 
                            </div>
                        </div>
                        
                        : null}
                        <Box 
                        className={interests.includes('stress') ? classes.boxSelected : classes.box}
                        onClick={(name) => handleChangeInterest('stress')}>
                            <img src='/interests-images/stress.png' alt='Stress' className={classes.icon}/>
                            <div className={classes.bottomContainer}>
                                <Divider className={classes.divider} fullWidth variant={'middle'}/>
                                <Typography variant={'h5'}>
                                    Stress
                                </Typography>
                            </div>
                        </Box>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4} style={{position: 'relative'}} className={classes.item}>
                    <div className={classes.boxContainer}>

                        {interests.includes('sleep') ?
                        <div className={classes.iconPositioner}>
                            <div className={classes.cropper}>
                                <CheckCircleIcon className={classes.checkIcon}/> 
                            </div>
                        </div>
                        
                        : null}
                        <Box 
                        className={interests.includes('sleep') ? classes.boxSelected : classes.box}
                        onClick={(name) => handleChangeInterest('sleep')}>
                            <img src='/interests-images/sleep.png' alt='Sleep' className={classes.icon}/>
                            <div className={classes.bottomContainer}>
                                <Divider className={classes.divider} fullWidth variant={'middle'}/>
                                <Typography variant={'h5'}>
                                    Sleep
                                </Typography>
                            </div>
                        </Box>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4} style={{position: 'relative'}} className={classes.item}>
                    <div className={classes.boxContainer}>
                        {interests.includes('diseases') ?
                        <div className={classes.iconPositioner}>
                            <div className={classes.cropper}>
                                <CheckCircleIcon className={classes.checkIcon}/> 
                            </div>
                        </div>
                        
                        : null}
                        <Box 
                        className={interests.includes('diseases') ? classes.boxSelected : classes.box}
                        onClick={(name) => handleChangeInterest('diseases')}>
                            <img src='/interests-images/diseases.png' alt='Diseases' className={classes.icon}/>
                            <div className={classes.bottomContainer}>
                                <Divider className={classes.divider} fullWidth variant={'middle'}/>
                                <Typography variant={'h5'}>
                                    Diseases 
                                </Typography>
                            </div>
                        </Box>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4} style={{position: 'relative'}} className={classes.item}>
                    <div className={classes.boxContainer}>
                        {interests.includes('mental-health') ?
                        <div className={classes.iconPositioner}>
                            <div className={classes.cropper}>
                                <CheckCircleIcon className={classes.checkIcon}/> 
                            </div>
                        </div>
                        
                        : null}
                        <Box 
                        className={interests.includes('mental-health') ? classes.boxSelected : classes.box}
                        onClick={(name) => handleChangeInterest('mental-health')}>
                            <img src='/interests-images/mental-health.png' alt='Mental Health' className={classes.icon}/>
                            <div className={classes.bottomContainer}>
                                <Divider className={classes.divider} fullWidth variant={'middle'}/>
                                <Typography variant={'h5'}>
                                    Mental Health
                                </Typography>
                            </div>
                        </Box>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4} style={{position: 'relative'}} className={classes.item}>
                    <div className={classes.boxContainer}>
                        {interests.includes('pain-managment') ?
                        <div className={classes.iconPositioner}>
                            <div className={classes.cropper}>
                                <CheckCircleIcon className={classes.checkIcon}/> 
                            </div>
                        </div>
                        
                        : null}
                        <Box 
                        className={interests.includes('pain-managment') ? classes.boxSelected : classes.box}
                        onClick={(name) => handleChangeInterest('pain-managment')}>
                            <img src='/interests-images/pain.png' alt="Pain Management" className={classes.icon}/>
                            <div className={classes.bottomContainer}>
                                <Divider className={classes.divider} fullWidth variant={'middle'}/>
                                <Typography variant={'h5'}>
                                    Pain Management
                                </Typography>
                            </div>
                        </Box>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4} style={{position: 'relative'}} className={classes.item}>
                    <div className={classes.boxContainer}>

                        {interests.includes('weight-loss') ?
                        <div className={classes.iconPositioner}>
                            <div className={classes.cropper}>
                                <CheckCircleIcon className={classes.checkIcon}/> 
                            </div>
                        </div>
                        
                        : null}
                        <Box 
                        className={interests.includes('weight-loss') ? classes.boxSelected : classes.box}
                        onClick={(name) => handleChangeInterest('weight-loss')}>
                            <img src='/interests-images/weight.png' alt='Weight Loss' className={classes.icon}/>
                            <div className={classes.bottomContainer}>
                                <Divider className={classes.divider} fullWidth variant={'middle'}/>
                                <Typography variant={'h5'}>
                                    Weight Loss
                                </Typography>
                            </div>
                        </Box>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4} style={{position: 'relative'}} className={classes.item}>
                    <div className={classes.boxContainer}>
                        {interests.includes('workplace') ?
                        <div className={classes.iconPositioner}>
                            <div className={classes.cropper}>
                                <CheckCircleIcon className={classes.checkIcon}/> 
                            </div>
                        </div>
                        
                        : null}
                        <Box 
                        className={interests.includes('workplace') ? classes.boxSelected : classes.box}
                        onClick={(name) => handleChangeInterest('workplace')}>
                            <img src='/interests-images/workplace.png' alt='Workplace' className={classes.icon}/>
                            <div className={classes.bottomContainer}>
                                <Divider className={classes.divider} fullWidth variant={'middle'}/>
                                <Typography variant={'h5'}>
                                    Workplace
                                </Typography>
                            </div>
                        </Box>
                    </div>
                </Grid>

            </Grid>
            
        </div>
    )
}

export default Interests