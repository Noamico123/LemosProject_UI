import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Alert, Button, Container, Nav, Col, Form, Row } from 'react-bootstrap'
import NavBar from './NavBar';

export default function OrdersTable() {

    const [records, setRecords] = useState( [{}] )
    const [error, setError] = useState('')
    const nameRef = useRef() 
    const addressRef = useRef() 
    const timeRef = useRef() 
    const commentsRef = useRef() 
    const [selectedOrders, setSelectedOrders] = useState(null);

    useEffect(() => {
        fetch('/orders', {
            method: 'GET'
        }).then(
            res => res.json().then(records => setRecords(records)))
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
            const response = await fetch(`/orders/add_order?comments=${commentsRef.current.value}&address=${addressRef.current.value}&customer_name=${nameRef.current.value}&time=${timeRef.current.value}`, {
                method: 'PUT',
              })
            const records = await response.json();
            setRecords(records)
        } catch {
            setError('Failed to sign in')
        }
    }

    async function handlePrintJob(e) {
        e.preventDefault()
        setError('')
        try {
            if (selectedOrders.length > 0){
                console.log(selectedOrders);
            }
            else {
                setError('You should slecet orders before you send jobs')
            }
        } catch {
            setError('Somthing bad happened')
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

        <Container>
            <h2 className='text-center mb-4 mt-4'>Orders Data</h2>

            {error && <Alert variant='danger'>{error}</Alert>}

            <Button className='w-7 ms-5 mb-4' variant='primary' onClick={handlePrintJob} style={{ maxHeight:'40px', maxWidth:'200px'}}>Send Jobs</Button>

            <Container className='d-flex align-items-center justify-content-center mb-5' style={{ minHeight:'50px'}}>
                <div>
                    <DataTable value={records} selection={selectedOrders} onSelectionChange={e => setSelectedOrders(e.value)} showGridlines tableStyle={{ minWidth: '80rem' }}>
                        <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
                        <Column field="customer_name" header="Customer Name" ></Column>
                        <Column field="address" header="Address"></Column>
                        <Column field="time" header="Time"></Column>
                        <Column field="comments" header="Comments"></Column>
                    </DataTable>
                </div>
                </Container>
        </Container>

        <Container  className='d-flex align-items-center justify-content-center mt-5' style={{ minHeight:'50px'}}>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group className='text-center' id='email' as={Col}>
                            <Form.Control type='text' ref={nameRef} placeholder="Customer Name"/>
                        </Form.Group>
                        <Form.Group className='text-center' id='is__admin' as={Col}>
                            <Form.Control type='text' ref={addressRef} placeholder="Address"/>
                        </Form.Group>
                        <Form.Group className='text-center' id='api_key' as={Col}>
                            <Form.Control type='text' ref={timeRef} placeholder="Time"/>
                        </Form.Group>
                        <Form.Group className='text-center' id='api_key' as={Col}>
                            <Form.Control type='text' ref={commentsRef} placeholder="Comments"/>
                        </Form.Group>
                        <Button className='w-7 ms-4' variant='danger' type='submit' style={{ maxHeight:'40px', maxWidth:'200px'}}>Add Order</Button>
                    </Row>
                </Form>
            </Container>
        </>
    )
}
