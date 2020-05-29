import React, { useState } from 'react';
import {
    FormGroup, ControlLabel, Row, Col
} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { useForm } from 'react-hook-form';
import _ from 'lodash'
import "../../assets/css/light-bootstrap-dashboard-pro-react.css"
import { REG_BTN_NAME, REG_SUCCESS } from "../../misc/constants";
import { SuccessfullToast, ErrorToast } from "../../misc/helper"
import { postPayment, getAllUsers, get_RemainingTotal } from "../../api/api"
import Select from 'react-select'
import { useEffect } from 'react';
function SellerRegisteration(props) {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [remaining, setRemaining] = useState(null)

    
    const {
        register,
        handleSubmit,
    } = useForm();
    useEffect(() => {
        getAllUsers().then(res => {
            if (res.error) { } else {
                setUser(_.chain(res.data).map(({ name, _id }) => name = {
                    value: {
                        uid: {
                            item: _id,
                            name: name,
                        }
                    }, label: name
                }).value())
            }

        })
    }, [])
    const getRemainingTotal = () => {     
        get_RemainingTotal({ id: selectedUser ? selectedUser.uid.item : '' }).then(res => {
            if (res.error) {
                setLoading(false)
                ErrorToast(res.error.response.data);
            } else {
                setLoading(false)
                
                setRemaining(res.data.remainingAmount);
            }
        })       
    }
    React.useMemo(() => getRemainingTotal(), [selectedUser])    
    const onSubmit = (data) => {
    
        data.amount = +data.amount
        data.uid = selectedUser.uid;
        postPayment(data).then(res => {
            if (res.error) {
                setLoading(false)
                ErrorToast(res.error.response.data);
            } else {
                SuccessfullToast(REG_SUCCESS)
                setLoading(false)
            }
        })
    };
    return (
        <>
            <Row>
                <Col md={2}></Col>
                <Col md={8}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ControlLabel><b>Payment</b></ControlLabel>
                        <FormGroup>
                            <Select
                                placeholder="Select User"
                                onChange={(e) => {
                                    setSelectedUser(e.value)
                                }}
                                //  value={}
                                options={user}
                            />
                        </FormGroup>
                        <FormGroup>
                            <input
                                type="number"
                                disabled={true}
                                className={"form-control"}
                                placeholder="Total Remaining Amount"
                                value={remaining}
                            />
                        </FormGroup>
                        <FormGroup>
                            <input
                                type="number"
                                name={`amount`}
                                ref={register({ required: true, validate: value => value !== "" })}
                                className={"form-control"}
                                placeholder="Enter Amount"
                            />
                        </FormGroup>
                        <Button type="submit" className="btn-fill" onClick={() => setLoading(true)} >
                            {loading ? <div><span>loading...</span><i className="fa fa-spin fa-spinner" /></div> : REG_BTN_NAME}
                        </Button>
                    </form>
                </Col>
                <Col md={2}></Col>
            </Row>

        </>
    );
}

export default SellerRegisteration;
