import React, { useState, useEffect } from 'react';
import { Row, Col ,ControlLabel} from 'react-bootstrap';
import Datetime from "react-datetime";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Card from "../Card/Card"
import Button from "components/CustomButton/CustomButton.jsx";
import { getAllItems } from "../../api/api"
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
        getAllItems().then(res => {
            if (res.error) { } else {
                console.log(res.data)
                setDataDB(res.data)
                setLoading(false)
            }
        })
    }
    let data = dataDB ?
        dataDB.map((element) => {
            return {
                name: element.name,
                stock: element.stock_in,
            }
        }) : []
    const columns = [
        {
            Header: "Name",
            accessor: "name",
            sortable: false,
            filterable: true,

        },
        {
            Header: "Stock",
            accessor: "stock",
            sortable: false,
            filterable: false,

        }
    ]
    return (<div>
      
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