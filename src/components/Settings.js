import React, { useState, useEffect, useRef } from 'react'
import NavBar from './NavBar'
import { DataTable } from 'primereact/datatable';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'

export default function Settings() {
    
    const APIKeyRef = useRef() 
    const [error, setError] = useState('')
    const [records, setRecords] = useState( [{}] )

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setRecords([])
            const response = await fetch(`printers_by_key?api_key=${APIKeyRef.current.value}`, {
                method: 'GET',
              })
            const records = await response.json();
            setRecords(records)
        } catch {
            setError('Failed to load printers')
        }
    }

    return (
    <>
    <NavBar/>
    <Container className='d-flex align-items-center justify-content-center mt-5' style={{ minHeight:'50px'}}>
        <div>
            <h2>Printers By Key</h2>
        </div>
    </Container>
    
    <Container className='d-flex align-items-center justify-content-center mt-5' style={{ minHeight:'50px'}}>
            <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group className='text-center' id='api_key' as={Col}  style={{ maxHeight:'40px', width:'400px'}}>
                            <Form.Control type='text' ref={APIKeyRef} placeholder="API Key"/>
                        </Form.Group>
                        <Button className='w-7 ms-4' variant='primary' type='submit' style={{ maxHeight:'40px', maxWidth:'150px'}}>Show Printers</Button>
                    </Row>
                </Form>
    </Container>

    
    <Container className='d-flex align-items-center justify-content-center mt-5' style={{ minHeight:'50px'}}>
        <div>
            {error && <Alert variant='danger'>{error}</Alert>}
            <DataTable value={records} showGridlines tableStyle={{ minWidth: '80rem' }}>
                <Column field="nickname" header="Printer Name"></Column>
                <Column field="id" header="ID"></Column>
                <Column field="state" header="Status"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="paper_types" header="Types of Papers"></Column>
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
        </div>
    </Container>
    </>
    )
}
