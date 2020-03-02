import React, { useState } from 'react';
import {
    Row, Col
} from "react-bootstrap"
import ViewStocks from "../../components/ViewStock/ViewStock";


const ViewStock = (props) => {


    return (
        <div>
          

            <Row>

                <Col md="12">
                    <ViewStocks />
                </Col>

            </Row>
        </div>
    );
};

export default ViewStock;