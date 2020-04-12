import React from 'react';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import CourierForm from "../../components/Courier/Courier"
import { getAllUsers, getAllItems } from "../../api/api"
import { useState, useEffect } from 'react';
import Sale from '../../components/Sale/Sale'
import _ from 'lodash'
import { getQuery } from '../../misc/helper'
const Courier = (props) => {
    const [user, setUser] = useState([])
    const [sType, setSType] = useState('')
    const [items, setItems] = useState([])
    useEffect(() => {
        if (!getQuery().tab)
            props.history.push(`${props.match.path}?tab=sendCourier`)
        getAllUsers().then(res => {
            if (res.error) { } else {
                setUser(_.chain(res.data).map(({ name, _id, vehicle_no, salary_type: { amount, catagory } }) => name = {
                    value: {
                        uid: {
                            item: _id,
                            name: name,
                            vehical_no: vehicle_no,
                            perAmount: amount,
                            category: catagory
                        }
                    }, label: name
                }).value())
            }

        })

        getAllItems().then(res => {
            if (res.error) { } else {
                setItems(_.chain(res.data).map(({ name, _id, sale_price, purchase_price }) => name = {
                    value: {
                        item_id: _id,
                        item_name: name,
                        sale_price: sale_price,
                        purchase_price: purchase_price
                    }, label: name
                }).value())
            }

        })
    }, [])
    return (
        <div>
            <Row></Row>
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey={getQuery().tab ? getQuery().tab : "sendCourier"}>

                <Row className="clearfix">
                    <Col sm={12} className="tabular">
                        <Nav bsStyle="tabs" className="bgtbs">
                            <NavItem eventKey="sendCourier" onClick={() => {
                                props.history.push(`${props.match.path}?tab=sendCourier`)
                            }}

                            >Send Courier</NavItem>
                            <NavItem eventKey="receiveCourier" onClick={() => {
                                props.history.push(`${props.match.path}?tab=receiveCourier`)
                            }}

                            >Return Courier</NavItem>
                            <NavItem eventKey="view" onClick={() => {
                                props.history.push(`${props.match.path}?tab=view`)
                            }}

                            >View Sales</NavItem>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="sendCourier">
                                <CourierForm user={user} items={items} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="receiveCourier">
                                <CourierForm user={user} items={items} checkout={true} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="view">
                                <Sale />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
};

export default Courier;