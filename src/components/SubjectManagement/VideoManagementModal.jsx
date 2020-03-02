import {useForm} from "react-hook-form";
import { Modal } from 'react-bootstrap';
import Button from "components/CustomButton/CustomButton.jsx";
import { Grid, Col, FormGroup, ControlLabel, Row, Form } from "react-bootstrap";
import React, { useState } from "react";
import { createVideoDocument } from '../../api/api';
const VideoManagementModal = props => {

    const [spinner, setSpinner] = useState(false);
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = async (values) => {
        setSpinner(true)
        let response = await createVideoDocument(props.id,values.name, values.videoUrl, values.thumbnailUrl);
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
                                        <Modal.Title><center>Add Video</center></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <FormGroup
                                            validationState={errors.name && errors.name.message ? "error" : "success"}
                                        >
                                            <ControlLabel>Video Name</ControlLabel>
                                            <input
                                                name="name"
                                                ref={register}
                                                required
                                                placeholder="Enter your Video Name"
                                                className="form-control"
                                            />

                                            {(errors.name && errors.name.message) && <small className="text-danger">{errors.name && errors.name.message}</small>}
                                        </FormGroup>
                                        <FormGroup
                                            validationState={errors.videoUrl && errors.videoUrl.message ? "error" : "success"}
                                        >
                                            <ControlLabel>Video Url</ControlLabel>
                                            <input
                                                name="videoUrl"
                                                ref={register}
                                                required
                                                placeholder="Enter your Video Url"
                                                className="form-control"
                                            />

                                            {(errors.videoUrl && errors.videoUrl.message) && <small className="text-danger">{errors.videoUrl && errors.videoUrl.message}</small>}
                                        </FormGroup>
                                        <FormGroup
                                            validationState={errors.thumbnailUrl && errors.thumbnailUrl.message ? "error" : "success"}
                                        >
                                            <ControlLabel>Thumbnail Url</ControlLabel>
                                            <input
                                                name="thumbnailUrl"
                                                ref={register}
                                                required
                                                placeholder="Enter your Thumbnail Url "
                                                className="form-control"
                                            />

                                            {(errors.thumbnailUrl && errors.thumbnailUrl.message) && <small className="text-danger">{errors.thumbnailUrl && errors.thumbnailUrl.message}</small>}
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

export default VideoManagementModal;



