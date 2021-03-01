import React from "react";
import { makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    // title: {
    //     width: '22%'
    // },
    titleImage: {
        height: 'auto',
        width: '280px',
        '&:hover': {
            cursor: 'pointer',
        },
        [theme.breakpoints.down('xs')]: {
            width: '200px',
        }
    },
    titleImageCompany: {
        // height: 'auto',
        width: '180px',
        [theme.breakpoints.down('xs')]: {
            width: '100px',
        }
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: '425px',
        paddingTop: theme.spacing(3),
        backgroundColor: theme.palette.primary.pale,
    },
    titles: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 'auto',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(620 + theme.spacing(6))]: {
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
    },
    titlesSmall: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 'auto',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(620 + theme.spacing(6))]: {
            width: '60%',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
    },
    content: {
        marginTop: '-300px',
    },
    footer: {
        textAlign: 'center',
        marginBottom: theme.spacing(6),
        marginTop: theme.spacing(10),
    },
    copyrightText: {
        fontSize: '12px',
        lineHeight: '14px',
    },
    title: {
        height: '9.375rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    companyTitle: {
        height: 'calc(100% - 220px)',
        marginBottom: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        
    },
    companyBox: {
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: theme.palette.grey.main,
        borderBottomStyle: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: theme.spacing(2, 3),
    }
}))

const PageCompany = ({children, logoUrl, size}) => {
    const classes = useStyles();
    const history = useHistory()
    const logo = (<img className={classes.titleImage} onClick={() => history.push("/dashboard")} src={"/logos/ongev_L_clr.png"} alt={"Ongev Logo"}/>);
    const logoCompany = (<img className={classes.titleImageCompany} src={logoUrl} alt={"Alt Logo"}/>);

    return(
        <div className={classes.root}>
            <div className={classes.titleContainer}>
                <div className={size && size === 'sm' ?  classes.titlesSmall : classes.titles}>
                    <Typography className={classes.title} component={"h1"} color={"inherit"} noWrap>
                        {logo}
                    </Typography>
                    <Typography className={classes.companyTitle} component={"h1"} color={"inherit"} noWrap>
                        {logoUrl ? 
                        <div className={classes.companyBox}>
                            {logoCompany} 
                        </div>
                        : null}
                    </Typography>
                </div>
            </div>
            <main className={classes.content}>{children}</main>
            <div className={classes.footer}>
                <Typography variant={'body1'} className={classes.copyrightText}>
                    Ongev is a registered trademark of Ongev, Inc. ©2020 Ongev Inc.
                </Typography>
            </div>
        </div>
    );

}

export default PageCompany