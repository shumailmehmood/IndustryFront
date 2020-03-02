import React, { useState } from "react";
import { useForm ,Controller} from "react-hook-form";
import Button from "../CustomButton/CustomButton.jsx";
import Select from "react-select";
import { Grid, Col, FormGroup, ControlLabel, Row, Form ,Modal} from "react-bootstrap";
import { createSubject } from "../../api/api";

const Subject = props => {
  const [spinner, setSpinner] = useState(false);
  const { handleSubmit, register, errors, control } = useForm();
  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);

  const onSubmit = async values => {
    setSpinner(true);
    let data= {};
    data.name = values.name
    data.SubjectLevels = []    
    values.SubjectLevels.map(e =>data.SubjectLevels.push({level:e.level,difficulty:e.difficulty?e.difficulty.value:e.value})) 
    
    let response = await createSubject(data);
    if (response.error) {
      setSpinner(false);
      props.handleClose();
    } else {
      setSpinner(false);
      props.handleClose();
    }
  };
  const addFriend = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };

  const removeFriend = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
    setCounter(prevCounter => prevCounter - 1);
  };
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
      <Grid fluid>
        <Row>
          <Col md={6}>
            <Col>
              <Modal show={props.show} onHide={props.handleClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Modal.Header
                    closeButton
                    className="mdhead"
                    style={{ backgroundColor: "#0F4B5F", color: "#E1FADF" }}
                  >
                    <Modal.Title>
                      <center>Add Subject</center>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <FormGroup
                      validationState={
                        errors.name && errors.name.message ? "error" : "success"
                      }
                    >
                      <ControlLabel>Subject</ControlLabel>
                      <input
                      style={{width: 200 }}
                        name="name"
                        ref={register({
                          required: "Required"
                        })}
                        placeholder="Enter your Subject Name"
                        className="form-control"
                      />

                      {errors.name && errors.name.message && (
                        <small className="text-danger">
                          {errors.name && errors.name.message}
                        </small>
                      )}
                    </FormGroup>
                    {indexes.map(index => {
                      const fieldName = `SubjectLevels[${index}]`;
                      return (
                        <fieldset name={fieldName} key={fieldName}>
                          <Row>
                            <Col md={3}>
                              <ControlLabel style={{ color: "#87cb16" }}>
                                Level
                                <input
                                  type="text"
                                  name={`${fieldName}.level`}
                                  ref={register}
                                  className="form-control"
                                />
                              </ControlLabel>
                            </Col>
                            <Col md={5}>
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
                                name={`${fieldName}.difficulty`}
                                defaultValue={{
                                  value: "Easy",
                                  label: "Easy"
                                }}
                              />
                            </Col>

                            <Col md={3}>
                              <ControlLabel
                                style={{ color: "#87cb16", marginBottom: "0" }}
                              ></ControlLabel>
                              {indexes.length === index + 1 ? (
                                <Button
                                  bsStyle="danger"
                                  type="button"
                                  onClick={removeFriend(index)}
                                  fill
                                  wd
                                >
                                  Remove
                                </Button>
                              ) : null}
                            </Col>
                          </Row>
                        </fieldset>
                      );
                    })}
                    <Button
                      type="button"
                      bsStyle="info"
                      onClick={addFriend}
                      fill
                      wd
                    >
                      Add Level
                    </Button>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      style={{ backgroundColor: "#0f4b5f" }}
                      disabled={spinner}
                      type="submit"
                      fill
                      wd
                    >
                      {spinner ? "SUBMITTING...." : "Add"}
                      <i className={spinner ? "fa fa-spin fa-spinner" : null} />
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </Col>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Subject;
