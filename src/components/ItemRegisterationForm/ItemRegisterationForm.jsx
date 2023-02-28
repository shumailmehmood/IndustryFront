import React, { useState } from 'react';
import {
    FormGroup, ControlLabel
} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { useForm } from 'react-hook-form';
import _ from 'lodash'
import "../../assets/css/light-bootstrap-dashboard-pro-react.css"
import { REG_BTN_NAME, REG_SUCCESS } from "../../misc/constants";
import { SuccessfullToast, ErrorToast } from "../../misc/helper"
import { registerItem } from "../../api/api"
function SellerRegisteration() {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { dirty },
    } = useForm();

    const onSubmit = (data) => {
        data.sale_price = +data.sale_price;
        data.purchase_price = +data.purchase_price;
        data.stock_in = +data.stock_in;      
        registerItem(data).then(res => {
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
                        type="number"
                        name={`stock_in`}
                        ref={register({ required: true, validate: value => value !== "" })}
                        className={"form-control"}
                        placeholder="Enter Stock"
                        

                    />
                </FormGroup>
                <FormGroup>
                    <input
                        type="number"
                        name={`sale_price`}
                        ref={register({ required: true, validate: value => value !== "" })}
                        className={"form-control"}
                        placeholder="Enter Sale Price"
                        
                    />
                </FormGroup>
                <FormGroup>
                    <input
                        type="number"
                        name={`purchase_price`}
                        ref={register({ required: true, validate: value => value !== "" })}
                        className={"form-control"}
                        placeholder="Enter Purchase Price"
                    />
                </FormGroup>
                
                <Button type="submit" className="btn-fill" onClick={() => onSubmit()} >
                    {loading ? <div><span>loading...</span><i className="fa fa-spin fa-spinner" /></div> : REG_BTN_NAME}
                </Button>
            </form>

        </div>
    );
}

export default SellerRegisteration;
