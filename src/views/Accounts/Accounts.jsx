import React from 'react'
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import Payment from "../../components/Payment/Payment"
import AccountsView from "../../components/AccountView/AccountView";
import { useEffect } from 'react';
import { getQuery } from '../../misc/helper'
const Accounts = (props) => {
    useEffect(() => {
        if (!getQuery().tab)
            props.history.push(`${props.match.path}?tab=payment`)
    }, [])

    return (
        <div>
            <Row></Row>
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey={getQuery().tab ? getQuery().tab : "payment"}>
                <Row className="clearfix">
                    <Col sm={12} className="tabular">
                        <Nav bsStyle="tabs" className="bgtbs">
                            <NavItem eventKey="payment" onClick={() => {
                                props.history.push(`${props.match.path}?tab=payment`)
                            }}>Payment</NavItem>
                            <NavItem eventKey="view" onClick={() => {
                                props.history.push(`${props.match.path}?tab=view`)
                            }}>View Payment History</NavItem>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="payment">
                                <Payment />
                            </Tab.Pane>
                            <Tab.Pane eventKey="view">
                                <AccountsView />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}
export default Accounts;