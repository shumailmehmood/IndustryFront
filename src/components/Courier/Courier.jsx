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
import { sendCourier, get_today_courier } from "../../api/api"
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
                    setSelectedUser(res.data ? res.data.uid : null);
                    setSendItems(res.data ? res.data.sendItems : null)
                    res.data ? res.data.returnItems ? setRetrn(false) : setRetrn(true) : setRetrn(true)
                    setLoading(false)
                }
            })
        } else {
            ErrorToast("Select User");
        }
    }

    const sendCourierData = () => {
        setLoading(true);
        if (!checkout) {
            let data = {
                uid: selectedUser.uid,
                sendItems: sendItems
            }
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
            let data = {
                returnItem: sendItems
            }


        }

    }
    const handleReturn = (value) => {
        let items = sendItems;
        console.log(items)
        items[index]['return_count'] = +items[index].count - +value;
        setSelectedItem(items)
    };

    let data = sendItems ?
        sendItems.map((element, i) => {
            return {
                name: element.item_name,
                qty: <Mini text={element.count} handleClick={() => {
                    setOpenModal(true)
                    setIndex(i)
                }} />,
                rQty: element.return_count ? element.return_count : null
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
            Header: "Return Qty",
            accessor: "rQty",
            sortable: false,
            show: checkout
        }
    ]
    return (
        <div>
            <ReturnQuantity handleReturn={handleReturn} show={openModal} handleClose={() => setOpenModal(false)} />
            <form>
                <Row>
                    <Col md="6">
                        <ControlLabel><b>Item's Category</b></ControlLabel>
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
                            let send = sendItems;
                            send.push(item);
                            setSendItems(send);
                        }} >
                            Add Item
                </Button>
                    </Col>
                </Row>
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
