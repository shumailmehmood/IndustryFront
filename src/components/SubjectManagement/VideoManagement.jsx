
import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Card from "components/Card/Card.jsx";
import Button from "../CustomButton/CustomButton.jsx";
import VideoManagementModal from "./VideoManagementModal";
import VideoEditModal from "./VideoEditManagementModal";
import { getVideoDocuments } from '../../api/api';
import queryString from 'query-string'
import { Grid, Row, Col } from "react-bootstrap";
const VideoManagement = props => {
    const [data, setData] = useState(['Easy', 'Medium', 'Hard', 'Expert']);
    const [showEdit, setShowEdit] = useState(false);
    const [doc, setDoc] = useState();
    const [showAdd, setShowAdd] = useState(false);
    const [loading, setLoading] = useState(false);

    var params = queryString.parse(props.location.search)
    async function anyNameFunction() {
        setLoading(true)
        let response = await getVideoDocuments(params.id);
        if (!response.data) {
            setData([])
            setLoading(false)
        } else {
            setData(response.data)
            setLoading(false)
        }
    }
    useEffect(() => {
        anyNameFunction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleAdd() {
        setShowAdd(true);

    }
    function handleEdit(params) {
        setDoc(params)
        setShowEdit(true);

    }
    function handleAddClose() {
        setShowAdd(false)
        anyNameFunction();
    }
    function handleEditClose() {
        setShowEdit(false)
        anyNameFunction();
    }
    const columns = [
        {
            Header: "Name",
            accessor: "name",
            sortable: false
        },
        {
            Header: "ThumbNail",
            sortable: false,
            Cell: row => (
                <div>
                    < img className="img-responsive" alt="" style={{ height: '40px', width: '40px', borderRadius: '40px' }} src={row.original.thumbUrl} />
                </div>)
        },
        {
            Header: "Video Url",
            sortable: false,
            width: 500,
            Cell: row => (
                <div>
                    {row.original.videoUrl}
                </div>)
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
                    </Button>
                </div>
            )
        }
    ]
    return (
        <div>
            {showAdd ? <VideoManagementModal handleClose={handleAddClose} show={showAdd} id={params.id} /> : ''}
            {showEdit ? <VideoEditModal handleClose={handleEditClose} show={showEdit} doc={doc} /> : ''}
            <Grid fluid>
                <Row >
                    <Col md={2}>
                        <Button 
                        style={{margin:'5px'}}
                            onClick={() => { handleAdd() }}
                            className='btn-fill btn-wd btn btn-info'
                            simple
                            icon
                        >
                            Add Video <i className="fa fa-plus" />
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
                                    align="centre"
                                >
                                </ReactTable>
                            } />
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

export default VideoManagement;





