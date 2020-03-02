import React, { useState } from "react";
import {useForm,Controller} from "react-hook-form";
import { Modal } from 'react-bootstrap';
import Button from "components/CustomButton/CustomButton.jsx";
import { Grid, Col,  ControlLabel, Row, Form } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { editSubject } from '../../api/api';
import Select from "react-select";
let data
function useOnMount(handler) {
    React.useEffect(handler, []);
}

function createArrayWithNumbers(length) {
    return Array.from({ length }, (_, k) => k); // Issue: k + 1 causes null values.
}

function pivotData(data, size = data[Object.keys(data)[0]].length) {
    const keys = Object.keys(data);
    const keysLength = keys.length;
    // console.log("keys: ", keys);
    const rows = [];
    for (let i = 0; i < size; i++) {
        const row = {};
        for (let j = 0; j < keysLength; j++) {
            const key = keys[j];
            const value = data[key][i];
            row[key] = value;
        }
        rows.push(row);
    } 
    return rows;
}

function unpivotData(data, keys = []) {
    const output = keys.reduce((r, key) => {
        r[key] = [];
        return r;
    }, {});
    data.forEach((row, i) => {
        keys.forEach(key => {
            output[key][i] = row[key] !== undefined ? row[key] : null;
        });
    });
    return output;
}

const dataKeys = ['_id', "level"];

const SubjectEditModal = (props) => {
    const defaultValues = {
        subjectName: props.doc.original.name
    }
    const [size, setSize] = useState(props.doc.original.length);
    const [spinner, setSpinner] = useState(false);
    const [alert, setAlert] = useState(null);
    const { handleSubmit, reset, register, errors, control } = useForm({ defaultValues });


    async function loadFromProps() {

        setSize(props.doc.original.subjectLevels.length);
        data = await unpivotData(props.doc.original.subjectLevels, dataKeys);
        if (data) {
            data.subjectName = props.doc.original.name
            reset(data);
        }
        else { console.log("LOADING: ", data); }
    }
    const removeLevel = (index) => {       
        let lol = data.level.filter((item, e) => e !== index);
        data.level = lol
        setSize(size - 1)
        reset(data);
        setAlert(null)
    };
    const addLevel = (a) => {       
       data.level.indexOf(a) === -1 ? data.level.push(a) : console.log("This level already exists");
        setSize(size + 1)        
        reset(data);
    };
    // Instead of using defaultValues, I'd actually like to load data here...
    useOnMount(() => {
        loadFromProps();
    });
    const warningWithConfirmMessage = (val) => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Are you sure?"
                onConfirm={() => removeLevel(val)}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="info"
                cancelBtnBsStyle="danger"
                confirmBtnText="Yes, delete it!"
                cancelBtnText="Cancel"
                showCancel
            >
                You will not be able to recover this!
            </SweetAlert>
        );
    }
    const hideAlert = () => {
        setAlert(null)
    }
    const onSubmit = async (values) => {
        //setSpinner(true)  
        const rows = pivotData(values);
        let s = '';
        let ss = []

         s = values.subjectName 
        rows.map(e => e.level !== undefined ? ss.push({ "level": e.level, "difficulty": e.difficulty.value }) : null)

        let response = await editSubject(props.doc.value, { name: s, subjectLevels: ss });
        if (response.error) {
            setSpinner(false)
            props.handleClose()
        } else {
            setSpinner(false)
            props.handleClose()
        }
    }
    const options = [
        { value: "Easy", label: "Easy" },
        { value: "Medium", label: "Medium" },
        { value: "Hard", label: "Hard" }
      ];
      const colourStyles = {
        container: () => ({
          width: 200,
          flex: 1
        }),
        menu: styles => ({ ...styles, width: 200, flex: 1 })
      };
    return (
        <div className="content">
                  {alert}
                
            <Grid fluid>
                <Row>
                    <Col>
                        <Col md={6} >
                            <Modal show={props.show} onHide={props.handleClose} bsSize='lg'>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Modal.Header closeButton className="mdhead" style={{ backgroundColor: '#0F4B5F', color: '#E1FADF' }}>
                                        <Modal.Title><center>Edit Subject</center></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <Row>
                                       <Col md={3}>
                                       <label htmlFor="subjectName" style={{ color: '#87cb16'  ,marginTop: "5"}}>Subject    </label>
                                            <ControlLabel>{props.doc.name}</ControlLabel>
                                            <input
                                                name="subjectName"
                                                ref={register}
                                                required
                                                placeholder="Enter your Subject Name"
                                                className="form-control"
                                            />
                                        </Col>                                       
                                            </Row>
                                        {createArrayWithNumbers(size).map(number => {
                                            return (
                                                <div key={number}>
                                                    
                                                    <Button style={{ marginTop: '25px', float: 'right' }} disabled={size==1 } bsStyle="info" type="button" fill wd onClick={() => warningWithConfirmMessage(number)}>
                                                        Remove Level
                                                    </Button>
                                                    {size-1 ===number ? <Button   style={{ marginTop: '25px', marginRight:'5px', float: 'right' }} bsStyle="danger" type="button" fill wd onClick={() => addLevel(document.getElementById(`level[${number}]`).value)}>
                                                        Add level
                                                    </Button> : null}
                                                    <Row>
                                                    <Col md={3}>
                                                    <ControlLabel
                                                        style={{ color: "#87cb16", marginBottom: "0" }}
                                                    >Level </ControlLabel>
                                                    <input
                                                        style={{ width: '150px'}}
                                                        name={`level[${number}]`}
                                                        id={`level[${number}]`}
                                                        placeholder="level"
                                                        ref={register}
                                                        className="form-control"
                                                    />
                                                    </Col>
                                            <Col md={3}>
                                                <ControlLabel
                                                        style={{ color: "#87cb16", marginBottom: "0" }}
                                                    >
                                                        Difficulty Level
                                                    </ControlLabel>
                                                    <Controller
                                                        as={
                                                        <Select
                                                            options={options}
                                                            styles={colourStyles}
                                                        />
                                                        }
                                                        control={control}
                                                        rules={{ required: true }}
                                                        onChange={([selected]) => {
                                                        // React Select return object instead of value for selection
                                                        return { value: selected };
                                                        }}
                                                        name={`difficulty[${number}]`}
                                                        id={`difficulty[${number}]`}                                                
                                                        defaultValue={{
                                                        value: props.doc.original.subjectLevels[number] ?props.doc.original.subjectLevels[number].difficulty:'Easy',
                                                        label: props.doc.original.subjectLevels[number] ?props.doc.original.subjectLevels[number].difficulty:'Easy',
                                                        }}
                                                    />
                                                    </Col>
                                                    </Row>
                                                </div>
                                            );
                                        })}
                                        <div style={{ color: "red" }}>
                                            {Object.keys(errors).length > 0 &&
                                                "There are errors, check your console."}
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button style={{ backgroundColor: '#0f4b5f' }} disabled={spinner} type="submit" fill wd>
                                            {spinner ? 'SUBMITTING....' : 'Proceed'}
                                            <i className={spinner ? 'fa fa-spin fa-spinner' : null} />
                                        </Button>
                                        {/* <input type="button" onClick={handleReset} value="Reset" /> */}
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

export default SubjectEditModal;


