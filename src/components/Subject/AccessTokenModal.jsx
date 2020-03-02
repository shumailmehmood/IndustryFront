import React, { useState, useEffect } from "react";
import {useForm} from "react-hook-form";
import { Modal } from 'react-bootstrap';
import Button from "components/CustomButton/CustomButton.jsx";
import { Grid, Col, FormGroup, ControlLabel, Row, Form } from "react-bootstrap";

import { editSubject } from '../../api/api';
import { RemoveInternalSpaces } from "../../misc/helper"
const AccessTokenModal = (props) => {
    const [spinner, setSpinner] = useState(false);
    const [defaultVal, setDefaultVal] = useState({});
    const { handleSubmit, register, errors } = useForm({
        defaultValues: defaultVal
    });
    useEffect(() => {
        let data = {};        
        data[RemoveInternalSpaces(props.doc.name)] = props.doc.value
        setDefaultVal(data)
    }, [])
    const onSubmit = async (values) => {
        setSpinner(true)
        let data = {}
        data[RemoveInternalSpaces(props.doc.name)] = values[RemoveInternalSpaces(props.doc.name)]
        let response = await editSubject(props.doc.id, data);
        if (response.error) {
            setSpinner(false)
            props.handleClose()
        } else {
            setSpinner(false)
            props.handleClose()
        }
    }
    return (
        <div className="content">
            <Grid fluid>
                <Row>
                    <Col>
                        <Col md={6} >
                            <Modal show={props.show} onHide={props.handleClose}>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Modal.Header closeButton className="mdhead" style={{ backgroundColor: '#0F4B5F', color: '#E1FADF' }}>
                                        <Modal.Title><center>Edit Subject</center></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <FormGroup
                                            validationState={errors.name && errors.name.message ? "error" : "success"}
                                        >
                                            <ControlLabel>{props.doc.name}</ControlLabel>
                                            <input
                                                name={`${RemoveInternalSpaces(props.doc.name)}`}
                                                ref={register}
                                                required
                                                placeholder="Enter your Subject Name"
                                                className="form-control"
                                            />

                                            {(errors.name && errors.name.message) && <small className="text-danger">{errors.name && errors.name.message}</small>}
                                        </FormGroup>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button style={{ backgroundColor: '#0f4b5f' }} disabled={spinner} type="submit" fill wd>
                                            {spinner ? 'SUBMITTING....' : 'Proceed'}
                                            <i className={spinner ? 'fa fa-spin fa-spinner' : null} />
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                        </Col>
                    </Col>
                </Row>
            </Grid>
        </div >
    );
};

export default AccessTokenModal;

