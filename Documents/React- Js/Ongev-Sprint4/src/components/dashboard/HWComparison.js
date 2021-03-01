import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import{
    Grid,
    Typography,
    SvgIcon
} from '@material-ui/core/'
import {ReactComponent as WeightIcon} from '../icons/icon_weight.svg'
import {ReactComponent as HeightIcon} from '../icons/icon_height.svg'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    item: {
        backgroundColor: theme.palette.primary.pale,
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: theme.palette.primary.dark,
        height: '18.25rem',
        borderRadius: '3px',
        padding: theme.spacing(5),
        boxSizing: 'border-box',
    },
    titles: {
        color: theme.palette.primary.darkest,
        marginBottom: theme.spacing(5)
    },
    subtext: {
        color: theme.palette.primary.dark,
        fontWeight: 700,
    },
    iconFrame: {
        height: '5.625rem',
        backgroundColor: theme.palette.primary.dark,
        width: '100%',
        color: theme.palette.primary.pale,
        fontSize: '3.125rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    personalBar: {
        backgroundColor: theme.palette.primary.darkest,
        height: '2.5rem',
        color: theme.palette.primary.contrastText,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        boxSizing: 'border-box',
    },
    averageBar: {
        backgroundColor: theme.palette.primary.main,
        height: '2.5rem',
        color: theme.palette.primary.contrastText,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        boxSizing: 'border-box',
    },
    barText: {
        fontSize: '14px',
        fontWeight: 700
    },
    barContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    solobarContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
}))

const HWComparison = ({profile}) => {
    const classes = useStyles();
    const height = parseInt(profile.height)
    const weight = parseInt(profile.weight)
    const averageHeight = 67
    const averageWeight = 182
    let averageHeightLength, averageWeightLength, heightLength, weightLength
    if (weight) {
        if (weight > averageWeight) {
            weightLength = '100%'
            const ratio = averageWeight/weight
            averageWeightLength = (ratio * 100).toString() + '%'
        } else {
            averageWeightLength = '100%'
            const ratio = weight/averageWeight
            weightLength = (ratio * 100).toString() + '%'
        }
    }
    if (height) {
        if (height > averageHeight) {
            heightLength = '100%'
            const ratio = averageHeight/height
            averageHeightLength = (ratio * 100).toString() + '%'
        } else {
            averageHeightLength = '100%'
            const ratio = height/averageHeight
            heightLength = (ratio * 100).toString() + '%'
        }
    }

    const parseHeight = (height) => {
        if (height.toString().split("'").length > 1 ) {
            return height
        } else {
            const feet = Math.floor(height/ 12)
            const inches = Math.floor(height % 12)
            return `${feet}' ${inches}"`
        }
    }


    return (
        <div className={classes.root}>
            <Grid container  spacing={3}>
                <Grid item xs={12} md={6} >
                    <div className={classes.item}>
                        <div className={classes.titles}>
                            <Typography variant='h3'>
                                Weight Comparison
                            </Typography>
                            <Typography variant='body1' className={classes.subtext}>
                                You vs National Average
                            </Typography>
                        </div>

                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <div className={classes.iconFrame}>
                                    <SvgIcon fontSize='inherit'>
                                        <WeightIcon />
                                    </SvgIcon>
                                </div>
                            </Grid>

                            <Grid item xs={9}>
                                {!profile.weight ?
                                <div className={classes.solobarContainer}>
                                    <div style={{width: '100%'}} className={classes.averageBar}>
                                        <Typography variant='body1' className={classes.barText}>
                                            Average
                                        </Typography>
                                        <Typography variant='body1' className={classes.barText}>
                                            {averageWeight + ' lbs'}
                                        </Typography>
                                    </div>
                                </div>
                                :
                                <div className={classes.barContainer}>
                                    <div style={{width: weightLength}} className={classes.personalBar}>
                                        <Typography variant='body1' className={classes.barText}>
                                            You
                                        </Typography>
                                        <Typography variant='body1' className={classes.barText}>
                                            {weight + ' lbs'}
                                        </Typography>
                                    </div>

                                    <div style={{width: averageWeightLength}} className={classes.averageBar}>
                                        <Typography variant='body1' className={classes.barText}>
                                            Average
                                        </Typography>
                                        <Typography variant='body1' className={classes.barText}>
                                            {averageWeight + ' lbs'}
                                        </Typography>
                                    </div>
                                </div>
                                }
                            </Grid>
                        </Grid>
                    </div>

                </Grid>

                <Grid item xs={12} md={6}>
                    <div className={classes.item}>
                        <div className={classes.titles}>
                            <Typography variant='h3'>
                                Height Comparison
                            </Typography>
                            <Typography variant='body1' className={classes.subtext}>
                                You vs National Average
                            </Typography>
                        </div>

                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <div className={classes.iconFrame}>
                                    <SvgIcon fontSize='inherit'>
                                        <HeightIcon />
                                    </SvgIcon>
                                </div>
                            </Grid>

                            <Grid item xs={9}>
                                {!profile.height ?
                                <div className={classes.solobarContainer}>
                                    <div style={{width: '100%'}} className={classes.averageBar}>
                                        <Typography variant='body1' className={classes.barText}>
                                            Average
                                        </Typography>
                                        <Typography variant='body1' className={classes.barText}>
                                            {parseHeight(averageHeight)}
                                        </Typography>
                                    </div>
                                </div>
                                :
                                <div className={classes.barContainer}>
                                    <div style={{width: heightLength}} className={classes.personalBar}>
                                        <Typography variant='body1' className={classes.barText}>
                                            You
                                        </Typography>
                                        <Typography variant='body1' className={classes.barText}>
                                            {parseHeight(height)}
                                        </Typography>
                                    </div>

                                    <div style={{width: averageHeightLength}} className={classes.averageBar}>
                                        <Typography variant='body1' className={classes.barText}>
                                            Average
                                        </Typography>
                                        <Typography variant='body1' className={classes.barText}>
                                            {parseHeight(averageHeight)}
                                        </Typography>
                                    </div>
                                </div>
                                }
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default HWComparison