import React from 'react';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import CourierForm from "../../components/Courier/Courier"
import { getAllUsers, getAllItems } from "../../api/api"
import { useState, useEffect } from 'react';
import _ from 'lodash'
const Courier = () => {
    const [user, setUser] = useState([])
    const [sType, setSType] = useState('')
    const [items, setItems] = useState([])
    useEffect(() => {
        getAllUsers().then(res => {
            if (res.error) { } else {
                setUser(_.chain(res.data).map(({ name, _id, vehicle_no }) => name = {
                    value: {
                        uid: {
                            item: _id,
                            name: name,
                            vehical_no: vehicle_no,
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
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey="send">

                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="send">Send Courier</NavItem>
                            <NavItem eventKey="receive">Return Courier</NavItem>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="send">
                                <CourierForm user={user} items={items} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="receive">
                                <CourierForm user={user} items={items} checkout={true} />
                            </Tab.Pane>

                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
};

export default Courier;