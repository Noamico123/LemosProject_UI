import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Alert, Button, Container, Nav } from 'react-bootstrap'
import { InputText } from 'primereact/inputtext';
import NavBar from './NavBar';


export default function PrintersTable() {

    const [records, setRecords] = useState( [{}] )
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('/printers', {
            method: 'GET'
        }).then(
            res => res.json().then(records => setRecords(records)))
    }, [])


    const handleRefresh = async (e) => {
        e.preventDefault()
        setRecords([{}])

        try {
            setError('')
            const response = await fetch('printers', {
                method: 'GET',
              })
            const records = await response.json();
            setRecords(records)

        } catch {
        setError('An error occured while refreshing results from DB')
        }
    }

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    const onCellEditComplete = async (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        switch (field) {
            default:
                if (newValue.trim().length >= 0) {

                    rowData[field] = newValue;

                    const response = await fetch(`/printers/nickname?pid=${rowData['id']}&name=${newValue}`, {
                        method: 'PUT',
                      })
                    const records = await response.json();
                    setRecords(records)
                }
                else
                    event.preventDefault();
                break;
        }
    }

    const onStateCellEditComplete = async (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        switch (field) {
            default:
                if (newValue.trim().length >= 0) {

                    rowData[field] = newValue;

                    const response = await fetch(`/printers/state?pid=${rowData['id']}&state=${newValue}`, {
                        method: 'PUT',
                      })
                    const records = await response.json();
                    setRecords(records)
                }
                else
                    event.preventDefault();
                break;
        }
    }

    return (
        <>
        <NavBar/>
        <Container  className='d-flex align-items-center justify-content-center mt-3' >

        <Nav variant="tabs">
            <Nav.Item>
                <Nav.Link href="/printers">Printers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/orders">Orders</Nav.Link>
            </Nav.Item>
        </Nav>

        </Container>
        <h2 className='text-center mb-4 mt-4'>Printers Data</h2>

        <Container className='d-flex align-items-center justify-content-center' style={{ minHeight:'50px'}}>
            <div>
                <Button className='w-10 align-center mb-2' onClick={handleRefresh}>Refresh</Button>
                {error && <Alert variant='danger'>{error}</Alert>}
                <DataTable value={records} editMode="cell" className="editable-cells-table" showGridlines tableStyle={{ minWidth: '80rem' }}>
                    <Column field="nickname" header="Printer Name" editor={(options) => textEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
                    <Column field="id" header="ID"></Column>
                    <Column field="state" header="Status" editor={(options) => textEditor(options)} onCellEditComplete={onStateCellEditComplete}></Column>
                    <Column field="description" header="Description"></Column>
                    <Column field="paper_types" header="Types of Papers"></Column>
                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
            </div>
            </Container>
        </> 
    )
}
