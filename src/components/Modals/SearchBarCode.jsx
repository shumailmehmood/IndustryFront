import React, { useState } from 'react';
import { Col, Row, Modal, FormGroup } from "react-bootstrap";
import Card from '../Card/Card';
import ReactTable from "react-table";
import "react-table/react-table.css";
const EditQuiz = (prop) => {
    const { data } = prop;
    let record = data ? data.map((element) => {
        return {
            name: element.item_name,
            quantity: +element.count + +element.return_count,
            sold: element.count,
            return: element.return_count
        }
    }) : []
    const columns = [
        {
            Header: "Name",
            accessor: "name",
            sortable: false
        },
        {
            Header: "Total Quantity",
            accessor: "quantity",
            sortable: false
        },
        {
            Header: "Sold",
            accessor: "sold",
            sortable: false
        },
        {
            Header: "Return",
            accessor: "return",
            sortable: false
        }
    ]
    return (<div>
        <Modal show={prop.show} onHide={prop.handleClose} bsSize="lg">
            <Modal.Header className="mdhead" closeButton >
                <Modal.Title>Search BarCode</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md="12">

                        <Row>
                            <Card
                                content={
                                    <ReactTable
                                        data={record}
                                        columns={columns}
                                        loading={false}
                                        className="-striped -highlight"
                                        showPagination={false}
                                        defaultPageSize={10}
                                    />

                                } />
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    </div>
    );
};

export default EditQuiz;