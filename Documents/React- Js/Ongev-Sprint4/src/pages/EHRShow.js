import React, { useEffect, useState, useContext }  from 'react'
import getEHRPatient from '../utils/ehrRecord'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Page from './Page'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {blue, grey, teal} from "@material-ui/core/colors";
import clsx from "clsx";
import {injectIntl} from 'react-intl'
import { UserContext} from "../context/user-context";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        alignContent: "center",
        justifyContent: "center",
        
    },
    paper: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        padding: theme.spacing(4),
        [theme.breakpoints.up(620 + theme.spacing(6))]: {
            width: "80%",
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        backgroundColor: grey[50],
        alignItems: "center",
        color: grey[700]
    },
    providerContainer: {
        flexDirection: "row",
        backgroundColor: teal[200],
        justify: "center",
        alignItems: "center",
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(4),
        color: grey[800],
        padding: theme.spacing(2),
        borderRadius: '10px',
    },
    infoContainer: {
        flexDirection: "row",
        backgroundColor: blue[500],
        justify: "center",
        alignItems: "center",
        marginBottom: theme.spacing(4),
        color: grey[50],
        padding: theme.spacing(2),
    },
    infoItem: {
        paddingLeft: theme.spacing(2),
    },
    boldText: {
        fontWeight: 'bold'
    },
    contactContainer: {
        flexDirection: "row",
        backgroundColor: teal[200],
        textAlign: 'center',
        marginBottom: theme.spacing(4),
        color: grey[800],
        padding: theme.spacing(2),
    },
    addressContainer: {
        flexDirection: "row",
        borderColor: blue[500],
        borderStyle: 'solid',
        borderWidth: '2px',
        textAlign: 'center',
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(4),
        color: blue[500],
        padding: theme.spacing(4),
    },
    addressItem: {
        borderRightStyle: 'solid',
        borderWidth: '1px'
    }
}))

