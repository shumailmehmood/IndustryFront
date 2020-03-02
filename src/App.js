import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import { AuthContext } from 'context/auth';
import AdminLayout from "layouts/Admin.jsx";
import AccountLayout from "layouts/Account.jsx";
import { setAxiosAuthorizationHeader } from 'axiosConfig';

function App(props) {
    const setTokensFromLocalStorage = () => {
        let tokens = localStorage.getItem("tokens");
        try {
            if (tokens) {
                let parseTokens = JSON.parse(tokens);
                setAxiosAuthorizationHeader(parseTokens.access_token);
                return parseTokens;
            }
        } catch (err) {
            return null;
        }

    }

    const [authTokens, setAuthTokens] = useState(setTokensFromLocalStorage());

    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAxiosAuthorizationHeader(data && data.access_token);
        setAuthTokens(data);
    }

    // <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    // </AuthContext.Provider>
    return <BrowserRouter>
        <Switch>
            <PrivateRoute path="/admin" component={props => <AdminLayout {...props} />} />
            <Route path="/account" component={props => <AccountLayout {...props} />} />
            <Redirect from="/" to="/admin/UserStatsView" />
        </Switch>
    </BrowserRouter>

}
export default App;