import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DailySale from '../../components/Sale/Sale'
const Sale = (props) => {
    return (<Row>
        
        <Col md="12">
            <DailySale/>
        </Col>
        

    </Row>)
}
export default Sale;