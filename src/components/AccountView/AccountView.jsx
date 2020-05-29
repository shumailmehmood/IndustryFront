import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Datetime from "react-datetime";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Card from "../Card/Card"
import Button from "components/CustomButton/CustomButton.jsx";
import { get_Account } from "../../api/api"
import Items from "../Modals/SearchBarCode";
import { dateFormat } from "../../misc/helper"
const Sale = (props) => {
    const [items, setItems] = useState(false)
    const [dataDB, setDataDB] = useState([]);
    const [metaData, setMetaData] = useState({})
    const [itemsData, setItemsData] = useState([])
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState('')
    const [time, setTime] = useState({ time: new Date().toISOString() });
    const [courierItems, setCourierItems] = useState(null)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        get();
    }, []);
    useEffect(() => {
        get();
    }, [time]);
    const memo = React.useMemo(() => open, [open])
    const get = (state) => {
        setLoading(true)
        console.log(state);
        let newParams = {
            page: state ? state.page + 1 : 1,
            limit: state ? state.pageSize : 10,
            date: time.time,
            name:  '',            
        }
        if(state)  
        state.filtered.forEach(f => {
            newParams[f.id] = f.value
          }) 
        get_Account(newParams).then(res => {
            if (res.error) { } else {
                setDataDB(res.data.data)
                // setMetaData(res.data.metadata)
                // console.log(res.data.data)
                setLoading(false)
            }
        })
    }
    let data = dataDB ?
        dataDB.map((element, index) => {
            return {
                name: element.uid.name,
                amount: element.amount,
                rDate: dateFormat(element.createdAt),
                action: <Button disabled={!element.courierid} className="btn-fill"><i className="fa fa-eye" aria-hidden="true"></i></Button>,
            }
        })

        : []
    const columns = [
        {
            Header: "Name",
            accessor: "name",
            sortable: false,
            filterable: true,

        },
        {
            Header: "Amount",
            accessor: "amount",
            sortable: false,
            filterable: false,

        },
        {
            Header: "Recieving Date",
            accessor: "rDate",
            sortable: false,
            filterable: false,

        },
        {
            Header: "Action",
            accessor: "action",
            sortable: false,
            filterable: false
        },
    ]
    return (<div>
        <Items data={courierItems} show={items} handleClose={() => setItems(false)} />
        <Row>
            <Col md="1"></Col>
            <Col md="10">
                <Card
                    content={
                        <Datetime
                            inputProps={{ placeholder: "Datetime Picker Here" }}
                            defaultValue={new Date()}
                            onChange={(e) => {
                                setTime({ time: e.toISOString() })
                                setOpen(false)
                            }}
                            onFocus={() => setOpen(true)}
                            open={memo}
                        />
                    } />
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
                        // pages={metaData ? metaData.pages : 1}
                        loading={loading}
                        sortable={false}
                        className="-striped -highlight"
                    />
                } />
        </Row>
    </div>)
}
export default Sale