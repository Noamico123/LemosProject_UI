import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { InputText } from 'primereact/inputtext';

export default function UsersTable() {
    
    const [records, setRecords] = useState( [{}] )
    const emailRef = useRef() 
    const APIKeyRef = useRef() 
    const isAdminRef = useRef() 
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('/users/db').then(
            res => res.json().then(records => setRecords(records)))
    }, [])


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await fetch(`users/add_user?email=${emailRef.current.value}&is_admin=${isAdminRef.current.value}&api_key=${APIKeyRef.current.value}`, {
                method: 'POST',
              })
            const records = await response.json();
            setRecords(records)
        } catch {
            setError('Failed to add user')
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

                    const response = await fetch(`/users/permission?email=${rowData['user_name']}&is_admin=${newValue}`, {
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
        <h2 className='text-center mb-4'>Users Table</h2>
            <Container className='d-flex align-items-center justify-content-center' style={{ minHeight:'50px'}}>
            <div>
                <DataTable value={records} editMode="cell" className="editable-cells-table" showGridlines tableStyle={{ minWidth: '60rem' }}>
                    <Column field="user_name" header="User Email"></Column>
                    <Column field="is_admin" header="Is Admin?"  editor={(options) => textEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
                    <Column field="uid" header="UID"></Column>
                    <Column field="api_key" header="API Key"></Column>
                </DataTable>
            </div>
            </Container>
            
            <Container  className='d-flex align-items-center justify-content-center mt-5' style={{ minHeight:'50px'}}>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group className='text-center' id='email' as={Col}>
                            <Form.Control type='text' ref={emailRef} placeholder="User Email"/>
                        </Form.Group>
                        <Form.Group className='text-center' id='is__admin' as={Col}>
                            <Form.Control type='text' ref={isAdminRef} placeholder="Is Admin ?"/>
                        </Form.Group>
                        <Form.Group className='text-center' id='api_key' as={Col}>
                            <Form.Control type='text' ref={APIKeyRef} placeholder="API Key"/>
                        </Form.Group>
                        <Button className='w-7 ms-4' variant='danger' type='submit' style={{ maxHeight:'40px', maxWidth:'100px'}}>Add User</Button>
                    </Row>
                </Form>
            </Container>
        </>
    ) 
}
