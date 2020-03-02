import React, { useState } from "react";
import { Col, Row } from 'react-bootstrap';
import Card from '../components/Card/Card';
import Button from "../components/CustomButton/CustomButton.jsx";
import CreateFrom from '../components/CreateQuizForm/CreateQuizForm';
import ViewQuiz from "../components/ViewQuiz/ViewQuiz";
const CreateQuiz = (props) => {
    const [showAdd, setshowAdd] = useState(false);
    const [open, setOpen] = useState(false);
    function handleAddEdit() {
        setshowAdd(true);
    }
    function handleAddClose() {
        setshowAdd(false)
    }
    const close = () => {
        setOpen(true)
    }
    return (
        <div>
            {showAdd ? <CreateFrom handleClose={handleAddClose} show={showAdd} /> : ''}


            <Card
                content={
                    <div>                       
                        <Row>
                            <Col md={2}></Col>
                            <Col md={8}><ViewQuiz open={open} close={close} questionAdded={showAdd} /></Col>
                            <Col md={2}></Col>
                        </Row>
                    </div>
                }
            />

        </div>
    );
};

export default CreateQuiz;