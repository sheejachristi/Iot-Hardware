import React from 'react';
// import UserContext from "../context/user-context";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from "react-router-dom";


const DrawerMenu = (() => {

    // const [profile, dispatch] = useContext(UserContext);

    const navigationList = [
        {
            linkText: 'Home',
            linkTarget: '/home',
        },
        {
            linkText: 'Dashboard',
            linkTarget: '/dashboard',
        },
        {
            linkText: 'Trial Search',
            linkTarget: '/trial/treatment-search',
        },
        {
            linkText: 'EHR Record',
            linkTarget: '/health-timeline',
        },
    ];

    return(
        <List>
            {navigationList.map((navItem,index) => {
                return( <ListItem button key={navItem.linkText} component={Link} to={navItem.linkTarget}>
                    <ListItemText primary={navItem.linkText} >
                        <Link to={navItem.linkTarget} />
                    </ListItemText>
                </ListItem>);
            })}
        </List>
    )

});

export default DrawerMenu
