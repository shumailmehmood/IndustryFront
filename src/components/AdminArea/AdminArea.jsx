 import React, { Component } from 'react';
 import { Grid, Col, Row } from "react-bootstrap";
 import StatsCard from "components/Card/StatsCard.jsx";
 import { table_data } from "variables/Variables.jsx"; 
 import { NavLink } from "react-router-dom";
class AdminArea extends Component {
    createTableData() {
        var tableRows = [];  
        for (var i = 0; i < table_data.length; i++) {
            tableRows.push(
                <tr key={i}>
                    <td>
                        <div className="flag">
                            <img src={table_data[i].flag} alt="us_flag" />
                        </div>
                    </td>
                    <td>{table_data[i].country}</td>
                    <td className="text-right">{table_data[i].count}</td>
                    <td className="text-right">{table_data[i].percentage}</td>
                </tr>
            );
        }
        return tableRows;
    }
    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col lg={5} sm={10}>
                            <StatsCard
                                bigIcon={<i className="fa fa-map-marker" />}
                                statsText="User Role Management"
                                statsIconText={
                                <NavLink style={{
                                    marginLeft: 133
                                }}
                                to={'/admin/UserRoleManagement'}
                                className="nav-link"
                                activeClassName="active"
                                > < i className="fa fa-angle-double-right" />
                                Open
                                </NavLink>}
                            />
                        </Col>
                        <Col lg={5} sm={10}>
                            <StatsCard
                                bigIcon={<i className="fa fa-motorcycle" />}
                                statsText="User Activity Logs"
                                statsIconText={
                                <NavLink style={{
                                    marginLeft: 133
                                }}
                                to={'/admin/UsersLog'}
                                className="nav-link"
                                activeClassName="active"
                                > < i className="fa fa-angle-double-right" />
                                Open
                                </NavLink>}
                           
                            />
                        </Col>

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default AdminArea;
