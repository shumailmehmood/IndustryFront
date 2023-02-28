import React from 'react';
import {
    Col,
    Row,
    Tab,Nav,
    NavItem
} from "react-bootstrap";
import Card from "../../components/Card/Card"

import Seller from '../../components/SellerRegisteration/SellerRegisteration'
import Item from '../../components/ItemRegisterationForm/ItemRegisterationForm'
import ItemView from "../../components/ItemView/itemView"
import { getQuery } from '../../misc/helper'

function Registeration(props) {
    return (
        <div>
 <Tab.Container id="tabs-with-dropdown" defaultActiveKey={getQuery().tab ? getQuery().tab : "item"}>
                <Row className="clearfix">
                    <Col sm={12} className="tabular">
                        <Nav bsStyle="tabs" className="bgtbs">
                            <NavItem eventKey="item" onClick={() => {
                                props.history.push(`${props.match.path}?tab=item`)
                            }}>Items</NavItem>
                            <NavItem eventKey="dp" onClick={() => {
                                props.history.push(`${props.match.path}?tab=dp`)
                            }}>Delivery Person</NavItem>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="item">
                            
                            <Row>
                                <Col md={6} xs={12}>
                               <Item /> 
                    </Col>
                    <Col md={6} xs={12}>
                     <ItemView />
                    </Col>
                    </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="dp">
                             <Card
                            content={
                                <Seller />
                            }
                        />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

          
        </div>
    );
}

export default Registeration;
