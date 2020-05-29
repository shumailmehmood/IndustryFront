import React from 'react';
import {
    Col,
    Row,
} from "react-bootstrap";
import Card from "../../components/Card/Card"

import Seller from '../../components/SellerRegisteration/SellerRegisteration'
import Item from '../../components/ItemRegisterationForm/ItemRegisterationForm'

function Registeration(props) {
    return (
        <div>
            <Row>
                <Col md="6">
                    <Card
                        content={
                            <Item />
                        }
                    />

                </Col>
                <Col md="6">
                    <Row>
                        <Col md="1"></Col>
                        <Col md="10"> <Card
                            content={
                                <Seller />
                            }
                        /></Col>
                        <Col md="1"></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Registeration;
