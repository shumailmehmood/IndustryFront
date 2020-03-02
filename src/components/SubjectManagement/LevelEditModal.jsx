
import {useForm} from "react-hook-form";
import { Modal } from 'react-bootstrap';
import Button from "components/CustomButton/CustomButton.jsx";
import { Grid, Col, FormGroup, ControlLabel, Row, Form } from "react-bootstrap";
import React, { useState } from "react";
import { editLevel } from '../../api/api';
const LevelEditModal = (props) => {

    const [spinner, setSpinner] = useState(false);
    const { handleSubmit, register, errors } = useForm({
        defaultValues: {
            name: props.doc.params,
            sampleSize: props.doc.sampleSize,
        }
    });
    const onSubmit = async (values) => {
        setSpinner(true)
        let data = {}
        data.orignalValue = props.doc.params
        data.newValue = values.name
        data.sampleSize = values.sampleSize

        let response = await editLevel(props.doc.subjectID, data);
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
                    {console.log('sampleSize',props.doc)}
            <Grid fluid>
                <Row>
                    <Col>
                        <Col md={6} >
                            <Modal show={props.show} onHide={props.handleClose}>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Modal.Header closeButton className="mdhead" style={{ backgroundColor: '#0F4B5F', color: '#E1FADF' }}>
                                        <Modal.Title><center>Edit Level</center></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <FormGroup
                                            validationState={errors.name && errors.name.message ? "error" : "success"}
                                        >
                                            <ControlLabel>Level</ControlLabel>
                                            <input
                                                name="name"
                                                ref={register}
                                                required
                                                placeholder="Enter your Level"
                                                className="form-control"
                                            />

                                            {(errors.name && errors.name.message) && <small className="text-danger">{errors.name && errors.name.message}</small>}
                                        </FormGroup>
                                        <FormGroup
                                            validationState={errors.sampleSize && errors.sampleSize.message ? "error" : "success"}
                                        >
                                            <ControlLabel>Sample Size</ControlLabel>
                                            <input
                                                name="sampleSize"
                                                ref={register}
                                                required
                                                placeholder="Enter your Sample Size"
                                                className="form-control"
                                            />

                                            {(errors.sampleSize && errors.sampleSize.message) && <small className="text-danger">{errors.sampleSize && errors.sampleSize.message}</small>}
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

export default LevelEditModal;


