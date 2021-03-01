import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import{
    Typography,
    Button
} from '@material-ui/core/'
import { 
    mdiHeartPulse,
    mdiThermometerLines,
    mdiHumanMaleHeight,
    mdiScale
} from '@mdi/js';
import Icon from '@mdi/react'
import JourneyEntry from './JourneyEntry'

const useStyles = makeStyles((theme) => ({ 
    root: {
        width: '100%',
        boxSizing: 'border-box',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#D8D8D8',
        marginBottom: theme.spacing(5)
    },
    header: {
        color: theme.palette.secondary.dark,
        boxSizing: 'border-box',
        width: '100%',
        paddingLeft: '3.125rem',
        paddingRight: '3.125rem',
        paddingTop: '15px',
        paddingBottom: '14px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    divider: {
        height: '100%',
        width: '2px',
        backgroundColor: theme.palette.secondary.light,
        marginRight: '10px',
        marginLeft: '12px'
    },
    headerText: {
        fontSize: '0.875rem',
        fontWeight: 700
    },
    headerIcon: {
        height: '1rem',
        marginRight: '10px'
    },
    date: {
        fontSize: '0.875rem',
        fontWeight: 900
    },
    body: {
        backgroundColor: theme.palette.grey.pale,
        boxSizing: 'border-box',
        width: '100%',
        paddingLeft: '3.125rem',
        paddingRight: '3.125rem',
        paddingTop: theme.spacing(3),
        paddingBottom: '3.125rem',
    },
    bodyHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: theme.spacing(2),
        borderBottomStyle: 'solid',
        borderWidth: '5px',
        borderColor: theme.palette.secondary.contrastText,
        marginBottom: theme.spacing(3)
    },
    notesButton: {
        height: '2.5rem'
    }
}))

const JourneyItem = ({items, date, doctor}) => {
    const classes = useStyles();

    return (
        <div className={classes.root} key={date}>
            <div className={classes.header}>

                <Typography className={classes.date} varaint='h5'>
                    {date}
                </Typography>
            </div>

            <div className={classes.body}>
                <div className={classes.bodyHeader}>
    {/*<div className={classes.providerInfo}>
                        <Typography variant='h2'>
                            {doctor}
                        </Typography>
       <Typography variant='h4'>
                            Practice Name Network
                        </Typography>
                    </div>*/}

        {/*<Button variant='contained' color='secondary' className={classes.notesButton}>
                        Add Note
                    </Button>*/}
                </div>

                {items.map(item => <JourneyEntry key={item.id} item={item}/>)}
            </div>
        </div>
    )
}

export default JourneyItem