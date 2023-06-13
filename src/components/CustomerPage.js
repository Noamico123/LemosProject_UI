import React, { useState, useEffect } from 'react'
import OrdersTable from './OrdersTable'
import PrintersTable from './PrintersTable'
import { Alert, Button, Container, Nav } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate   } from 'react-router-dom'
import NavBar from './NavBar'

export default function CustomerPage() {

    const { getEmail } = useAuth()
    const [error, setError] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const navigation = useNavigate()


    const [records, setRecords] = useState( [{}] )

    useEffect(() => {
        fetch('/users').then(
            res => res.json().then(records => setRecords(records)))
    }, [])


    async function handleAdminPage(e) {
        e.preventDefault()
        
        try {
            setError('')
            const currentUserEmail = await getEmail()
            const filtered = records.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(currentUserEmail)))
            const checkIfAdmin = filtered.map(obj => obj.is_admin).toString()

            if (checkIfAdmin.toLowerCase() === "true".toLowerCase()) {
                setIsAdmin(true)
                navigation('/admin')
            }
            else {
                return setError('Sorry, you do not have permissions for this page\nFor further information please contact your administrator')
            }
        } catch {
            setError('Failed to sign in')
        }
    }

    return (
    <>
        <NavBar/>
        
        <div className='w-100 text-center mt-2'>
            <Button variant='link' onClick={handleAdminPage}>Users Managment (Admin Permissions)</Button>
            {error && <div><Alert variant='danger'>{error}</Alert><Link to='/login' className='btn btn-success'>Log In With Admin Account ?</Link></div>}
        </div>

        <Container  className='d-flex align-items-center justify-content-center mt-3' >

        <Nav variant="tabs" defaultActiveKey="/printers">
            <Nav.Item>
                <Nav.Link href="/printers">Printers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/orders">Orders</Nav.Link>
            </Nav.Item>
        </Nav>
        </Container>
    </>
    )
}