const EHRShow = ({intl}) => {

    const classes = useStyles();

    const [ loading, setLoading] = useState(true)
    const [ profile, setProfile ] = useState()
    const [user] = useContext(UserContext);

    const canDate = !loading && !!profile && !!profile.name
    if (!!canDate) {
        debugger
    }


    const splitDate = canDate ? profile.birthDate.split('-') : null

    const date = canDate ? new Date(splitDate[0], splitDate[1] - 1, splitDate[2]): null;
    const month = canDate ? date.toLocaleString('default', { month: 'long' }) : null;
    const day = canDate ? parseInt(splitDate[2]) : null
    const name = canDate ? profile.name[0].text : null
    const [errors, setErrors] = useState(false)

    useEffect(() => {
        getEHRPatient(user.uid)
            .then((response) => {
                if (response) {
                    setProfile(response.resource)
                    setLoading(false)
                } else {
                    setProfile(false)
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.log('Error ', error)
                setErrors({message: 'Something went wrong'})
            })
    }, [ user ])

    return (
        <Page pageTitle={intl.formatMessage({id: 'dashboard_title'})} errors={errors}>
            <Paper className={clsx(classes.paper)} elevation={6}>
                <Typography component={"h1"} variant={"h3"} className={classes.boldText}>
                    {loading ? 'Loading..' :  !canDate ? 'No data found/expired' : `Patient Name: ${name}` }
                </Typography><br/>
                {loading || !canDate ? null :
                <div>
                    <Grid container direction={"row"} className={classes.providerContainer} >
                        <Grid item xs={3}>
                            <Typography component={"h5"} variant={"h5"} className={classes.boldText}>
                                Healthcare Provider:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            
                        </Grid>
                        <Grid item xs={3}>
                            <Typography component={"h6"} variant={"h6"} className={classes.boldText}>
                                {profile.careProvider[0].display}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Typography component={"h1"} variant={"h4"} className={classes.boldText}>
                        Basic Info:
                    </Typography>

                    <Grid container direction={"row"} className={classes.infoContainer} >
                        <Grid item xs={3} className={classes.infoItem}>
                            <Typography component={"h5"} variant={"h5"} className={classes.boldText}>
                                Born:
                            </Typography><br/>
                            <Typography component={"h6"} variant={"h6"} className={classes.boldText}>
                                {splitDate ? `${month} ${day}, ${splitDate[0]}` : null}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} className={classes.infoItem}>
                            <Typography component={"h5"} variant={"h5"} className={classes.boldText}>
                                Marital Status:
                            </Typography><br/>
                            <Typography component={"h6"} variant={"h6"} className={classes.boldText}>
                                {profile.maritalStatus.text}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} className={classes.infoItem}>
                            <Typography component={"h5"} variant={"h5"} className={classes.boldText}>
                                Prefered Language:
                            </Typography><br/>
                            <Typography component={"h6"} variant={"h6"} className={classes.boldText}>
                                {profile.communication.filter(language => language.preferred)[0].language.text}
                            </Typography><br/>
                            <Typography component={"h5"} variant={"h5"} className={classes.boldText}>
                                All Languages:
                            </Typography><br/>
                            {profile.communication.map(language => {
                                return (
                                    <>
                                    <Typography component={"p"} className={classes.boldText}>
                                        {language.language.text}
                                    </Typography><br/>
                                    </>
                                )
                            })}
                        </Grid>
                        <Grid item xs={3} className={classes.infoItem}>
                            <Typography component={"h5"} variant={"h5"} className={classes.boldText}>
                                Ethnicity and Gender:
                            </Typography><br/>
                            {profile.extension.map(detail => {
                                return (
                                    <>
                                    <Typography component={"p"} className={classes.boldText}>
                                        {detail.valueCodeableConcept.text}
                                    </Typography><br/>
                                    </>
                                )
                            })}
                        </Grid>
                    </Grid>
                    
                    <Typography component={"h5"} variant={"h4"} className={classes.boldText}>
                        Contact Info:
                    </Typography>
                    <Grid container direction={"row"} className={classes.contactContainer} >
                        <Grid item xs={6}>
                            <Typography component={"h6"} variant={"h6"} className={classes.boldText}>
                                Email:
                            </Typography><br/>
                            {profile.telecom.filter(telecom => telecom.system === "email").map(email => {
                                return (
                                    <>
                                    <Typography component={"p"} className={classes.boldText}>
                                        {email.value}
                                    </Typography><br/>
                                    </>
                                )
                            })}
                            <Typography component={"h6"} variant={"h6"} className={classes.boldText}>
                                Fax:
                            </Typography><br/>
                            {profile.telecom.filter(telecom => telecom.system === "fax").map(fax => {
                                return (
                                    <>
                                    <Typography component={"p"} className={classes.boldText}>
                                        {fax.use}: {fax.value}
                                    </Typography><br/>
                                    </>
                                )
                            })}
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h6"} variant={"h6"} className={classes.boldText}>
                                Phone:
                            </Typography><br/>
                            {profile.telecom.filter(telecom => telecom.system === "phone" && !telecom.period).map(phone => {
                                return (
                                    <>
                                    <Typography component={"p"} className={classes.boldText}>
                                        {phone.use}: {phone.value}
                                    </Typography><br/>
                                    </>
                                )
                            })}
                        </Grid>
                    </Grid>
                    
                    <Grid container direction={"row"} className={classes.addressContainer} >
                        <Grid item xs={6} className={classes.addressItem}>
                            <Typography component={"h5"} variant={"h5"} className={classes.boldText}>
                                Current Address:
                            </Typography><br/>
                            {profile.address.filter(address => !address.period).map(address => {
                                return (
                                    <>
                                    <Typography component={"h6"} variant={"h6"} className={classes.boldText}>
                                        {address.use}:
                                    </Typography><br/>
                                    {address.line.map(line => {
                                        return(
                                            <>
                                            <Typography component={"p"} className={classes.boldText}>
                                                {line}
                                            </Typography><br/>
                                            </>
                                        )
                                    })}
                                    <Typography component={"p"} className={classes.boldText}>
                                        {address.city}, {address.state} {address.country} {address.postalCode}
                                    </Typography><br/>
                                    </>
                                )
                            })}
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} variant={"h5"} className={classes.boldText}>
                                Previous Addresses:
                            </Typography><br/>
                            {profile.address.filter(address => address.period).map(address => {
                                return (
                                    <>
                                    <Typography component={"h6"} variant={"h6"} className={classes.boldText}>
                                        {address.use}:
                                    </Typography><br/>
                                    {address.line.map(line => {
                                        return(
                                            <>
                                            <Typography component={"p"} className={classes.boldText}>
                                                {line}
                                            </Typography><br/>
                                            </>
                                        )
                                    })}
                                    <Typography component={"p"} className={classes.boldText}>
                                        {address.city}, {address.state} {address.country} {address.postalCode}
                                    </Typography><br/>
                                    </>
                                )
                            })}
                        </Grid>
                    </Grid>
                    
                    
                    
                    
                </div>

                }
            </Paper>
        </Page>

    )
}

export default injectIntl(EHRShow)