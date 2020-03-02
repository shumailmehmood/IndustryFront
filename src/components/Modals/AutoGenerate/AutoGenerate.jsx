import React from 'react';
import {useForm} from 'react-hook-form';
import { Modal, Row, Col, FormGroup } from 'react-bootstrap';
import { GenerateAutoMcqs } from "../../../misc/helper"
import querystring from "query-string";
import { createQuiz } from "../../../api/api";
import { SuccessfullToast, ErrorToast } from "../../../misc/helper";
import { withRouter } from "react-router-dom";
import Button from "components/CustomButton/CustomButton.jsx";
import Card from '../../Card/Card';
const AutoGenerate = (prop) => {

    const {
        register,
        handleSubmit,
        formState: { dirty },
        errors
    } = useForm();
    const onSubmit = (data) => {
        let array = [];
        prop.dbData.forEach((element) => {
            array.push(element.question)
        })
        let submitData = {
            levelId: querystring.parse(prop.location.search).level,
            questions: GenerateAutoMcqs(+data.nofDigits, +data.nofQuestion, array),
            subject: querystring.parse(prop.location.search).id,
        };
        createQuiz(submitData).then(res => {
            if (res.error) {

                prop.handleClose()
                ErrorToast(res.error.response.data.message + "!");
            } else {
                SuccessfullToast('Question Created!')
                prop.getQuiz()
                prop.handleClose()
            }
        })
    }
    return (
        <div>
            <Modal bsSize="lg" show={prop.show} onHide={prop.handleClose}>
                <Modal.Header className="mdhead" closeButton >
                    <Modal.Title>Generate Questions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card
                        content={
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col md="4">
                                        <FormGroup>
                                            <input type="number" name="nofDigits" placeholder="Enter Number of Digits" ref={register({ required: true, min: 1, max: 3 })} />
                                            {errors.nofDigits && <p style={{ fontSize: '11px', lineHeight: '1.5', color: 'red' }}>Your input required to be more than 1 and less than 3</p>}
                                        </FormGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <input type="number" name="nofQuestion" placeholder="Enter Number of Questions" ref={register({ required: true, min: 1, max: 10 - prop.dbData.length })} />
                                            {errors.nofQuestion && <p style={{ fontSize: '11px', lineHeight: '1.5', color: 'red' }}>Your input required to be more than 1 and less than {10 - prop.dbData.length}</p>}
                                        </FormGroup>
                                    </Col>
                                    <Col md="4"> <Button type="submit" className='btn-fill btn-wd btn btn-warning'>
                                        Generate Question
                                </Button></Col>
                                </Row>

                            </form>
                        }
                    />
                </Modal.Body>

            </Modal>

        </div>
    );
};

export default withRouter(AutoGenerate);