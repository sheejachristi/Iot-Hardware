import React, {Suspense} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom"
import {IntlProvider} from "react-intl";
import messages from "./config/locales/en";
import routes from "./config/routes";
import {UserContextProvider} from "./context/user-context";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
    //TODO Pull locale form user or browser
    return (
        <UserContextProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <IntlProvider locale={'en'} messages={messages}>
                    <Router>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                {routes}
                            </Switch>
                        </Suspense>
                    </Router>
                </IntlProvider>
            </MuiPickersUtilsProvider>
        </UserContextProvider>
    );
}


export default App;
