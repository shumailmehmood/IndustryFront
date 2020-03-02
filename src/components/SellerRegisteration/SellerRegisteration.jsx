import React, { useState } from 'react';
import {
    FormGroup, ControlLabel
} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { useForm } from 'react-hook-form';
import "../../assets/css/light-bootstrap-dashboard-pro-react.css"
import { REG_BTN_NAME, REG_SUCCESS } from "../../misc/constants";
import { registerUser } from "../../api/api"
import Select from 'react-select';
import { SuccessfullToast, ErrorToast } from "../../misc/helper"
function SellerRegisteration(props) {
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { dirty },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        data.salary_type = category;
        registerUser(data).then(res => {
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ControlLabel><b>User's Registeration</b></ControlLabel>
                <FormGroup>
                    <input
                        type="text"
                        name={`name`}
                        ref={register({ required: true, validate: value => value !== "" })}
                        className={"form-control"}
                        placeholder="Enter Name"
                    />
                </FormGroup>
                <FormGroup>
                    <input
                        type="text"
                        name={`vehicle_no`}
                        ref={register({ required: true, validate: value => value !== "" })}
                        className={"form-control"}
                        placeholder="Enter Vehicle No"
                    />
                </FormGroup>
                <FormGroup>
                    <input
                        type="text"
                        name={`phoneNo`}
                        ref={register({ required: true, validate: value => value !== "" })}
                        className={"form-control"}
                        placeholder="Enter Phone"
                    />
                </FormGroup>
                <FormGroup>
                    <Select
                        placeholder="Salary Category"
                        onChange={(e) => setCategory(e.value)}
                        // value={value2}
                        options={[{ label: 'Base Salary', value: 'base' }, { label: 'Percentage', value: 'percent' }]}
                    />
                </FormGroup>
                <Button type="submit" className="btn-fill" onClick={() => setLoading(true)} >
                    {loading ? <div><span>loading...</span><i className="fa fa-spin fa-spinner" /></div> : REG_BTN_NAME}
                </Button>

            </form>

        </div>
    );
}

export default SellerRegisteration;
