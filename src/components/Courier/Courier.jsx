import React, { useState, useEffect } from 'react';
import {
    FormGroup,
    ControlLabel, Row, Col
} from "react-bootstrap";
import Select from 'react-select'
import Button from "components/CustomButton/CustomButton.jsx";
import { useForm } from 'react-hook-form';
import ReactTable from "react-table";
import Card from "../Card/Card"
import "react-table/react-table.css";
import "../../assets/css/light-bootstrap-dashboard-pro-react.css"
import { REG_BTN_NAME, REG_SUCCESS } from "../../misc/constants";
import { sendCourier, get_today_courier, courier_checkout } from "../../api/api"
import { SuccessfullToast, ErrorToast } from "../../misc/helper"
import Datetime from "react-datetime";
import Mini from "../MiniTableButton/MiniTableButton"
import ReturnQuantity from "../Modals/ReturnQuantity";
function CategoryRegisteration({ user, items, checkout }) {
    const [loading, setLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [count, setCount] = useState(0)
    const [sendItems, setSendItems] = useState([])
    const [retrn, setRetrn] = useState(checkout)
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [index, setIndex] = useState(null)
    const [id, setId] = useState(null)
    const [saleAmount, setSaleAmount] = useState(0)
    const {
        register,
        handleSubmit,
        formState: { dirty },
    } = useForm();
    useEffect(() => {
    }, [sendItems])

    const get = (state) => {
        setLoading(true)
        if (selectedUser) {
            let newParams = {
                from: state,
                uid: selectedUser.uid ? selectedUser.uid.item : selectedUser.uid
            }
            get_today_courier(newParams).then(res => {
                if (res.error) { } else {
                    setId(res.data ? res.data._id : null)
                    setSelectedUser(res.data ? res.data.uid : null);
                    setSendItems(res.data ? res.data.sendItems : null)
                    res.data ? !res.data.returnItems ? setRetrn(false) : setRetrn(true) : setRetrn(true)
                    setLoading(false)
                    calculateSale(res.data.sendItems)
                }
            })
        } else {
            ErrorToast("Select User");
        }
    }

    const sendCourierData = () => {
        setLoading(true);
        let data = {
            ...selectedUser,
            sendItems: sendItems
        }
        if (!checkout) {
            sendCourier(data).then(res => {
                if (res.error) {
                    setLoading(false)
                    ErrorToast(res.error.response.data);
                } else {
                    SuccessfullToast(REG_SUCCESS)
                    setLoading(false)
                }
            })
        } else {
            courier_checkout(id, data).then(res => {
                if (res.error) {
                    setLoading(false)
                    ErrorToast(res.error.response.data);
                } else {
                    SuccessfullToast(REG_SUCCESS)
                    setLoading(false)
                }
            })
        }

    }
    const calculateSale = (value) => {
        let sale = saleAmount;
        if (value) {
            value.map((element, i) => {
                sale += +element.sale_price * +element.count
            })

            setSaleAmount(sale)
        }

    }
    const handleReturn = (value) => {
        let items = sendItems;
        items[index]['return_count'] = +value;
        items[index]['count'] = +items[index].count - +value;
        calculateSale(items)
        setSendItems(items)
    };
    let num = 0;

    let data = sendItems ?
        sendItems.map((element, i) => {

            num = +element.return_count ? +element.return_count : 0
            return {
                name: element.item_name,
                qty: <Mini text={element.count} handleClick={() => {
                    setOpenModal(true)
                    setIndex(i)
                }} />,
                amount: `${element.sale_price} * ${element.count} = ${+element.sale_price * +element.count}`,
                rQty: element.return_count ? element.return_count : 0,
                rAmount: `${element.sale_price} * ${num} = ${+element.sale_price * num}`
            }
        })
        : []

    const columns = [
        {
            Header: "Name",
            accessor: "name",
            sortable: false
        },
        {
            Header: "Quantity",
            accessor: "qty",
            sortable: false

        }
        ,
        {
            Header: "Amount",
            accessor: "amount",
            sortable: false,
            show: checkout

        }
        ,
        {
            Header: "Return Qty",
            accessor: "rQty",
            sortable: false,
            show: checkout
        },
        {
            Header: "Return Amount",
            accessor: "rAmount",
            sortable: false,
            show: checkout

        }

    ]
    const onSubmit = (data) => { }
    // console.log(sale);
    return (
        <div>
            <ReturnQuantity handleReturn={handleReturn} show={openModal} handleClose={() => setOpenModal(false)} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md="6">
                        <ControlLabel><b>Select User</b></ControlLabel>
                        {/* {console.log(selectedItem)} */}
                        <FormGroup>
                            <Select
                                placeholder="Select User"
                                onChange={(e) => setSelectedUser(e.value)}
                                //  value={}
                                options={user}
                            />
                        </FormGroup>

                    </Col>
                    {checkout ? <Col md="6">
                        <Card
                            content={<div>
                                <Datetime
                                    inputProps={{ placeholder: "Datetime Picker Here" }}
                                    defaultValue={new Date()}
                                    onFocus={() => setOpen(true)}
                                    onChange={(e) => {
                                        setOpen(false)
                                        get(e.toISOString())
                                    }}
                                    open={open}
                                />
                            </div>
                            } />
                    </Col> : null}
                </Row>
                {!checkout ?
                    <Row>
                        <Col md="4">
                            <FormGroup>
                                <Select
                                    placeholder="Select Item"
                                    onChange={(e) => setSelectedItem(e.value)}
                                    // value={value2}
                                    isDisabled={retrn}
                                    options={items}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <input
                                    type="text"
                                    name={`count`}
                                    disabled={retrn}
                                    // ref={register({ required: true, validate: value => value !== "" })}
                                    onChange={(e) => setCount(e.target.value)}
                                    className={"form-control"}
                                    placeholder="Enter Quantity"
                                />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <Button disabled={retrn} type="submit" className="btn-fill" onClick={() => {
                                let item = selectedItem;
                                item['count'] = count;
                                console.log(item)
                                let send = sendItems;
                                send.push(item);
                                setSendItems(send);
                            }} >
                                Add Item
                </Button>
                        </Col>
                    </Row>

                    : null}
                <Row>
                    <Col md="1"></Col>
                    <Col md="10">
                        <Card
                            content={
                                <ReactTable
                                    data={data}
                                    columns={columns}
                                    loading={false}
                                    className="-striped -highlight"
                                    showPagination={false}
                                    defaultPageSize={10}
                                    style={{
                                        height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                                    }}
                                />
                            } />
                    </Col>
                    <Col md="1"></Col>
                </Row>
                {checkout ?
                    <Row>
                        <Col md="1"></Col>
                        <Col md="3">
                            <ControlLabel>Sale Amout</ControlLabel>
                            <FormGroup>
                                <input
                                    type="text"
                                    name={`saleAmount`}
                                    disabled={true}
                                    value={saleAmount}
                                    className={"form-control"}
                                    placeholder="Sale Amount"
                                />
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <ControlLabel>Percentage</ControlLabel>
                            <FormGroup>
                                <input
                                    type="text"
                                    name={`count`}
                                    disabled={true}
                                    // ref={register({ required: true, validate: value => value !== "" })}
                                    onChange={(e) => setCount(e.target.value)}
                                    className={"form-control"}
                                    placeholder="Enter Percentage"
                                />
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <ControlLabel>Grand Total</ControlLabel>
                            <FormGroup>
                                <input
                                    type="text"
                                    name={`count`}
                                    disabled={true}
                                    // ref={register({ required: true, validate: value => value !== "" })}
                                    onChange={(e) => setCount(e.target.value)}
                                    className={"form-control"}
                                    placeholder="Enter Quantity"
                                />
                            </FormGroup>
                        </Col>
                        <Col md="1"></Col>
                    </Row>
                    : null}
                <center>
                    <Button disabled={retrn} type="button" className="btn-fill" onClick={() => sendCourierData()} >
                        {loading ? <div><span>Loading...</span><i className="fa fa-spin fa-spinner" /></div> : REG_BTN_NAME}
                    </Button>
                </center>
            </form>

        </div>
    );
}

export default CategoryRegisteration;
