import React, { useState, useEffect } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Card from "../Card/Card"
import MiniTableButton from "../MiniTableButton/MiniTableButton"
import QuantityUpdate from "../Modals/QuantityUpdate";
import SellerDetails from "../Modals/SellerDetails"
import { getStock } from "../../api/api"
const ViewStock = (props) => {
    const [update, setUpdate] = useState(false)
    const [seller, setSeller] = useState(false)
    const [dataDB, setDataDB] = useState([]);
    const [metaData, setMetaData] = useState({})
    const [sellerData, setSellerData] = useState({})
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState('')
    useEffect(() => {
        get();
    }, []);
    const get = (state) => {
        setLoading(true)
        let newParams = {
            page: state ? state.page + 1 : 1,
            limit: state ? state.pageSize : 10,
            name: '',
            barcode: ''
        }
        if (state) {
            state.filtered.forEach(element => {
                newParams[element.id] = element.value
            })
        }      
        getStock(newParams).then(res => {
            if (res.error) { } else {
                setDataDB(res.data.data)
                setMetaData(res.data.metadata[0])
                setLoading(false)
            }
        })
    }

    let data = dataDB.length ?
        dataDB.map((element, index) => {
            return {
                barcode: element.barcode,
                name: element.name,
                quantity: <MiniTableButton style={element.endingLimit} text={element.stockIn} handleClick={() => {
                    setId(element._id)
                    setUpdate(true)
                }} />,
                pPrice: element.purchasePrice,
                sPrice: element.salePrice,
                category: element.category.name,
                company: element.company.name,
                seller: <MiniTableButton text={element.seller.name} handleClick={() => {
                    setSellerData(element.seller)
                    setSeller(true)
                }} />
            }
        })

        : []
    const columns = [
        {
            Header: "Barcode",
            accessor: "barcode",
            sortable: false,
            filterable: true,
            
        },
        {
            Header: "Name",
            accessor: "name",
            sortable: false,
            filterable: true
        },
        {
            Header: "Quantity",
            accessor: "quantity",
            id: "quantity",
            sortable: false,
            filterable: false
        },
        {
            Header: "Purchase Price",
            accessor: "pPrice",
            sortable: false,
            filterable: false
        },
        {
            Header: "Sale Price",
            accessor: "sPrice",
            sortable: false,
            filterable: false
        },
        {
            Header: "Category",
            accessor: "category",
            sortable: false,
            filterable: false
        },
        {
            Header: "Company",
            accessor: "company",
            sortable: false,
            filterable: false
        },
        {
            Header: "Seller",
            accessor: "seller",
            id: "seller",
            sortable: false,
            filterable: false
        }
    ]
    return (
        <div>
            {console.log("Honto::",data)}
            <SellerDetails get={get} seller={sellerData} show={seller} handleClose={() => setSeller(false)} />
            <QuantityUpdate id={id} show={update} handleClose={() => setUpdate(false)} />
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
        </div>
    );
};

export default ViewStock;