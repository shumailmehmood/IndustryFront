import React, * as react from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Card from "components/Card/Card.jsx";
import querystring from 'query-string';
import Button from "../CustomButton/CustomButton.jsx";
import { withRouter } from "react-router-dom";
import { getSubjectInfo, toggleLevel } from '../../api/api';
import LevelEditModal from "./LevelEditModal";
import Switch from "react-bootstrap-switch";
const SubjectManagement = (prop) => {
    const [data, setData] = react.useState([]);
    const [showEdit, setShowEdit] = react.useState(false);
    const [loading, setLoading] = react.useState(false);
    const [doc, setDoc] = react.useState();
    async function anyNameFunction() {
        setLoading(true)
        let response = await getSubjectInfo(querystring.parse(prop.location.search).id);
        if (!response.data) {
            setData([])
            setLoading(false)
        } else {
            setData(response.data[0].subjectLevels)
            setLoading(false)
        }
    }
    async function onToggle  (sid,lid,status) {
        setLoading(true)
        let response = await toggleLevel(sid,lid,status);
        if (!response.data) {
            anyNameFunction();
        } else {
            anyNameFunction();
        }
    }
    react.useEffect(() => {
        anyNameFunction();
    }, []);
    function handleClose() {
        setShowEdit(false)
        anyNameFunction();
    }
    function handleEdit(params, id, sampleSize) {

        let data = {};
        data.params = params
        data.subjectID = id
        data.sampleSize = sampleSize
        setShowEdit(true);
        setDoc(data)
    }
    const columns = [
        {
            Header: "Level",
            accessor: prop => { return prop.level },
            id: 'level',
            sortable: false
        },
        {
            Header: "Difficulty Level",
            accessor: prop => { return prop.difficulty },
            id: 'difficulty',
            sortable: false
        },
        {
            Header: "Show Ad",
            accessor: "showAd",
            sortable: false,
            width: 80,
            Cell: props => (
                <div  >
                    <Switch
                        onChange={() => { onToggle(querystring.parse(prop.location.search).id, props.original._id,props.original.showAd) }}
                        defaultValue={props.original.showAd}
                    />
                </div>
            )
        },
        {
            Header: "Sample Size",
            accessor: prop => { return prop.sampleSize ? prop.sampleSize : '-'},
            sortable: false,
            id: 'sampleSize'
        },
        {
            Header: "Action",
            accessor: "id",
            sortable: false,
            Cell: props => (
                <div className="actions-right">
                    <Button
                        onClick={() => {
                            prop.history.push({
                                pathname: '/admin/createquiz',
                                search: `?level=${props.original._id}&id=${querystring.parse(prop.location.search).id}`
                            })
                        }}
                        bsStyle="danger"
                        simple
                        icon
                    >
                        <i className="fa fa-plus" />
                    </Button>
                    <Button
                        onClick={() => {
                            handleEdit(props.original.level, querystring.parse(prop.location.search).id, props.original.sampleSize)
                        }}
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
            {showEdit ? <LevelEditModal handleClose={handleClose} show={showEdit} doc={doc} /> : ''}
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
        </div>
    );
};

export default withRouter(SubjectManagement);


