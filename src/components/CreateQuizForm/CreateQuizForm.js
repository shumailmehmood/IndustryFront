import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import {
    Col,
    Row,
    FormGroup,
    ControlLabel,
    Image
} from "react-bootstrap";
import querystring from "query-string";
import _ from 'lodash'
import Button from "components/CustomButton/CustomButton.jsx";
import Card from '../Card/Card';
import {useForm} from 'react-hook-form';
import "../../assets/css/light-bootstrap-dashboard-pro-react.css"
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { createQuiz, uploadImage } from "../../api/api";
import { SuccessfullToast, ErrorToast } from "../../misc/helper";

function CreateQuizForm(prop) {
    const [indexes] = useState([0]);
    const [options] = useState([0, 1, 2, 3]);
    const [imageURL, setImageURL] = useState('');
    const [multiples, setMultiples] = useState(true);
    const [text, setText] = useState(false);
    const [upload, setUpload] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { dirty },
    } = useForm();


    const onSubmit = (data) => {
       
        data.questions.forEach((rowOuter) => {
            rowOuter.answer = rowOuter.options ? _.get(data, rowOuter.answer) : rowOuter.answer1
            rowOuter.imageUrl = imageURL ? imageURL : '';
            return data
        })

        let submitData = {
            levelId: querystring.parse(prop.location.search).level,
            questions: data.questions,
            subject: querystring.parse(prop.location.search).id,
        };       

        createQuiz(submitData).then(res => {
            if (res.error) {
                prop.handleClose()
                ErrorToast(res.error.response.data.message + "!");
            } else {
                SuccessfullToast('Question Created!')
                prop.handleClose()
            }
        })


    };
    const changeState = (obj) => {
        setText(obj.text);
        setMultiples(obj.multi);
    }
    const imageSelected = (image) => {
        if (image.target.files[0]) {
            let name = image.target.files[0].name
            let nameSplit = name.split('.')
            if ((nameSplit[nameSplit.length - 1] === ('jpg' || 'JPG')) || (nameSplit[nameSplit.length - 1] === 'jpeg' || 'JPEG') || (nameSplit[nameSplit.length - 1] === ('png' || 'PNG'))) {
                let file = image.target.files[0];
                setUpload(true)
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
                let fileData = new FormData();
                fileData.append('file', file);
                uploadImage(fileData, config)
                    .then(res => {
                        setImageURL(res.data.url)
                        setUpload(false)
                    })
                    .catch(err => console.log(err));
            } else {
                ErrorToast("Format Not Supported")
            }

        }
    }
    return (
        <div>
            <Modal show={prop.show} onHide={prop.handleClose} bsSize={"lg"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        {indexes.map((index, k) => {
                            const fieldName = `questions[${index}]`;
                            return (
                                <div key={k}>
                                    <br />
                                    <Card
                                        content={
                                            <fieldset name={fieldName} key={fieldName}>
                                                <Row>
                                                    <Row>
                                                        <Col md={10}>
                                                            <ControlLabel><b>ADD QUESTION </b></ControlLabel>
                                                        </Col>

                                                    </Row>
                                                    <Row>

                                                        <Col md={5}>
                                                            <FormGroup>
                                                                <input
                                                                    type="text"
                                                                    name={`${fieldName}.question`}
                                                                    ref={register({ required: true, validate: value => value !== "" })}
                                                                    className={"form-control"}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={7}>
                                                            <Row>
                                                                <Col md={3}>
                                                                    <input
                                                                        type="radio"
                                                                        name="radio"
                                                                        checked={multiples ? true : false}
                                                                        label="Multiple Choice"
                                                                        onChange={() => changeState({ text: false, multi: true })}
                                                                    />
                                                                    Multiple Choice
                                                                </Col>
                                                                <Col md={3}>
                                                                    <input
                                                                        type="radio"
                                                                        name="radio"
                                                                        checked={text ? true : false}
                                                                        label="Text"
                                                                        onChange={() => changeState({ text: true, multi: false })}
                                                                    />
                                                                    Text
                                                                </Col>
                                                                <Col md={6}>
                                                                    <FormGroup >
                                                                        <Image style={{ height: '50px', width: '50px', borderRadius: '50px' }} src={imageURL} />
                                                                        <input
                                                                            type="file"
                                                                            name="image"
                                                                            onChange={(image) => {
                                                                                imageSelected(image)
                                                                            }}

                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    {text ?
                                                        <Row>
                                                            <Col md={1}></Col>
                                                            <Col md={10}>

                                                                <FormGroup>
                                                                    <input
                                                                        type="text"
                                                                        name={`${fieldName}.answer1`}
                                                                        ref={register}
                                                                        className={"form-control"}
                                                                        placeholder="Enter the Answer"

                                                                    />
                                                                </FormGroup>

                                                            </Col>
                                                            <Col md={1}></Col>
                                                        </Row>

                                                        :

                                                        <Row>
                                                            {
                                                                options.map((row, i) => {
                                                                    const option = `${fieldName}.options[${row}]`
                                                                    return (
                                                                        <Row key={i}>
                                                                            <Col md={1}></Col>
                                                                            <Col md={6}>
                                                                                < FormGroup
                                                                                >
                                                                                    <Row>

                                                                                        <Col md={2}>

                                                                                            <input
                                                                                                type="radio"
                                                                                                name={`${fieldName}.answer`}
                                                                                                ref={register({ required: true })}
                                                                                                value={`${option}`}
                                                                                            />

                                                                                        </Col>
                                                                                        <Col md={8}>

                                                                                            <input
                                                                                                type="text"
                                                                                                name={`${option}`}
                                                                                                ref={register({ required: true })}
                                                                                                className={"form-control"}
                                                                                                placeholder="Enter the option"

                                                                                            />
                                                                                        </Col>
                                                                                    </Row>
                                                                                </FormGroup>
                                                                            </Col>

                                                                        </Row>

                                                                    )
                                                                })
                                                            }
                                                        </Row>
                                                    }

                                                </Row>
                                            </fieldset>
                                        } />
                                </div>
                            );
                        })}

                        <Button type="submit" disabled={upload ? true : !dirty}>
                            {" "}
                            {dirty ? "ADD" : "ADD"}
                        </Button>
                    </Modal.Body>
                </form>
            </Modal>
        </div>
    );
}

export default connect()(withRouter(CreateQuizForm));
