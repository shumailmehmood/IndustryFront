import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { getSubjects, getSpecificSubject } from '../../api/api';
import Card from "components/Card/Card.jsx";
import { Grid, Row, Col } from "react-bootstrap";
import Select from 'react-select';
import _ from 'lodash';

const UserStats = () => {
    const [data, setData] = useState([]);
    const [options, setOptions] = useState();
    const [loading, setLoading] = useState(false);

    const [value, setValue] = useState()
    const [value2, setValue2] = useState({value:'All', label: 'All'})
    
    async function anyNameFunction() {
        setLoading(true)
        let response = await getSubjects();
        if (!response.data) {
            setData([])
            setOptions([])
            setLoading(false)
        } else {
            setData(response.data)
            let done=   _.chain(response.data).map(({ name,_id }) => name = { value: _id, label: name }).push({value:'All', label: 'All'}).reverse()         
            setOptions(done.value())
            setLoading(false)
        }
    }
    async function anyNameFunction2(value) {
        setLoading(true)
        let response = await getSpecificSubject(value);
        if (!response.data) {
            setData([])
            setLoading(false)
        } else {
            setData(response.data)            
            setLoading(false)
        }
    }

    useEffect(() => {
        if (value) anyNameFunction2(value);
        else anyNameFunction();
    }, [value]);

    function onChangerole(value) {        
        setValue(value.value)
        setValue2(value)
    }

    const columns = [
        // {
        //     Header: "Country",
        //     accessor: 'name',
        //     sortable: false,
        //     Cell: props => <div className="flag">
        //     {/* <img src={table_data[props.row._index].flag} alt="us_flag" /> */}
        //    {console.log(table_data[props.row._index].flag)} 
        //   </div>

        // },
        {
            Header: "User",
            accessor: "name",
            sortable: false
        },
        {
            Header: "Rank",
            accessor: "name",
            sortable: false
        },
        {
            Header: "Score",
            accessor: "name",
            sortable: false
        },
        {
            Header: "Rewards",
            accessor: "name",
            sortable: false
        }
    ]
    return (
        <div>            
            <Grid fluid>
                <Row style={{ marginBottom: 20 }}>
                    <Col md={2}>
                        <Select
                            onChange={onChangerole}
                            value={value2}
                            options={options}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Card
                            ctAllIcons
                            content={
                                <ReactTable
                                    data={data}
                                    columns={columns}
                                    loading={loading}
                                    defaultPageSize={10}
                                    className="-striped -highlight"
                                >
                                </ReactTable>
                            } />
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

export default UserStats;