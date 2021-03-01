import PreAuthPage from './PreAuthPage'
import React from 'react';
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 'auto',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(620 + theme.spacing(6))]: {
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        color: theme.palette.grey.dark,
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
        marginBottom: theme.spacing(3),
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: `100%`,
        width: '100%'
    },
    textField: {
        marginBottom: theme.spacing(6),
        width: '75%'
    },
    browseButton: {
        width: '20%',
        height: '60px',
        marginTop: theme.spacing(1),
        fontSize: '18px',
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
        fontSize: '40px!important',
    },
    bottomContainer: {
        textAlign: 'left',
        width: '90%',
        margin: 'auto',
    },
    textFieldContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    uploadButton: {
        fontSize: '24px',
        height: '80px',
        marginBottom: theme.spacing(10)
    }
}))

const HealthRecordUpload = () => {
    const classes = useStyles()

    return (
        <PreAuthPage >
            <Paper className={classes.paper} elevation={6}>
                <div className={classes.container}>
                    <Typography component="h1" variant="h1" className={classes.title}>
                        Upload Your Health Record
                    </Typography>
                    <Typography component="h3" variant="h3" className={classes.titleBody}>
                        If you have a digital download of your medical records, you can upload it here (these files typically end in .emr, ??)
                    </Typography>
                </div>
                <div className={classes.bottomContainer}>
                    <Typography component='h5' variant='h5'>
                        Enter the name of your health network:
                    </Typography>
                    <div className={classes.textFieldContainer}>
                        <TextField
                            variant="outlined"
                            className={classes.textField}
                            // fullWidth
                            placeholder='Browse computer for file'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            variant='outlined'
                            color='primary'
                            className={classes.browseButton}>
                                Browse Files...
                        </Button>
                    </div>
                    <Button
                        variant='contained'
                        color='secondary'
                        startIcon={<CloudUploadIcon className={classes.icons}/>}
                        fullWidth
                        className={classes.uploadButton}>
                            Upload Your File
                    </Button>
                </div>
            </Paper>
        </PreAuthPage>
    )
}

export default HealthRecordUpload