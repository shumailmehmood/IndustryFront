import React from 'react';
import SubjectManagement from '../../components/SubjectManagement/SubjectManagement'
import VideoManagement from '../../components/SubjectManagement/VideoManagement'
import { NavTab } from "react-router-tabs";
import "../../../node_modules/react-router-tabs/styles/react-router-tabs.css";
import { withRouter } from 'react-router' 
import queryString from 'query-string'


import { Route, Switch, Redirect } from "react-router-dom";
const SubjectManagementView = (props) => {
    var params = queryString.parse(props.location.search) 
    return (
        <div > 
            <div className="routeTabs">
                <NavTab to={`${props.match.path}/QuizManagement?id=${params.id}`}>QuizManagement</NavTab>
                <NavTab to={`${props.match.path}/VideoManagement?id=${params.id}`}>VideoManagement</NavTab>
            </div>
            <Switch>

                <Route
                    exact
                    path={`${props.match.path}`}
                    render={() => <Redirect replace to={`${props.match.path}/QuizManagement`} />}
                />
                <Route path={`${props.match.path}/QuizManagement`} component={SubjectManagement} />
                <Route path={`${props.match.path}/VideoManagement`} component={VideoManagement} />
            </Switch>

        </div>
    );
};

export default withRouter(SubjectManagementView);