import React, { useState } from 'react';
import { Col, Row, Modal, FormGroup } from "react-bootstrap";
import Card from '../Card/Card';
import Button from "components/CustomButton/CustomButton";
import { UPDATE_STOCK_BTN_NAME } from "../../misc/constants";
import { updateStock } from "../../api/api"
import { ErrorToast, SuccessfullToast } from "../../misc/helper"
const EditQuiz = (prop) => {
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState(0)
    onsubmit = () => {
        setLoading(true)
        updateStock(prop.id, { stockIn: value }).then(res => {
            if (res.error) {
                setLoading(false)
                ErrorToast(res.error.response.data);
            } else {
                SuccessfullToast("Updated")
                setLoading(false)
            }
        })
    }
    return (
        <Modal show={prop.show} onHide={prop.handleClose} bsSize="lg">
            <Modal.Header className="mdhead" closeButton >
                <Modal.Title>Add Stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md="1"></Col>
                    <Col md="10">
                        <Row>
                            <Card
                                content={
                                    <Row>
                                        <Col md="1">
                                        </Col>
                                        <Col md="5">
                                            <FormGroup>
                                                <input
                                                    type="number"
                                                    placeholder="Enter Quantity"
                                                    className={"form-control"}
                                                    name={'stockIn'}
                                                    onChange={(e) => setValue(e.target.value)}
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col md="5">
                                            <Button type="button" className="btn-fill" onClick={() => onsubmit()} >
                                                {loading ? <div><span>loading...</span><i className="fa fa-spin fa-spinner" /></div> : UPDATE_STOCK_BTN_NAME}
                                            </Button>
                                        </Col>
                                        <Col md="1">

                                        </Col>
                                    </Row>
                                }
                            />
                        </Row>
                    </Col>
                    <Col md="1"></Col>

                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default EditQuiz;