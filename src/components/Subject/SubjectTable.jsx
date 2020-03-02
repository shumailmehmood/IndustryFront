import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import SubjectEditModal from "./SubjectEditModal";
import AccessTokenModal from "./AccessTokenModal";
import SubjectAddModal from "./AddSubjectModal";
import "react-table/react-table.css";
import { deactivateSubject, getSubjects } from '../../api/api';
import Card from "components/Card/Card.jsx";
import Switch from "react-switch";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "../CustomButton/CustomButton.jsx";
import { withRouter } from 'react-router'
import moment from 'moment'
const SubjectTable = (prop) => {
    const [data, setData] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showTokenEdit, setShowTokenEdit] = useState(false);
    const [showAdd, setshowAdd] = useState(false);
    const [doc, setDoc] = useState();
    const [tokenDoc, setTokenDoc] = useState();
    const [loading, setLoading] = useState(false);

    async function anyNameFunction() {
        setLoading(true)
        let response = await getSubjects();
        if (!response.data) {
            setData([])
            setLoading(false)
        } else {
            setData(response.data)
            setLoading(false)
        }
    }
    const handleClickButton = (val, subject) => {

        prop.history.push(`/admin/subjectmanagement/QuizManagement?id=${val}`);
    }
    useEffect(() => {

        // Execute the created function directly
        anyNameFunction();
    }, []);

    function handleEdit(params) {

        setShowEdit(true);
        setDoc(params)
    }
    function handleTokenEdit(params) {

        setShowTokenEdit(true);
        setTokenDoc(params)
    }
    function handleClose() {
        setShowEdit(false)
        anyNameFunction();
    }
    function handleTokenClose() {
        setShowTokenEdit(false)
        anyNameFunction();
    }
    function handleAddEdit() {
        setshowAdd(true);
        console.log(showAdd)
    }
    function handleAddClose() {
        setshowAdd(false)
        anyNameFunction();
    }
    async function changeStatus(id) {
        setLoading(true)
        let response = await deactivateSubject(id);
        if (!response.data) {
            anyNameFunction();
        } else {
            anyNameFunction();
        }

    }
    const columns = [
        {
            Header: "Name",
            accessor: "id",
            Cell: props =>
                (
                    <Button className='btn-fill btn-wd btn btn-warning'
                        onClick={() => handleClickButton(props.value, props.original)}
                    >{props.original.name}
                    </Button>)
        },
         {
            Header: "Access Token",
            Cell: props => {
                return <u
                    onClick={() => { handleTokenEdit({ id: props.original._id, name: props.column.Header, value: props.original.accessToken }) }}
                    style={{ cursor: 'pointer', color: '#23CCEF' }}>
                    {props.original.accessToken}
                </u>
            },
            width: 190
        },
        {
            Header: "Created At",
            accessor: "createdAt",
            Cell: props => (<div>{moment(props.original.createdAt).format("LLL")}</div>),
            width: 190
        },
        {
            Header: "Action",
            accessor: "id",
            Cell: props => (
                <div className="actions-right">
                    <Button
                        onClick={() => { handleEdit(props) }}
                        bsStyle="warning"
                        simple
                        icon
                    >
                        <i className="fa fa-edit" />
                    </Button>{" "}
                    <Switch
                        onChange={() => { changeStatus(props.value, !props.original.isactive) }}
                        checked={props.original.isactive}
                        className="react-switch"
                    />
                </div>
            )
        }
    ]
    return (
        <div>
            {showEdit ? <SubjectEditModal handleClose={handleClose} show={showEdit} doc={doc} /> : ''}
            {showTokenEdit ? <AccessTokenModal handleClose={handleTokenClose} show={showTokenEdit} doc={tokenDoc} /> : ''}
            {showAdd ? <SubjectAddModal handleClose={handleAddClose} show={showAdd} /> : ''}
            <Grid fluid>
                <Row >
                    <Col md={2}>          
                        <Button    style={{margin:'5px'}} onClick={() => { handleAddEdit() }} className='btn-fill btn-wd btn btn-info'>
                            Add Subject  <i className="fa fa-plus" />
                        </Button>
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

export default withRouter(SubjectTable);