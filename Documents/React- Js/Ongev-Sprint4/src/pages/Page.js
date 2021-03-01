import React from "react";
import { makeStyles} from "@material-ui/core/styles";
import Header from "./Header";
import Footer from './Footer'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        overflow: 'auto',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        top: 'auto',
    }
}))

const Page = ({children, pageTitle, onBackClick, isLoading, errors }) => {
    const classes = useStyles();


    return(
        <div className={classes.root}>
            <Header/>
            <main className={classes.content}>{children}</main>
            <Footer/>
        </div>
    );

}


export default Page