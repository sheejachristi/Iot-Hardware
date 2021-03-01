import React from "react";
import { makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    errorContainer: {
        width: '100%',
        marginTop: '9.375rem',
        paddingBottom: '12.5rem'
    },
    errorBox: {
        width: '100%',
        height: '25.625rem',
        background: 'linear-gradient(180deg, rgba(230,243,209,0.2), rgba(230,243,209,0.5))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    connectImage: {
        width: '30%',
        marginTop: '-6.25rem',
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        }
    },
    errorText: {
        width: '60%',
        textAlign: 'center',
        marginBottom: '3.125rem',
        lineHeight: '2.25rem'
    },
}))

const NoConnectionError = () => {
    const classes = useStyles();

    return (

        <div className={classes.errorContainer}>
            <div className={classes.errorBox}>
                <img src={"/error-icons/image_api-error.png"} className={classes.connectImage} alt='connect network'/>
                <Typography variant='h3' className={classes.errorText}>
                    We are having issues retrieving information from this resource at the moment. Thank you for your patience.
                </Typography>
            </div>
        </div>
    )
}

export default NoConnectionError