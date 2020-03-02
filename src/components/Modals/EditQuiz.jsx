import React, { useState } from 'react';
import { Col, Row, Button, Modal, FormGroup, ControlLabel, Image } from "react-bootstrap";
import Card from '../Card/Card';
import _ from 'lodash'
import {useForm} from 'react-hook-form';
import { uploadImage } from "../../api/api"
import { ErrorToast } from "../../misc/helper";
const EditQuiz = (prop) => {
    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            'questions[0].question': prop.data.question,
            'questions[0].answer': prop.data.answer,
            'questions[0].options[0]': prop.data.options[0] ? prop.data.options[0] : ' ',
            'questions[0].options[1]': prop.data.options[1] ? prop.data.options[1] : ' ',
            'questions[0].options[2]': prop.data.options[2] ? prop.data.options[2] : ' ',
            'questions[0].options[3]': prop.data.options[3] ? prop.data.options[3] : ' ',
        }
    });
    const [indexes] = useState([0]);
    const [options] = useState([0, 1, 2, 3]);
    const [imageURL, setImageURL] = useState(prop.data.imageUrl ? prop.data.imageUrl : '');
    const [upload, setUpload] = useState(false);

    const onSubmit = (data) => {
        data.questions.forEach((rowOuter) => {
            rowOuter.answer = rowOuter.answer ? rowOuter.options ? _.get(data, rowOuter.answer) : rowOuter.answer : prop.data.answer
            rowOuter.imageUrl = imageURL ? imageURL : '';
            return data
        })

        let dataSub = data.questions[0];
        prop.update(dataSub, prop.data._id)
    };
    const imageSelected = (image) => {
        if (image.target.files[0]) {
            let name = image.target.files[0].name
            let nameSplit = name.split('.')
            if (nameSplit[nameSplit.length - 1] === 'jpg' || nameSplit[nameSplit.length - 1] === 'jpeg' || nameSplit[nameSplit.length - 1] === 'png') {
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
        <Modal show={prop.show} onHide={prop.handleClose} bsSize="lg">
            <Modal.Header className="mdhead" closeButton >
                <Modal.Title>Edit Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                                        <ControlLabel><b>Question {index + 1}:</b></ControlLabel>
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
                                                            {/* <Col md={3}>

                                                                Multiple Choice
                                                                </Col>
                                                            <Col md={3}>

                                                                Text
                                                                </Col> */}
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
                                                {prop.data.options.length ?
                                                    <Row>
                                                        <Col md={8}>
                                                            {
                                                                options.map((row, i) => {
                                                                    const option = `${fieldName}.options[${row}]`
                                                                    return (
                                                                        <Row key={i}>
                                                                            <Col md={1}></Col>
                                                                            <Col md={6}>
                                                                                < FormGroup >
                                                                                    <Row>
                                                                                        {console.log(prop.data.answer, prop.data.options[i])}
                                                                                        <Col md={2}>
                                                                                            <input
                                                                                                type="radio"
                                                                                                name={`${fieldName}.answer`}
                                                                                                ref={register}
                                                                                                value={`${option}`}
                                                                                                //  defaultChecked={prop.data.answer == prop.data.options[row] ? true : null}
                                                                                                // defaultChecked={prop.data.answer === prop.data.options[i] ? true : true}
                                                                                                // defaultValue={true}
                                                                                                checked={true}
                                                                                            />
                                                                                        </Col>
                                                                                        <Col md={8}>
                                                                                            <input
                                                                                                type="text"
                                                                                                name={`${option}`}
                                                                                                ref={register}
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
                                                        </Col>
                                                        <Col md={4}>
                                                            {imageURL &&
                                                                <Image style={{ height: '100px', width: '100px' }} src={imageURL} />}

                                                        </Col>
                                                    </Row>
                                                    :
                                                    <Row>
                                                        <Col md={1}></Col>
                                                        <Col md={10}>
                                                            <FormGroup>
                                                                <input
                                                                    type="text"
                                                                    name={`${fieldName}.answer`}
                                                                    ref={register({ required: true, validate: value => value !== "" })}
                                                                    className={"form-control"}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={1}></Col>
                                                    </Row>
                                                }

                                            </Row>
                                        </fieldset>
                                    } />
                                <p></p>
                            </div>
                        );
                    })}

                    <Button type="submit" disabled={upload ? true : false}>
                        {" "}
                        {upload ? <div><span>loading...</span><i className="fa fa-spin fa-spinner" /></div> : "Edit"}
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditQuiz;