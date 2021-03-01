import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import{
    Grid,
    Typography,
    Button
} from '@material-ui/core/'
import {useHistory} from 'react-router-dom';
import PageviewIcon from '@material-ui/icons/Pageview';

const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            height: '17.5rem',
            // minHeight: '17.5rem',
            padding: '1.25rem',
            backgroundColor: theme.palette.primary.main,
            boxSizing: 'border-box',
            [theme.breakpoints.down('xs')]: {
                height: '37.5rem',
            }
        },
        container: {
            height: '100%',
            // minHeight: '17.5rem',
            width: '100%',
            borderStyle: 'solid',
            borderColor: theme.palette.primary.contrastText,
            borderWidth: '2px'
        },
        left: {
            display: 'flex'
        },
        right: {
            color: theme.palette.primary.contrastText,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '100%',
            width: '85%',
            boxSizing: 'border-box',
            [theme.breakpoints.down('xs')]: {
                width: '95%',
                height: 'auto',
                alignItems: 'center'
            }
        },
        bodyText: {
            lineHeight: '30px',
            fontWeight: 400,
            width: 'inherit',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'center'
            },
        },
        button: {
            width: '18.75rem',
            //jira:-226 added marginTop: '-3rem',
            marginTop: '-3rem',
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.dark,
            '&:hover': {
                color: theme.palette.primary.contrastText,
            },
            [theme.breakpoints.down('xs')]: {
                width: '14rem',
            },
        },
        image: {
            height: '190px',
            width: '206px',
            margin: 'auto',
            [theme.breakpoints.down('xs')]: {
                height: '230px',
                width: '250px',
            },
        }

    }))

const TrialBanner = () => {
    const classes = useStyles();
    const history = useHistory()

    return (
        <div className={classes.root}>
<div className={classes.container}>
<Grid container style={{height: '100%'}}>

<Grid item sm={4} xs={12} className={classes.left}>
<img src='error-icons/image_clinical-match.png' className={classes.image} alt='trials'/>
        </Grid>

        <Grid item sm={8} xs={12} className={classes.right}>
    {/* <Typography variant='h2'>
     Guess What?
     </Typography>
     className={classes.bodyText}
     */}

    {/* fixed jira:-226  */}
<Typography variant='h4'>
        Search our database of clinical trial matching for any chronic diseases you or a loved one may be suffering from.
    </Typography>

    <Button
    variant='contained'
    color='primary'
    className={classes.button}
    startIcon={<PageviewIcon/>}
    onClick={() => history.push("/trial/treatment-search")}>
    View Our Clinical Trials
    </Button>

    </Grid>

    </Grid>

    </div>

    </div>

)
}

export default TrialBanner