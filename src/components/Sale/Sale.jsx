import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Datetime from "react-datetime";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Card from "../Card/Card"
import MiniTableButton from "../MiniTableButton/MiniTableButton"
import { getDailySale } from "../../api/api"

import Items from "../Modals/SearchBarCode";
const Sale = (props) => {
    const [update, setUpdate] = useState(false)
    const [items, setItems] = useState(false)
    const [dataDB, setDataDB] = useState([]);
    const [metaData, setMetaData] = useState({})
    const [itemsData, setItemsData] = useState([])
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState('')
    const[time,setTime]=useState({time:new Date().toISOString()});


    useEffect(() => {
        get();
    }, []);
    useEffect(() => {
        get();
    }, [time]);
    const get = (state) => {
        setLoading(true)

        let newParams = {
            page: state ? state.page + 1 : 1,
            limit: state ? state.pageSize : 10,
            date:time.time,
            name: '',
            barcode: '',
            orderNo: ''
        }
        if (state) {
            state.filtered.forEach(element => {
                newParams[element.id] = element.value
            })
        }
        getDailySale(newParams).then(res => {
            if (res.error) { } else {
                setDataDB(res.data.data)
                setMetaData(res.data.metadata[0])
                console.log(res.data.data)
                setLoading(false)
            }
        })
    }

    let data = dataDB.length ?
        dataDB.map((element, index) => {
            return {
                orderNo: "OID-" + element.orderNo,
                subTotal: element.subTotal,
                Discount: element.Discount,
                grandTotal: element.grandTotal,
                amountPayed: element.amountPayed,
                amountReturned: element.amountReturned,
                view: <MiniTableButton text={"View Items"} handleClick={() => {
                    setItemsData(element.items)
                    setItems(true)
                }} />
            }

        })

        : []
    const columns = [
        {
            Header: "Order No",
            accessor: "orderNo",
            sortable: false,
            filterable: true,

        },

        {
            Header: "Sub Total",
            accessor: "subTotal",
            sortable: false,
            filterable: false
        },

        {
            Header: "Discount",
            accessor: "Discount",
            sortable: false,
            filterable: false
        },

        {
            Header: "Grand Total",
            accessor: "grandTotal",
            sortable: false,
            filterable: false
        },

        {
            Header: "Amount Paid",
            accessor: "amountPayed",
            sortable: false,
            filterable: false
        },

        {
            Header: "Amount Returned",
            accessor: "amountReturned",
            sortable: false,
            filterable: false
        },
        {
            Header: "View Items",
            accessor: "view",
            sortable: false,
            filterable: false
        },

    ]
    return (<div>
        <Items data={itemsData} show={items} handleClose={() => setItems(false)} />
        <Row>
            <Col md="1"></Col>
            <Col md="10">
            <Card
                content={
                <Datetime
                    inputProps={{ placeholder: "Datetime Picker Here" }}
                    defaultValue={new Date()}
                    onChange={(e) =>{                        
                    setTime({time:e.toISOString()})
                        
                    }}
                />
                }/>
                </Col>
            <Col md="1"></Col>
        </Row>
        <Row>
            <Card
                content={
                    <ReactTable
                        data={data}
                        columns={columns}
                        manual
                        defaultPageSize={10}
                        onFetchData={get}
                        showPaginationBottom
                        showPaginationTop={false}
                        pages={metaData ? metaData.pages : 1}
                        loading={loading}
                        sortable={false}
                        className="-striped -highlight"
                    />
                } />
        </Row>
    </div>)
}
export default Sale