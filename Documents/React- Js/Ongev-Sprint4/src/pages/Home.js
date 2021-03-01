import React from 'react'
import { injectIntl } from 'react-intl'
import Page from './Page'
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cardMedia: {
    }

}))

const Home = ({ intl }) => {
    const classes = useStyles();
    return (
        <Page pageTitle={intl.formatMessage({ id: 'home' })} >
            <Card>
                <CardMedia className={classes.cardMedia} component={"img"} height="500" image={"/logos/ongev_L_wht.png"}>

                </CardMedia>
            </Card>

        </Page>
    )
}
export default injectIntl(Home)
