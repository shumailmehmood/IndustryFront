/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  Grid,
  Col,
  FormGroup,
  ControlLabel,  
  Row,
  Form
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import { Redirect } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from 'context/auth';

import { login } from '../api/api';
import {useForm} from "react-hook-form";


function Login(props) {

  // const { setAuthTokens, authTokens } = useAuth();
  const [serverError, setServerError] = useState();

  const { handleSubmit, register, errors } = useForm();
  const onSubmit = async (values) => {
    // setServerError(null);
    // let response = await login(values.email, values.password);
    // console.log(response);
    // if (response.error) {
    //   setServerError(response.error.message);
    // } else {
    //   setAuthTokens({ access_token: response.data.user.token });
    // }

  }
//authTokens && authTokens.access_token
  return (
    true ? <Redirect to="/" /> :
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={6} mdOffset={3}>
              <Col md={4} sm={6} mdOffset={4}>
                <Card
                  title="Login"
                  ctAllIcons
                  content={
                    <Form onSubmit={handleSubmit(onSubmit)}>


                     
                      <small className="text-danger">{serverError || null}</small>
                      <FormGroup
                        validationState={errors.email && errors.email.message ? "error" : "success"}
                      >
                        <ControlLabel>Email address</ControlLabel>
                        <input
                          name="email"
                          ref={register({
                            required: 'Required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: "invalid email address"
                            }
                          })}
                          placeholder="Enter your email"
                          className="form-control"
                        />

                        {(errors.email && errors.email.message) && <small className="text-danger">{errors.email && errors.email.message}</small>}


                      </FormGroup>
                      <FormGroup
                        validationState={errors.password && errors.password.message ? "error" : "success"}
                      >
                        <ControlLabel>Password</ControlLabel>
                        <input
                          name="password"
                          ref={register({
                            required: 'Required',

                          })}
                          placeholder="Enter your password"
                          className="form-control"
                        />

                        {(errors.password && errors.password.message) && <small className="text-danger">{errors.password && errors.password.message}</small>}


                      </FormGroup>

                      <Button type="submit">Login</Button>
                    </Form>


                  } />

              </Col>

            </Col>
          </Row>
        </Grid>
      </div >
  );

}

export default Login;
