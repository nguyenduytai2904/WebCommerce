import React, { useMemo, useState } from 'react'
import { StyledTable } from './style';
import Loading from '../LoadingComponent/Loading';
import ModalComponent from '../ModalComponent/ModalComponent';
import { Excel } from "antd-table-saveas-excel";


const TableComponent = (props) => {
    const { selectionType = 'checkbox', data: dataSource = [], columns = [], isLoading = false, handleDeleteMany } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const newColumn = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== 'action')
        return arr
    }, [columns])

    console.log('arr', newColumn)


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDeleteAll = () => {
        setIsModalOpenDelete(true)
    }

    const handleDeleteProduct = () => {
        handleDeleteMany(rowSelectedKeys)
        handleCancelDelete()
    }

    const handleExportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(newColumn)
            .addDataSource(dataSource, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
    };


    return (
        <Loading isLoading={isLoading}>
            {rowSelectedKeys.length > 0 && (
                <div style={{
                    background: 'rgb(50, 110, 81)',
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '10px',
                    cursor: 'pointer'
                }}
                    onClick={handleDeleteAll}
                >
                    Xóa tất cả
                </div>
            )}
            <button onClick={handleExportExcel}>Export Excel</button>
            <StyledTable
                rowSelection={{ type: selectionType, ...rowSelection }}
                columns={columns}
                dataSource={dataSource}
                {...props}
                pagination={true}
            />
            <ModalComponent forceRender title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct} >
                <div>Bạn có chắc muốn xóa  không?</div>
            </ModalComponent>
        </Loading>
    )
}

export default TableComponent